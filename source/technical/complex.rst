.. _complex:

======================
Complex Appliances
======================

___________________________
Introduction
___________________________

*Complex Appliances* allow you to deploy multiple nodes with advanced networking and automated configuration with "one click". Configuration tasks, such as hostname and security key distribution across a scalable number of nodes, are automated using Complex Appliances. This facilitates reproducibility and sharing, using only :ref:`images` and a configuration document called a *Template*. 

.. note:: Chameleon implements Complex Appliances using `OpenStack Heat <https://wiki.openstack.org/wiki/Heat>`_ orchestration. You may see terminology in the GUI and CLI that refer to Complex Appliances as *Stacks*.

_________________________________
Complex Appliances in the Catalog
_________________________________

The `Chameleon Appliance Catalog <https://www.chameleoncloud.org/appliances/>`_ has several pre-written Complex Appliances that demonstrate its uses. The Templates from these Complex Appliances can be easily modified for many use cases. Complex Appliances are marked with a badge in the upper right corner.

.. figure:: complex/nfsappliance.png
   :alt: A Complex Appliance with a badge in the upper right

   A Complex Appliance with a badge in the upper right

Several pre-written Complex Appliances demonstrate the following use cases:

- `NFS Share <https://www.chameleoncloud.org/appliances/25/>`_: A single NFS server with a configurable number of clients
- `OpenStack Ocata (Devstack) + Swift <https://www.chameleoncloud.org/appliances/39/>`_: An OpenStack deployment with a configurable number of compute nodes
- `MPI bare-metal cluster <https://www.chameleoncloud.org/appliances/29/>`_: An MPI cluster for a configurable number of Infiniband nodes

A Complex Appliance page in the Appliance Catalog displays various details about the appliance.

.. figure:: complex/nfsappliancedetail.png
   :alt: A Complex Appliance page

   A Complex Appliance page

Complex Appliance descriptions typically include a description of *Input Parameters* for configuration and a description of *Outputs* which return automatically configured values such as IP addresses. The *Get Template* button provides a link to the *Template*, required for launching the Complex Appliance. You may use the Template's provided URL during the launch process or download the Template to modify and then upload during launching.

__________________________________________________________
Managing Complex Appliances using the GUI
__________________________________________________________

Before launching a Complex Appliance, please make sure that you have a reservation for the appropriate node types and a key pair configured. Since most Complex Appliances will consist of multiple nodes, make sure you have set the *Minimum Number of Hosts* in your Lease. You will also need a *Template* file or the URL for a *Template* file from the Appliance Catalog. In the GUI for either `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ or `CHI@UC <https://chi.uc.chameleoncloud.org>`_, use the navigation sidebar to go to *Project* > *Orchestration* > *Stacks*.

.. figure:: complex/stacks.png
   :alt: The Stacks page

   The Stacks page

Launching a Complex Appliance
_____________________________

To launch a stack, click the *Launch Stack* button in the upper right of the Stacks page. This will open a wizard. Follow these steps:

#. In the *Select Template* step, you must provide a *Template*. Choose a *Template Source* in the dropdown. Choosing *File* will allow you to upload a file. Choosing *URL* will allow you to provide a URL of a Template, such as one from the Appliance Catalog. Chameleon will automatically retrieve the file from that URL. 

   .. figure:: complex/selecttemplate.png
      :alt: The Select Template step

      The Select Template step

#. Once you have provided a Template, click the *Next* button. Chameleon will validate the Template file and proceed to the *Launch Stack* step.

   .. figure:: complex/launchstack.png
      :alt: The Launch Stack step

      The Launch Stack step

#. In the *Launch Stack* step, provide a *Stack Name* and re-enter your *Password*. There will be additional configuration options specified by the *Template* file on this step. Most Template files available in the Appliance Catalog will require a ``key_name`` and a ``reservation_id``. These allow you to specify an SSH key pair to be applied to nodes within the Complex Appliance, as well as a Lease to use for the nodes.
#. When you are finished, click the *Launch* button. You will be returned to the Stacks page, and your new Complex Appliance status will show *Create in Progress*.

.. figure:: complex/createinprogress.png
   :alt: A Complex Appliance with the Create in Progress status

   A Complex Appliance with the Create in Progress status

Monitoring a Complex Appliance
______________________________

As the Complex Appliance launches, you may monitor its status by clicking on it in the *Stacks* page. There are several tabs that allow you to view your Complex Appliance.

- The *Topology* tab displays a graph representation of each of the resources in your Stack. Some nodes may appear to be blinking, indicating that they are currently being provisioned and launched by Chameleon.

  .. figure:: complex/topology.png
     :alt: The Topology tab

     The Topology tab

- The *Overview* tab displays various parameters, including the *ID* of the Stack and *Outputs* such as IP addresses assigned to each node. Many Complex Appliances automatically allocate and assign an externally accessible Floating IP address to one node, while leaving the others accessible through private IP addresses. You may *SSH* with agent forwarding (``ssh -A cc@your_ip``) to the externally accessible node to access any nodes in the private network.

  .. figure:: complex/overview.png
     :alt: The Overview tab

     The Overview tab

- The *Resource* tab displays *Heat Resources* used to build the Complex Appliance. This is useful for debugging the deployment and configuration of a Complex Appliance.

  .. figure:: complex/resources.png
     :alt: The Resources tab

     The Resources tab

- The *Events* tab displays any state changes of *Heat Resources* in the Complex Appliance. If a deployment of a Complex Appliance fails, you can see the event here.

  .. figure:: complex/events.png
     :alt: The Events tab

     The Events tab

- The *Template* tab displays the Template used to launch the Complex Appliance.

  .. figure:: complex/template.png
     :alt: The Template tab

     The Template tab

Deleting a Complex Appliance
____________________________

To delete a Complex Appliance, select it in the *Stacks* page and click the *Delete Stacks* button. This will delete all resources associated with the stack, such as nodes and Floating IP addresses.

_____________________________________________________________
Managing Complex Appliances using the CLI 
_____________________________________________________________

You may use the CLI to work with Complex Appliances. You will need to install the ``python-heatclient`` package using the command:

.. code-block:: bash

   pip install python-heatclient

Make sure that you configured your environment variables for your project using :ref:`cli-rc-script`. Once you have installed ``python-heatclient``, you may retrieve a list of current Complex Appliances in your project using the command:

.. code-block:: bash

   openstack stack list

You will receive output that may look like this:

.. code::

   +--------------------------------------+---------------+-------------------+----------------------+----------------------+
   | ID                                   | Stack Name    | Stack Status      | Creation Time        | Updated Time         |
   +--------------------------------------+---------------+-------------------+----------------------+----------------------+
   | e5df33b5-5282-4935-8097-973328ca71e5 | my_stack      | CREATE_COMPLETE   | 2018-01-23T22:45:12Z | None                 |
   +--------------------------------------+---------------+-------------------+----------------------+----------------------+

Launching a Complex Appliance
_____________________________

You may launch a Complex Appliance from a Template file on your local machine by specifying the file and any input *Parameters*, using the command:

.. code-block:: bash

   openstack stack create --template <template_file> --parameter <parameter>=<value> <stack_name>

``<template_file>`` corresponds to the filename of a Template on your local machine and ``<stack_name>`` is the name you wish to assign the Complex Appliance. The ``--parameter`` switch can be provided multiple times and is used to specify the values of each input *Parameter* in the Template. For example, the `NFS Server Template <https://www.chameleoncloud.org/appliances/api/appliances/25/template>`_ lists the following ``parameters`` section:

.. code::

   parameters:
     nfs_client_count:
       type: number
       description: Number of NFS client instances
       default: 1
       constraints:
         - range: { min: 1 }
           description: There must be at least one client.
     key_name:
       type: string
       description: Name of a KeyPair to enable SSH access to the instance
       default: default
       constraints:
       - custom_constraint: nova.keypair
     reservation_id:
       type: string
       description: ID of the Blazar reservation to use for launching instances.
       constraints:
       - custom_constraint: blazar.reservation

For this Template, you must provide values for ``nfs_client_count``, ``key_name`` and ``reservation_id``. 

- ``key_name`` will correspond to one of your SSH key pairs, which you may retrieve with the command:

  .. code-block:: bash

     openstack keypair list

- ``reservation_id`` will correspond to one of your active Lease UUIDs, which you may retrieve with the command:

  .. code-block:: bash

     blazar lease-list

- ``nfs_client_count`` is a Parameter that is unique to this particular Template, and specifies the number of client nodes to configure. Because the Paramter ``type`` is ``number``, it should be a number.

If this Template was saved locally as ``template.yaml``, you could launch the Complex Appliance using the command: 

.. code-block:: bash

   openstack stack create --template template.yaml --parameter key_name=mykey --parameter reservation_id=754f2dae-1758-426a-8e51-d0040373c626 --parameter nfs_client_count=1 my_nfs_stack

Monitoring a Complex Appliance
______________________________

You may view the information about your Complex Appliance in the CLI, such as *Outputs*, *Events* and *Resources*, if you know the Complex Appliance's UUID (retrieved with ``openstack stack list``).

- You may retrieve a list of *Outputs* by using the command:

  .. code-block:: bash

     openstack stack output list <uuid>

  For example, the Outputs of the *NFS Share* stack is:

  .. code::

     +------------+-----------------------------------------+
     | output_key | description                             |
     +------------+-----------------------------------------+
     | client_ips | Private IP addresses of the NFS clients |
     | server_ip  | Public IP address of the NFS server     |
     +------------+-----------------------------------------+

  To view the values of all Outputs for a node, use the command:

  .. code-block:: bash

     openstack stack output show --all <uuid>

- You may retrieve a list of *Events* by using the command:

  .. code-block:: bash

     openstack stack event list <uuid> 

- You may retrieve a list of *Resources* used in your Complex Appliance by using the command:

  .. code-block:: bash

     openstack stack resource list <uuid>

  Your output may look like this:

  .. code::

     +---------------------------+--------------------------------------+---------------------------------+-----------------+----------------------+
     | resource_name             | physical_resource_id                 | resource_type                   | resource_status | updated_time         |
     +---------------------------+--------------------------------------+---------------------------------+-----------------+----------------------+
     | nfs_server_ip_association |                                      | OS::Nova::FloatingIPAssociation | INIT_COMPLETE   | 2018-03-19T18:38:05Z |
     | nfs_server                | 0ab0169c-f762-4d27-8724-b359caa50f1f | OS::Nova::Server                | CREATE_FAILED   | 2018-03-19T18:38:05Z |
     | nfs_server_floating_ip    | ecb391f8-4653-43a6-b2c6-bb93a6d89115 | OS::Nova::FloatingIP            | CREATE_COMPLETE | 2018-03-19T18:38:05Z |
     | nfs_clients               |                                      | OS::Heat::ResourceGroup         | INIT_COMPLETE   | 2018-03-19T18:38:05Z |
     +---------------------------+--------------------------------------+---------------------------------+-----------------+----------------------+

  You may then retrieve information about a specific resource using the command:

  .. code-block:: bash

     openstack stack resource show <stack_uuid> <resource_name>

Deleting a Complex Appliance
____________________________

You may delete a Complex Appliance using the command:

.. code-block:: bash

   openstack stack delete <uuid>

____________________________
Heat Templates
____________________________

A *Heat Template* is a YAML file that specifies how resources are used and configured in a Complex Appliance. Each Template must provide three sections:

- ``resources``: This section specifies OpenStack Resources to be used in the Template. You may view available Resources in the GUI by going to *Projet* > *Orchestration* > *Resource Types*. Each Resource type specifies output *Attributes* and input *Properties* for configuring the Resource.
- ``parameters``: This section specifies input Parameters, used in configuring the Complex Appliance upon Launch.
- ``outputs``: This section specifies Output values after a Complex Appliance launches. This can be used to output Resource values like Floating IP addresses.

A Case Example: NFS Share
_________________________

Let's look at the `NFS Share Template <https://www.chameleoncloud.org/appliances/api/appliances/25/template>`_. The NFS share appliance deploys:

- An NFS server instance, that exports the directory /exports/example to any instance running on Chameleon bare-metal,
- Ane or several NFS client instances, which configure /etc/fstab to mount this NFS share to /mnt (and can subsequently read from and write to it).

The ``resources`` section is the most important part of the template: it defines which OpenStack *Resources* to create and configure. Inside this section you can see four resources defined:

- ``nfs_server_floating_ip``: This Resource creates a Floating IP on the ``ext-net`` public network. It is not attached to any isntance yet.
- ``nfs_server``: This Resource creates the NFS server instance (an instance is defined with the type ``OS::Nova::Server`` in Heat). It is a bare-metal instance (``flavor: baremetal``) using the ``CC-CentOS7`` image and connected to the private network named ``sharednet1``. We set the keypair to use the value of the parameter defined earlier, using the ``get_param`` function. Similarly, the reservation to use is passed to the scheduler. Finally, a ``user_data`` script is given to the instance, which configures it as an NFS server exporting ``/exports/example`` to Chameleon instances.
- ``nfs_server_ip_association``: This Resource associates the floating IP created earlier with the NFS server instance.
- ``nfs_clients``: This Resource defines a resource group containing instance configured to be NFS clients and mount the directory exported by the NFS server defined earlier. The IP of the NFS server is gathered using the ``get_attr`` function, and placed into ``user_data`` using the ``str_replace`` function.

Once a Resource has been specified, you may provide it as a value for another Resource's property using the ``get_resource`` function.

The ``parameters`` section defines inputs to be used on Complex Appliance launch. Parameters all have the same data structure: each one has a name (``key_name`` or ``reservation_id`` in this case), a data type (``number`` or ``string``), a comment field called ``description``, optionally a ``default value``, and a list of ``constraints`` (in this case only one per parameter). Constraints tell Heat to match a parameter to a specific type of OpenStack resource. Complex appliances on Chameleon require users to customize at least the key pair name and reservation ID, and will generally provide additional parameters to customize other properties of the cluster, such as its size, as in this example. The values of Parameters can be used in the ``resources`` section using the ``get_param`` function.

The ``outputs`` section defines what values are returned to the user. Outputs are declared similarly to parameters: they each have a name, an optional description, and a value. They allow to return information from the stack to the user. You may use the ``get_attr`` function to retrieve a Resource's attribute for output.

Scalability in NFS Share
________________________

Much of the flexibility in Complex Appliances is the ability to use input Parameters to configure the Complex Appliance. Look at the ``nfs_clients`` resource defintion:

.. code:: 

   nfs_clients:
       type: OS::Heat::ResourceGroup
       properties:
         count: { get_param: nfs_client_count }
         resource_def:
           type: OS::Nova::Server
           properties:
             flavor: baremetal
             image: CC-CentOS7
             key_name: { get_param: key_name }
             networks:
                - network: sharednet1
             scheduler_hints: { reservation: { get_param: reservation_id } }
             user_data:
               str_replace:
                 template: |
                   #!/bin/bash
                   yum install -y nfs-utils
                   echo "$nfs_server_ip:/exports/example    /mnt/    nfs" > /etc/fstab
                   mount -a
                 params:
                   $nfs_server_ip: { get_attr: [nfs_server, first_address] }

The ``OS::Heat::ResourceGroup`` OpenStack Resource facilitates replicating the same type of Resource multiple times.  In this case, the ``count`` parameter is configured using the ``nfs_client_count`` input Parameter. The ``resource_def`` property, in this case, is an ``OS::Nova::Server`` resource (which allocates and launches a bare metal node.) The startup script for each of these client nodes is specified using the ``user_data`` property of the ``OS::Nova::Server`` resource. To configure the NFS mount point to match the IP address of the ``nfs_server``, we use ``str_replace``. ``str_replace`` specifies a ``template`` property and a ``params`` property. The ``params`` property ``$nfs_server_ip`` will be used to replace all occurrences of ``$nfs_server_ip`` in the template. 

Writing a New Template
______________________

It is best to build Complex Appliance Template from a pre-existing one. Because hardware Leases and SSH access are an important concept in Chameleon, it is best to make sure that the input ``parameters`` always include ``key_name`` and ``reservation_id``. Simple modifications may be made, such as changing the ``image`` property of any ``OS::Nova::Server`` to one that is specific to your Project. 

Heat Template Version
_____________________

Each Heat Template must include the ``heat_template_version`` key with a valid version of HOT (Heat Orchestration Template). Chameleon bare metal supports any HOT version up to 2015-10-15, which corresponds to OpenStack Liberty. The Heat documentation lists all available versions and their features. We recommended that you always use the latest supported version to have access to all supported features: ``heat_template_version: 2015-10-15``

Description
___________

While not mandatory, it is good practice to describe what  is deployed and configured by your template. It can be on a single line:

.. code:: 

   description: This describes what this Heat template deploys on Chameleon.

If a longer description is needed, you can provide multi-line text in YAML, for example:

.. code:: 

   description: >
     This describes what this Heat
     template deploys on Chameleon.

__________________________
Sharing Complex Appliances
__________________________

If you have written your own Complex Appliance or substantially customized an existing one, we would love if you shared them with our user community! The process is very similar to regular appliances: log into the Chameleon portal, go to the appliance catalog, and click on the button in the top-right corner: *Add an appliance* (you need to be logged in to see it).

.. figure:: complex/addappliance.png
   :alt: The Add an Appliance button

   The Add an Appliance button

You will be prompted to enter a name, description, and documentation. Instead of providing appliance IDs, copy your template to the dedicated field. Finally, share your contact information and assign a version string to your appliance. Once submitted, your appliance will be reviewed. We will get in touch if a change is needed, but if it's all good we will publish it right away!

___________________________
Advanced Topics
___________________________

All-to-All Information Exchange
_______________________________

The previous examples have all used ``user_data`` scripts to provide instances with contextualization information. While it is easy to use, this contextualization method has a major drawback: because it is given to the instance as part of its launch request, it cannot use any context information that is not yet known at this time. In practice, this means that in a client-server deployment, only one of these pattern will be possible:

- The server has to be deployed first, and once it is deployed, the clients can be launched and contextualized with information from the server. The server won’t know about the clients unless there is a mechanism (not managed by Heat) for the client to contact the server.
- The clients have to be deployed first, and once they are deployed, the server can be launched and contextualized with information from the clients. The clients won’t know about the server unless there is a mechanism (not managed by Heat) for the server to contact the clients.

This limitation was already apparent in our NFS share appliance: this is why the server instance exports the file system to all bare-metal instances on Chameleon, because it doesn’t know which specific IP addresses are allocated to the clients.

This limitation is even more important if the deployment is not hierarchical, i.e. all instances need to know about all others. For example, a cluster with IP and hostnames populated in ``/etc/hosts`` required each instance to be known by every other instance.

This section presents a more advanced form of contextualization that can perform this kind of information exchange. This is implemented by Heat agents running inside instances and communicating with the Heat service to send and receive information. This means you will need to use an image bundling these agents. Currently, our CC-CentOS7 appliance and its CUDA version are the only ones supporting this mode of contextualization. If you build your own images using the CC-CentOS7 appliance builder, you will automatically have these agents installed. This contextualization is performed with several Heat resources:

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
       default: CC-CentOS7
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
