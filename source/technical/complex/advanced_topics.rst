.. _complex-advanced:

Advanced Topics
===============

.. _all-to-all-info-exchange:

All-to-All Information Exchange
-------------------------------

The previous examples have all used ``user_data`` scripts to provide instances with contextualization information. While it is easy to use, this contextualization method has a major drawback: because it is given to the instance as part of its launch request, it cannot use any context information that is not yet known at this time. In practice, this means that in a client-server deployment, only one of these pattern will be possible:

- The server has to be deployed first, and once it is deployed, the clients can be launched and contextualized with information from the server. The server won't know about the clients unless there is a mechanism (not managed by *Heat*) for the client to contact the server.
- The clients have to be deployed first, and once they are deployed, the server can be launched and contextualized with information from the clients. The clients won't know about the server unless there is a mechanism (not managed by *Heat*) for the server to contact the clients.

This limitation was already apparent in our `NFS share <https://www.chameleoncloud.org/appliances/25/>`_ appliance: this is why the server instance exports the file system to all bare metal instances on Chameleon, because it doesn't know which specific IP addresses are allocated to the clients.

This limitation is even more important if the deployment is not hierarchical, i.e. all instances need to know about all others. For example, a cluster with IP and hostnames populated in ``/etc/hosts`` required each instance to be known by every other instance.

This section presents a more advanced form of contextualization that can perform this kind of information exchange.
This is implemented by *Heat* agents running inside instances and communicating with the *Heat* service to send and receive information.
This means you will need to use an image bundling these agents.
Currently, all Chameleon-supported images (CC) are supporting this mode of contextualization.
If you build your own images using the `CC-CentOS7 <https://github.com/ChameleonCloud/CC-CentOS7>`_ builder, `CC-CentOS <https://github.com/ChameleonCloud/CC-CentOS>`_ builder or `CC-Ubuntu <https://github.com/ChameleonCloud/CC-Ubuntu>`_ builder, you will automatically have these agents installed. This contextualization is performed with several Heat resources:

- ``OS::Heat::SoftwareConfig``: This resource describes code to run on an instance. It can be configured with inputs and provide outputs.
- ``OS::Heat::SoftwareDeployment``: This resource applies a SoftwareConfig to a specific instance.
- ``OS::Heat::SoftwareDeploymentGroup``: This resource applies a SoftwareConfig to a specific group of instances.


The template below illustrates how it works. It launches a group of instances that will automatically populates their ``/etc/hosts`` file with IP and hostnames from other instances in the deployment.

.. code::

   heat_template_version: 2015-10-15

   description: >
     This template demonstrates how to exchange hostnames and IP addresses to populate /etc/hosts.

   parameters:
     flavor:
       type: string
       default: baremetal
       constraints:
       - custom_constraint: nova.flavor
     image:
       type: string
       default: CC-CentOS8
       constraints:
       - custom_constraint: glance.image
     key_name:
       type: string
       default: default
       constraints:
       - custom_constraint: nova.keypair
     instance_count:
       type: number
       default: 2
     reservation_id:
       type: string
       description: ID of the Blazar reservation to use for launching instances.
       constraints:
       - custom_constraint: blazar.reservation

   resources:
     export_hosts:
       type: OS::Heat::SoftwareConfig
       properties:
         outputs:
           - name: hosts
         group: script
         config: |
           #!/bin/sh
           (echo -n $(facter ipaddress); echo -n ' '; echo $(facter hostname)) > ${heat_outputs_path}.hosts

     export_hosts_sdg:
       type: OS::Heat::SoftwareDeploymentGroup
       properties:
         config: { get_resource: export_hosts }
         servers: { get_attr: [server_group, refs_map] }
         signal_transport: HEAT_SIGNAL

     populate_hosts:
       type: OS::Heat::SoftwareConfig
       properties:
         inputs:
           - name: hosts
         group: script
         config: |
           #!/usr/bin/env python
           import ast
           import os
           import string
           import subprocess
           hosts = os.getenv('hosts')
           if hosts is not None:
               hosts = ast.literal_eval(string.replace(hosts, '\n', '\\n'))
           with open('/etc/hosts', 'a') as hosts_file:
             for ip_host in hosts.values():
                 hosts_file.write(ip_host.rstrip() + '\n')

     populate_hosts_sdg:
       type: OS::Heat::SoftwareDeploymentGroup
       depends_on: export_hosts_sdg
       properties:
         config: { get_resource: populate_hosts }
         servers: { get_attr: [server_group, refs_map] }
         signal_transport: HEAT_SIGNAL
         input_values:
           hosts: { get_attr: [ export_hosts_sdg, hosts ] }

     server_group:
       type: OS::Heat::ResourceGroup
       properties:
         count: { get_param: instance_count }
         resource_def:
           type: OS::Nova::Server
           properties:
             flavor: { get_param: flavor }
             image: { get_param: image }
             key_name: { get_param: key_name }
             networks:
                - network: sharednet1
             scheduler_hints: { reservation: { get_param: reservation_id } }
             user_data_format: SOFTWARE_CONFIG
             software_config_transport: POLL_SERVER_HEAT

   outputs:
     deployment_results:
       value: { get_attr: [export_hosts_sdg, hosts] }

There are two ``SoftwareConfig`` resources:

- The first ``SoftwareConfig``, ``export_hosts``, uses the ``facter`` tool to extract IP address and hostname into a single line (in the format expected for ``/etc/hosts``) and writes it to a special path (``${heat_outputs_path}.hosts``). This prompts Heat to assign the content of this file to the output with the name hosts.
- The second ``SoftwareConfig``, ``populate_hosts``, takes as input a variable named hosts, and applies a script that reads the variable from the environment, parses it with ``ast.literal_eval`` (as it is formatted as a Python dict), and writes each value of the dictionary to ``/etc/hosts``.

The ``SoftwareDeploymentGroup`` resources ``export_hosts_sdg`` and ``populate_hosts_sdg`` apply each ``SoftwareConfig`` to the instance ``ResourceGroup`` with the correct configuration.

Finally, the instance ``ResourceGroup`` is configured so that each instance uses the following contextualization method instead of a ``user_data`` script:

.. code::

   user_data_format: SOFTWARE_CONFIG
   software_config_transport: POLL_SERVER_HEAT

You can follow the same template pattern to configure your own deployment requiring all-to-all information exchange.

.. _automated-deployemnt:

Automated Deployment
--------------------

On Chameleon you can configure a Heat Stack to launch as soon as your lease begins. Whether your experiments require a large cluster or a single node, automated deployment saves you time configuring your environment and even allows you to run your entire experiment automatically when the necessary resources become available.

At present, you will need to use our customized versions of the Heat and Blazar CLI tools to implement this feature.

Install Custom CLI
~~~~~~~~~~~~~~~~~~

You can install Chameleon's ``python-heatclient`` and ``python-blazarclient`` packages via ``pip`` by running the following commands:

.. code::

    pip install git+https://github.com/ChameleonCloud/python-heatclient.git
    pip install git+https://github.com/ChameleonCloud/python-blazarclient.git


Initialize Stack
~~~~~~~~~~~~~~~~

Next you will need to configure a Heat stack with the ``--initialize`` flag on the CLI and a dummy ``reservation_id`` parameter. The ``dummy`` id can be anything (even an empty string) so long as the ``reservation_id`` parameter is specified so that Blazar can overwrite it once your advanced reservation is scheduled and the stack is ready to launch. Once your stack is initialized, the status should read ``INIT_COMPLETE``. This indicates that your template was validated and all the data required to launch a stack has been stored. See example command below:

.. code::

    openstack stack create -t <template_file> --initialize --parameter reservation_id=dummy <stack_name>


Create Reservation with Stack_ID
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Finally, for a stack to launch when your reservation begins, we need to let Blazar know which stack to notify Heat to update. This is done via the command line by specifying ``orchestration`` as an ``on_start`` action with a stack_id (e.g. ``on_start=orchestration:<stack_id>``) under the ``--reservation`` flag. Under the hood, Blazar will update your initialized Heat stack with the reservation_id assigned to the lease. See example below:

.. code::

    openstack reservation lease create --start-date "<start_date>" --end-date "<end_date>" \
      --reservation min=<min>,max=<max>,resource_type=physical:host,on_start=orchestration:<stack_id> \
      <lease_name>