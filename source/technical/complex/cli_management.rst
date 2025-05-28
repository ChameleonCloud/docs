.. _complex-cli:

Managing Complex Appliances using the CLI
=========================================

.. tip:: Reading :ref:`cli` is highly recommended before continuing on the following sections.

In addition to :ref:`cli-installing`, you will need to install the ``python-heatclient`` package using the command:

.. code-block:: bash

   pip install python-heatclient

Then, set up your environment for OpenStack command line usage, as described in :ref:`cli-rc-script`. You can get a list of your *Complex Appliances* in your project using the command:

.. code-block:: bash

   openstack stack list

The output should look like the following:

.. code::

   +--------------------------------------+---------------+-------------------+----------------------+----------------------+
   | ID                                   | Stack Name    | Stack Status      | Creation Time        | Updated Time         |
   +--------------------------------------+---------------+-------------------+----------------------+----------------------+
   | e5df33b5-5282-4935-8097-973328ca71e5 | my_stack      | CREATE_COMPLETE   | 2018-01-23T22:45:12Z | None                 |
   +--------------------------------------+---------------+-------------------+----------------------+----------------------+

Launching a Complex Appliance
-----------------------------

To launch a *Complex Appliance* using *Template*, run the command on your local machine:

.. code-block:: bash

   openstack stack create --template <template_file> --parameter <parameter>=<value> <stack_name>

Provide the path to and the name of the *Template* file in your local file system via the ``template`` switch.  The ``<stack_name>`` is the name of the *Complex Appliance*. In addition, you may provide the parameters required in the *Template* file with their values by ``parameter`` switch. For example, the `NFS Server Template <https://www.chameleoncloud.org/appliances/api/appliances/25/template>`_ lists the following ``parameters`` section:

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

Therefore, in order to use this *Template*, you must provide values for ``nfs_client_count``, ``key_name`` and ``reservation_id``.

Monitoring a Complex Appliance
------------------------------

You can get details about your *Complex Appliance*, such as *Outputs*, *Events* and *Resources*, via the CLI. You will need the *UUID* of the *Complex Appliance*.

.. tip:: To get the *UUID* of your *Complex Appliance*, use the *Stacks* page on the GUI or retrieve it by ``openstack stack list`` command.

- To view the *Outputs*, run:

  .. code-block:: bash

     openstack stack output list <uuid>

  For example, the list of the outputs for the `NFS Share <https://www.chameleoncloud.org/appliances/25/>`_ stack is:

  .. code::

     +------------+-----------------------------------------+
     | output_key | description                             |
     +------------+-----------------------------------------+
     | client_ips | Private IP addresses of the NFS clients |
     | server_ip  | Public IP address of the NFS server     |
     +------------+-----------------------------------------+

  You can get more details about the outputs by using the following command:

  .. code-block:: bash

     openstack stack output show --all <uuid>

- To view the *Events*, run:

  .. code-block:: bash

     openstack stack event list <uuid>

- To view the *Resources*, run:

  .. code-block:: bash

     openstack stack resource list <uuid>

  Your output may look like this:

  .. code::

     +---------------------------+--------------------------------------+---------------------------------+-----------------+----------------------+
     | resource_name             | physical_resource_id                 | resource_type                   | resource_status | updated_time         |
     +---------------------------+--------------------------------------+---------------------------------+-----------------+----------------------+
     | nfs_server_ip_association |                                      | OS::Neutron::FloatingIPAssociation | INIT_COMPLETE   | 2018-03-19T18:38:05Z |
     | nfs_server                | 0ab0169c-f762-4d27-8724-b359caa50f1f | OS::Nova::Server                | CREATE_FAILED   | 2018-03-19T18:38:05Z |
     | nfs_server_floating_ip    | ecb391f8-4653-43a6-b2c6-bb93a6d89115 | OS::Nova::FloatingIP            | CREATE_COMPLETE | 2018-03-19T18:38:05Z |
     | nfs_clients               |                                      | OS::Heat::ResourceGroup         | INIT_COMPLETE   | 2018-03-19T18:38:05Z |
     +---------------------------+--------------------------------------+---------------------------------+-----------------+----------------------+

  Then, you may retrieve information about a specific resource using the command:

  .. code-block:: bash

     openstack stack resource show <stack_uuid> <resource_name>

Deleting a Complex Appliance
----------------------------

Use the following command to delete a stack:

.. code-block:: bash

   openstack stack delete <uuid>

It will remove all the resources attached to the stack.