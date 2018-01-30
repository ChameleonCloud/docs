Provision resources (using the command line)
============================================

The sections above present the most user friendly mode of usage, with
most actions performed via the web interface. However, Chameleon can be
accessed via the OpenStack command line tools which provides more
capabilities. This section presents some advanced usage using the
command line tools.

Setting up your environment for the OpenStack command line tools
----------------------------------------------------------------

The OpenStack command line tools expect several environment variables to
be set in order to communicate with the OpenStack services. To set up
your environment, first download the OpenStack credentials file from the
web interface. Go to Access & Security > API Access and click on the
"Download OpenStack RC" file button.

|Picture|

| Then, initialize our shell environment to communicate with the
  Chameleon testbed. From a terminal shell on your own machine,
  run: \ ``source ~/Downloads/Chameleon-openrc.sh``
| This command will prompt you for a password. Type your Chameleon
  password (it won’t be displayed in your terminal) and press
  Enter. \ **Note: adapt the path of the RC file depending on where you
  downloaded it. It should be at the above location on OS X.**

Reserving specific nodes
------------------------

To reserve specific nodes, based on their identifier or their resource
specifications, you must use the Blazar command line client. As Blazar
is not packaged on PyPI, you must install it from |Link - its source on
GitHub|, preferably in a virtualenv. For example on CentOS, run the
following commands:

::

    sudo yum install python-virtualenv
    virtualenv blazarclient
    source blazarclient/bin/activate
    pip install git+https://github.com/openstack/python-blazarclient

.. raw:: html

   <div
   style="background: #eee; border: 1px solid #ccc; padding: 5px 10px;">

Note that the Python Blazar client is not yet compatible with Python 3:
please use Python 2.7 instead.

.. raw:: html

   </div>

You might have to adapt these commands for non-CentOS platforms, please
consult the documentation specific to your operating system. Also make
sure that your environment is set up for using the OpenStack command
line tools, as described in the previous section.

To create a lease containing compute nodes, you can run the command give
in the following example:

::

    climate lease-create --physical-reservation min=1,max=1,resource_properties='["=", "$node_type", "compute"]' --start-date "2015-06-17 16:00" --end-date "2015-06-17 18:00" my-first-lease

Creating a lease with specific requirements is done with the
resource\_properties argument of the --physical-reservation option. To
reserve the node with UID c9f98cc9-25e9-424e-8a89-002989054ec2:

::

    climate lease-create --physical-reservation min=1,max=1,resource_properties='["=", "$uid", "c9f98cc9-25e9-424e-8a89-002989054ec2"]' --start-date "2015-06-17 16:00" --end-date "2015-06-17 18:00" my-custom-lease

Instead of uid, you can use any resource property that is in the
resource registry. To see the list of properties of nodes, first get the
full list of nodes with \ ``climate host-list``, then
run \ ``climate host-show <host_id>``, where <host\_id> is taken from
the first column of host-list.

::

    $ climate host-show 1
    Starting new HTTPS connection (1): chi.uc.chameleoncloud.org
    Starting new HTTPS connection (1): chi.uc.chameleoncloud.org
    Starting new HTTPS connection (1): chi.uc.chameleoncloud.org
    +--------------------------------+---------------------------------------------+
    | Field                          | Value                                       |
    +--------------------------------+---------------------------------------------+
    | architecture.platform_type     | x86_64                                      |
    | architecture.smp_size          | 2                                           |
    | architecture.smt_size          | 48                                          |
    | bios.release_date              | 03/09/2015                                  |
    | bios.vendor                    | Dell Inc.                                   |
    | bios.version                   | 1.2                                         |
    | chassis.manufacturer           | Dell Inc.                                   |
    | chassis.name                   | PowerEdge R630                              |
    | chassis.serial                 | 3TH7C42                                     |
    | cpu_info                       | baremetal cpu                               |
    | created_at                     | 2015-06-17 23:03:02                         |
    | gpu.gpu                        | False                                       |
    | hypervisor_hostname            | c9f98cc9-25e9-424e-8a89-002989054ec2        |
    | hypervisor_type                | ironic                                      |
    | hypervisor_version             | 1                                           |
    | id                             | 1                                           |
    | local_gb                       | 128                                         |
    | main_memory.ram_size           | 134956859392                                |
    | memory_mb                      | 131072                                      |
    | monitoring.wattmeter           | False                                       |
    | network_adapters.0.bridged     | False                                       |
    | network_adapters.0.device      | eno1                                        |
    | network_adapters.0.driver      | bnx2x                                       |
    | network_adapters.0.interface   | Ethernet                                    |
    | network_adapters.0.mac         | 44:a8:42:15:67:9b                           |
    | network_adapters.0.management  | False                                       |
    | network_adapters.0.model       | NetXtreme II BCM57800 1/10 Gigabit Ethernet |
    | network_adapters.0.mounted     | True                                        |
    | network_adapters.0.rate        | 10000000000                                 |
    | network_adapters.0.switch      |                                             |
    | network_adapters.0.switch_port |                                             |
    | network_adapters.0.vendor      | Broadcom Corporation                        |
    | network_adapters.1.bridged     | False                                       |
    | network_adapters.1.device      | eno2                                        |
    | network_adapters.1.driver      | bnx2x                                       |
    | network_adapters.1.interface   | Ethernet                                    |
    | network_adapters.1.mac         | 44:a8:42:15:67:9d                           |
    | network_adapters.1.management  | False                                       |
    | network_adapters.1.model       | NetXtreme II BCM57800 1/10 Gigabit Ethernet |
    | network_adapters.1.mounted     | False                                       |
    | network_adapters.1.rate        | 10000000000                                 |
    | network_adapters.1.vendor      | Broadcom Corporation                        |
    | network_adapters.2.bridged     | False                                       |
    | network_adapters.2.device      | eno3                                        |
    | network_adapters.2.driver      | bnx2x                                       |
    | network_adapters.2.interface   | Ethernet                                    |
    | network_adapters.2.mac         | 44:a8:42:15:67:9f                           |
    | network_adapters.2.management  | False                                       |
    | network_adapters.2.model       | NetXtreme II BCM57800 1/10 Gigabit Ethernet |
    | network_adapters.2.mounted     | True                                        |
    | network_adapters.2.rate        | 1000000000                                  |
    | network_adapters.2.vendor      | Broadcom Corporation                        |
    | network_adapters.3.bridged     | False                                       |
    | network_adapters.3.device      | eno4                                        |
    | network_adapters.3.driver      | bnx2x                                       |
    | network_adapters.3.interface   | Ethernet                                    |
    | network_adapters.3.mac         | 44:a8:42:15:67:a1                           |
    | network_adapters.3.management  | False                                       |
    | network_adapters.3.model       | NetXtreme II BCM57800 1/10 Gigabit Ethernet |
    | network_adapters.3.mounted     | False                                       |
    | network_adapters.3.rate        | 1000000000                                  |
    | network_adapters.3.vendor      | Broadcom Corporation                        |
    | node_type                      | compute                                     |
    | operating_system.kernel        | 3.10.0-229.4.2.el7.x86_64                   |
    | operating_system.name          | centos                                      |
    | operating_system.version       | 7.1.1503                                    |
    | processor.cache_l1             |                                             |
    | processor.cache_l1d            | 32768                                       |
    | processor.cache_l1i            | 32768                                       |
    | processor.cache_l2             | 262144                                      |
    | processor.cache_l3             | 31457280                                    |
    | processor.clock_speed          | 3100000000                                  |
    | processor.instruction_set      | x86-64                                      |
    | processor.model                | Intel Xeon                                  |
    | processor.other_description    | Intel(R) Xeon(R) CPU E5-2670 v3 @ 2.30GHz   |
    | processor.vendor               | Intel                                       |
    | processor.version              | E5-2670                                     |
    | service_name                   | c9f98cc9-25e9-424e-8a89-002989054ec2        |
    | status                         |                                             |
    | storage_devices.0.device       | sda                                         |
    | storage_devices.0.driver       | mptsas                                      |
    | storage_devices.0.interface    | SCSI                                        |
    | storage_devices.0.model        | ST9250610NS                                 |
    | storage_devices.0.rev          | AA63                                        |
    | storage_devices.0.size         | 250059350016                                |
    | storage_devices.0.vendor       | Seagate                                     |
    | supported_job_types.besteffort | False                                       |
    | supported_job_types.deploy     | True                                        |
    | supported_job_types.virtual    | ivt                                         |
    | trust_id                       | 450676ed9b46498ba49766667056d16d            |
    | uid                            | c9f98cc9-25e9-424e-8a89-002989054ec2        |
    | updated_at                     |                                             |
    | vcpus                          | 48                                          |
    | version                        | 78dbf26565cf24050718674dcf322331fab8ead5    |
    +--------------------------------+---------------------------------------------+

For example, you can
use \ ``resource_properties='["=", "$architecture.smp_size", "2"]'`` to
reserve a node with two physical processors. \ **Remember to use a
dollar sign in front of the property.**

Reserving different node types
------------------------------

It is possible to get an access to bare-metal nodes that contain very
specific hardware such as GPUs or storage hierarchy (enabling
experiments using multiple layers of caching). These nodes can be
discovered thanks to the resource discovery interface.

The following commands illustrate how to reserve nodes with
heterogeneous hardware:

Type

Command

Compute nodes

``climate lease-create --physical-reservation min=1,max=1,resource_properties='["=", "$node_type", "compute"]' --start-date "2016-06-22 20:38" --end-date "2016-06-25 15:00" reserving-compute-nodes``

Storage nodes

``climate lease-create --physical-reservation min=1,max=1,resource_properties='["=", "$node_type", "storage"]' --start-date "2016-06-22 20:38" --end-date "2016-06-25 15:00" reserving-storage-nodes``

Infiniband nodes

``climate lease-create --physical-reservation min=1,max=1,resource_properties='["=", "$node_type", "compute_ib"]' --start-date "2016-06-22 20:38" --end-date "2016-06-25 15:00" reserving-infiniband-nodes``

Storage Hierarchy nodes

``climate lease-create --physical-reservation min=1,max=1,resource_properties='["=", "$node_type", "storage_hierarchy"]' --start-date "2016-06-22 20:38" --end-date "2016-06-25 15:00" reserving-ssd-nodes``

NVIDIA K80 nodes

``climate lease-create --physical-reservation min=1,max=1,hypervisor_properties='["=", "$node_type", "gpu_k80"]' --start-date "2016-06-28 17:32" --end-date "2016-06-28 20:32" reserving-k80-nodes``

NVIDIA M40 nodes

``climate lease-create --physical-reservation min=1,max=1,hypervisor_properties='["=", "$node_type", "gpu_k40"]' --start-date "2016-06-28 17:32" --end-date "2016-06-28 20:32" reserving-m40-nodes``

FPGA nodes

``climate lease-create --physical-reservation min=1,max=1,hypervisor_properties='["=", "$node_type", "fpga"]' --start-date "2016-06-28 17:32" --end-date "2016-06-28 20:32" reserving-fpga-nodes``

Low power Xeon nodes

``climate lease-create --physical-reservation min=1,max=1,hypervisor_properties='["=", "$node_type", "lowpower_xeon"]' --start-date "2016-06-28 17:32" --end-date "2016-06-28 20:32" reserving-low-power-xeon-nodes``

Atom nodes

``climate lease-create --physical-reservation min=1,max=1,hypervisor_properties='["=", "$node_type", "atom"]' --start-date "2016-06-28 17:32" --end-date "2016-06-28 20:32" reserving-atom-nodes``

ARM64 nodes

``climate lease-create --physical-reservation min=1,max=1,hypervisor_properties='["=", "$node_type", "arm64"]' --start-date "2016-06-28 17:32" --end-date "2016-06-28 20:32" reserving-arm64-nodes``

Next Step
---------

Now, it is time to configure some resources! You will find instructions
to the next step by visiting one of the following links:

-  |Link|
-  |Link|

.. |Picture| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_12165
.. |Link - its source on GitHub| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_6919
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16700
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16701
