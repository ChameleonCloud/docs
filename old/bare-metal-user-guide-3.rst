Bare Metal User Guide
=====================

This document guides users through the bare-metal deployment features
available in Chameleon. Chameleon gives access to bare-metal compute
resources on which users can have administrative access to run cloud
computing experiments with a high degree of customization and
repeatability. Typically, an experiment will go through several phases:

#. |Link - Discovering resources|
#. |Link - Reserving resources|
#. |Link - Configuring resources|
#. |Link - Interacting with resources|
#. |Link - Gathering results|

Instructions on how to perform each of these phases is available in this
guide. You don't have to strictly follow this order or perform all the
steps to discover the new capabilities of the Chameleon testbed.
However, note that some steps depend on previous ones to be succesfully
performed.

In addition, the following sections address special topics:

#. `Chameleon Object
   Store <https://www.chameleoncloud.org/docs/bare-metal-user-guide/#object_store>`__
   section contains instructions on how to use our object store to save
   and retrieve data
#. |Link - advanced usage| section details how to access more complex
   features of the Chameleon testbed
#. |Link - troubleshooting| section covers common issues you might
   encounter.

Quickstart
----------

If you are already familiar with Chameleon, you can access the
bare-metal hardware resources through the following links:

-  |Link - Resource discovery|
-  University of Chicago (CHI@UC): https://chi.uc.chameleoncloud.org/
-  Texas Advanced Computing Center (CHI@TACC):
   `https://chi.tacc.chameleoncloud.org/ <https://chi.tacc.chameleoncloud.org>`__

If you are not yet familiar with how Chameleon works, continue reading
below!

Discovering resources
---------------------

All physical resources available in Chameleon are described in the
Chameleon resource registry. Users can consult the registry via the
|Link - resource discovery web interface| or by directly accessing the
API of the resource registry. The former is the most user-friendly for
browsing and learning about all the resources available in Chameleon.
The latter is meant to be consumed by scripts (e.g. to automate
experiments) and applications (e.g. to build third-party browsing
interfaces), which is documented in a |Link - separate guide|. The
resource registry is based on the |Link - Reference API from the
Grid'5000 project|.

The resource discovery web interface allows you to select nodes from the
testbed using preset filters (compute nodes, storage nodes, etc.) or
using advanced filters.

|Picture - RD1.png|

Once you have selected your filters, click on the \ **View**\  button to
display nodes.

|Picture - RD2.png|

Reserving resources
-------------------

Unlike virtual resources on a regular on-demand cloud, physical
resources on Chameleon must be reserved before using them for an
experiment. Once a reservation has been accepted, users are guaranteed
that resources will be available at the time they chose (except in
extraordinary circumstances such as hardware or platform failures),
which will help to run large scale experiments.

Chameleon resources are reserved via Blazar (previously known as
Climate) which provides Reservation as a Service for OpenStack. It is
available in the Horizon web interface via the Reservation dashboard.

To access it, first log into the Horizon web interface using the same
Chameleon credentials as the portal.

-  UC: https://chi.uc.chameleoncloud.org/
-  TACC: https://chi.tacc.chameleoncloud.org/

|Picture - Horizon Login.png|

You should land on the Compute overview page for your default project.
The pie charts on the page will show you what the current usage of
things like instances and floating IPs is relative to the limit for your
project. The usage summary will show historical usage of your project
for a time period that can be selected. The usage box will show
information about the instances currently running in your project.

|Picture - 2 Default project\_bz6C1na.png|

You can select the project that you want to use via the list at the
right of the logo. This guide uses the Chameleon project, but any
project will work the same.

|Picture - 3 Project List.png|

To access the reservation system, click on Reservations then Leases.

|Picture - 4 Reservations dashboard.png|

To discover when resources are available, access the lease calendar.
This will display a Gantt chart of the reservations which allows you to
find when resources are available. The Y axis represents the different
physical nodes in the system and the X axis represents time.

|Picture - 5 Gantt.png|

Once you have chosen a time period when you want to reserve resources,
go back to the Leases screen and click on "Create Lease". It should
bring up the window displayed below:

|Picture - 6 Create lease.png|

#. Pick a name for the lease. This name needs to be unique across your
   project. This example uses the name my-first-lease.
#. Pick a start time; if you want to create your lease soon pick a start
   time in the near future. **Note that it must be entered in UTC!** You
   can get the UTC time by running “date -u” in your terminal.
#. Pick an end time. Similarly, you must use UTC.
#. Choose the number of hosts, it is 1 by default.
#. Click on the “Create” button

|Picture - 7 Create lease.png|

Once created the lease details will be displayed. At the bottom of the
page are the details about the reservation. Initially the reservation is
in the Pending status, and stays in this state until we reach the start
time.

|Picture - 8 Lease details.png|

Once the start time of the lease is reached, the lease will be started
and its reservation will change to "Active"; you may need to refresh the
page to see this.

|Picture - 8 Reservation active.png|

Configuring resources
---------------------

Once your lease is started, you are almost ready to start an instance.
But first, you need to make sure that you will be able to connect to it
by setting up a key pair. This only has to be done once per user per
project.

Go to Project > Compute > Access & Security, then select the Key Pairs
tab.

Here you can either get OpenStack to create an SSH key pair for you via
the "Create Key Pair" button. If you already have an SSH key pair on
your machine and are happy to use it, click on "Import Key Pair".

| Enter a name for the key pair, for example laptop. In the "Public Key"
  box, copy the content of your SSH public key. Typically it will be at
  ~/.ssh/id\_rsa.pub. On Mac OS X, you can run in a terminal:
  ``cat ~/.ssh/id_rsa.pub | pbcopy``
| It copies the content of the public key to your copy/paste buffer.
  Then you can simply paste in the "Public Key" box.

Then, click on the blue "Import Key Pair" button. This should show you
the list of key pairs, with the one you just added.

.. raw:: html

   <div
   style="background: #eee; border: 1px solid #ccc; padding: 5px 10px;">

For those already familiar with OpenStack, note that Security Groups are
not currently functioning. All instances are open to the outside world;
Security Group rules are not respected. Chameleon staff are working to
resolve this limitation.

.. raw:: html

   </div>

Now, go to the "Instances" panel.

Click on the "Launch Instance" button in the top right corner. Select a
reservation in the Reservation box, pick an instance name (in this
example my-first-instance) and in the Image Name list select our default
environment named CC-CentOS7. If you have multiple key pairs registered,
you need to select one in the "Access & Security" tab. Finally, click on
the blue "Launch" button.

The instance will show up in the instance list, at first in Build
status. It takes a few minutes to deploy the instance on bare-metal
hardware and reboot the machine.

After a few minutes the instance should become in Active status and the
Power State should be Running.

At this point the instance might still be booting: it might take a
minute or two to actually be accessible on the network and accept SSH
connections. In the meantime, you can attach a floating IP to the
instance. Click on the "Associate Floating IP" button. You should get a
screen like the one below:

If there are no unused floating IP already allocated to your project,
click on the + button. In the window that opens, select the ext-net pool
if not already selected by default and click on the blue Allocate IP
button.

You will be returned to the previous window. The correct value for "Port
to be associated" should already be selected, so you only have to click
on "Associate".

This should send you back to the instance list, where you can see the
floating IP attached to the instance (you may need to refresh your
browser to see the floating IP).

Interacting with resources
--------------------------

Now you should be able to connect to the instance via SSH using the cc
account. In a terminal, type ssh cc@<floating\_ip>, in our example this
would be ``ssh cc@130.202.88.241``

SSH will probably tell you:

``The authenticity of host '130.202.88.241 (130.202.88.241)' can't be established. RSA key fingerprint is 5b:ca:f0:63:6f:22:c6:96:9f:c0:4a:d8:5e:dd:fd:eb. Are you sure you want to continue connecting (yes/no)?``

Type yes and press Enter. You should arrive to a prompt like this one:

``[cc@my-first-instance ~]$``

If you notice SSH errors such as connection refused, password requests,
or failures to accept your key, it is likely that the physical node is
still going through the boot process. In that case, please wait before
retrying. Also make sure that you use the **cc** account. If after 10
minutes you still cannot connect to the machine, it might be a hardware
issue. Please terminate and relaunch the instance to give it another
chance. If this still doesn't work, open a ticket with our helpdesk,
providing the IDs of the instances that do not work and the ID of the
lease used to launch them.

You can now check whether the resource matches its known description in
the resource registry. For this, simply run: ``sudo cc-checks -v``

The cc-checks program prints the result of each check in green if it is
successful and red if it failed.

You can now run your experiment directly on the machine via SSH. You can
run commands with root privileges by prefixing them with ``sudo``. To
completely switch user and become root, use the ``sudo su - root``
command.

Gathering results
-----------------

The default Chameleon image is configured to send a selection of system
metrics to the OpenStack Ceilometer service. Visualizing these metrics
is not yet supported in the web interface. To gather metrics, use the
ceilometer command line tool. First, install it on our own machine
(laptop or workstation) by |Link - following these instructions|; you
want to install the python-ceilometer client.

Then, set up your environment for OpenStack command line usage, as
described in the |Link - advanced usage section|.

Now, you can run the Ceilometer command line utility. To show the
different kinds of metrics gathered by Ceilometer, run:
\ ``ceilometer meter-list -q 'resource_id=<instance_id>'``

To get all the samples of a particular metric, run:
``ceilometer sample-list -m <meter_name> -q 'resource_id=<instance_id>'``

The following metrics are collected by Ceilometer:

-  hardware.cpu.load.15min
-  hardware.cpu.load.1min
-  hardware.cpu.load.5min
-  hardware.disk.size.total
-  hardware.disk.size.used
-  hardware.memory.avail
-  hardware.memory.swap
-  hardware.memory.total
-  hardware.memory.used
-  hardware.network.incoming.bytes
-  hardware.network.ip.incoming.datagrams
-  hardware.network.ip.outgoing.datagrams
-  hardware.network.outgoing.bytes
-  hardware.network.outgoing.errors
-  hardware.system\_stats.cpu.idle
-  hardware.system\_stats.io.incoming.blocks
-  hardware.system\_stats.io.outgoing.blocks

Chameleon Object Store
----------------------

Chameleon provides an object store service through the OpenStack Swift
interface. It is intended to be used for storing and retrieving data
used during experiments, such as input files needed for your
applications, or results produced by your experiments.

The object store can be accessed from anywhere using OpenStack Swift
command line client. In particular, you can access the object store from
instances running on CHI@TACC, CHI@UC and KVM@TACC by using your
`CHI@TACC OpenStack RC
file <https://www.chameleoncloud.org/docs/bare-metal-user-guide/#toc-setting-up-your-environment-for-the-openstack-command-line-tools>`__
(UC users will see more latency impact since the object store is located
at TACC). To make it easier for you to use use the object store client
we installed it in all appliances supported by Chameleon. Additionally,
you can also access the object store from the `CHI@TACC web
interface <http://docs.openstack.org/user-guide/dashboard_manage_containers.html>`__
under the Object Store panel.

Please, follow the Chameleon `Swift QuickStart
Guide <https://www.chameleoncloud.org/docs/user-guides/openstack-object-storage-quickstart/>`__
to use Swift from command line. You can also consult the more extensive
OpenStack Documentation to learn more about managing objects and
containers from both
`dashboard <http://docs.openstack.org/user-guide/dashboard_manage_containers.html>`__
and `command
line <http://docs.openstack.org/user-guide/managing-openstack-object-storage-with-swift-cli.html>`__.

This object store service is currently backed by a
`Ceph <http://ceph.com>`__ cluster with more than 1.6 PB of capacity.
The data is replicated, keeping two copies of each object, effectively
providing over 800 TB of storage available to users. This storage
capacity will increase as the project goes on. The replication should
provide good availability in case of hardware failures. However, all
copies are kept within the same data center and are not backed up on a
separate system; if you feel that this does not provide sufficient
reliability in your case, you should consider backing up really critical
data externally.

Advanced usage
--------------

The sections above present the most user friendly mode of usage, with
most actions performed via the web interface. However, Chameleon can be
accessed via the OpenStack command line tools which provides more
capabilities. This section presents some advanced usage using the
command line tools.

Setting up your environment for the OpenStack command line tools
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The OpenStack command line tools expect several environment variables to
be set in order to communicate with the OpenStack services. To set up
your environment, first download the OpenStack credentials file from the
web interface. Go to Access & Security > API Access and click on the
"Download OpenStack RC" file button.

Then, initialize our shell environment to communicate with the Chameleon
testbed. From a terminal shell on your own machine, run:
``source ~/Downloads/Chameleon-openrc.sh``
This command will prompt you for a password. Type your Chameleon
password (it won’t be displayed in your terminal) and press Enter.
**Note: adapt the path of the RC file depending on where you downloaded
it. It should be at the above location on OS X.**

Reserving resources
~~~~~~~~~~~~~~~~~~~

To reserve specific resources, based on their identifier or their
resource specifications, you must use the Blazar command line client. As
python-blazarclient is not packaged on PyPI, you must install it from
GitHub, preferably in a virtualenv. For example on CentOS, run the
following commands:

``sudo yum install python-virtualenv virtualenv blazarclient source blazarclient/bin/activate pip install git+https://github.com/stackforge/python-blazarclient``

.. raw:: html

   <div
   style="background: #eee; border: 1px solid #ccc; padding: 5px 10px;">

``Note that the Python Blazar client is not yet compatible with Python 3: please use Python 2.7 instead.``

.. raw:: html

   </div>

You might have to adapt these commands for non-CentOS platforms, please
consult the documentation specific to your operating system. Also make
sure that your environment is set up for using the OpenStack command
line tools, as described in the previous section.

To create a lease contain compute nodes, you can run the command give in
the following example:

``climate lease-create --physical-reservation min=1,max=1,resource_properties='["=", "$node_type", "compute``\ ``"]' --start-date "2015-06-17 16:00" --end-date "2015-06-17 18:00" my-first-lease``

It is also possible to create a lease with specific requirements. It is
done with the resource\_properties argument of the
--physical-reservation option. To reserve the node with UID
4c06903f-8593-4cec-9b25-eb6f155487b9:

``climate lease-create --physical-reservation min=1,max=1,resource_properties='["=", "$uid", "c9f98cc9-25e9-424e-8a89-002989054ec2``\ ``"]' --start-date "2015-06-17 16:00" --end-date "2015-06-17 18:00" my-custom-lease``

Instead of uid, you can use any resource property that is in the
resource registry. To see the list of properties of nodes, first get the
full list of nodes with ``climate host-list``, then run
``climate host-show <host_id>``, where <host\_id> is taken from the
first column of host-list.

``$ climate host-show 193 Starting new HTTPS connection (1): ironic.chameleon.tacc.utexas.edu Starting new HTTPS connection (1): ironic.chameleon.tacc.utexas.edu Starting new HTTPS connection (1): ironic.chameleon.tacc.utexas.edu``
``+--------------------------------+-------------------------------------------------+ | Field                          | Value                                           | +--------------------------------+-------------------------------------------------+ | architecture.platform_type     | x86_64                                          | | architecture.smp_size          | 2                                               | | architecture.smt_size          | 8                                               | | bios.release_date              | 04/06/2010                                      | | bios.vendor                    | Dell Inc.                                       | | bios.version                   | 2.0                                             | | chassis.manufacturer           | Dell Inc.                                       | | chassis.name                   | PowerEdge M610                                  | | chassis.serial                 | 8X71JM1                                         | | cpu_info                       | baremetal cpu                                   | | created_at                     | 2015-04-06 14:03:06                             | | gpu.gpu                        | False                                           | | hypervisor_hostname            | f0dddaa0-70db-4dff-aa5d-d093159321c7            | | hypervisor_type                | ironic                                          | | hypervisor_version             | 1                                               | | id                             | 193                                             | | local_gb                       | 128                                             | | main_memory.ram_size           | 12587876352                                     | | memory_mb                      | 11264                                           | | monitoring.wattmeter           | False                                           | | network_adapters.0.bridged     | False                                           | | network_adapters.0.device      | eno1                                            | | network_adapters.0.driver      | bnx2                                            | | network_adapters.0.interface   | Ethernet                                        | | network_adapters.0.mac         | 00:26:b9:fb:6e:e8                               | | network_adapters.0.management  | False                                           | | network_adapters.0.model       | NetXtreme II BCM5709S Gigabit Ethernet          | | network_adapters.0.mounted     | True                                            | | network_adapters.0.rate        | 1000000000                                      | | network_adapters.0.switch      |                                                 | | network_adapters.0.switch_port |                                                 | | network_adapters.0.vendor      | Broadcom Corporation                            | | network_adapters.1.bridged     | False                                           | | network_adapters.1.device      | eno2                                            | | network_adapters.1.driver      | bnx2                                            | | network_adapters.1.interface   | Ethernet                                        | | network_adapters.1.mac         | 00:26:b9:fb:6e:ea                               | | network_adapters.1.management  | False                                           | | network_adapters.1.model       | NetXtreme II BCM5709S Gigabit Ethernet          | | network_adapters.1.mounted     | False                                           | | network_adapters.1.rate        | 1000000000                                      | | network_adapters.1.vendor      | Broadcom Corporation                            | | operating_system.kernel        | 3.10.0-123.20.1.el7.x86_64                      | | operating_system.name          | centos                                          | | operating_system.version       | 7.0.1406                                        | | processor.cache_l1             |                                                 | | processor.cache_l1d            | 32768                                           | | processor.cache_l1i            | 32768                                           | | processor.cache_l2             | 262144                                          | | processor.cache_l3             | 8388608                                         | | processor.clock_speed          | 2660000000                                      | | processor.instruction_set      | x86-64                                          | | processor.model                | Intel Xeon                                      | | processor.other_description    | Intel(R) Xeon(R) CPU           X5550  @ 2.67GHz | | processor.vendor               | Intel                                           | | processor.version              | X5550                                           | | service_name                   | f0dddaa0-70db-4dff-aa5d-d093159321c7            | | status                         |                                                 | | storage_devices.0.device       | sda                                             | | storage_devices.0.driver       | mptsas                                          | | storage_devices.0.interface    | SCSI                                            | | storage_devices.0.model        | ST9146803SS                                     | | storage_devices.0.rev          | FS64                                            | | storage_devices.0.size         | 146815733760                                    | | storage_devices.0.vendor       | SEAGATE                                         | | supported_job_types.besteffort | False                                           | | supported_job_types.deploy     | True                                            | | supported_job_types.virtual    | ivt                                             | | trust_id                       | 809ba4086196479e9d43bff9765d8108                | | uid                            | f0dddaa0-70db-4dff-aa5d-d093159321c7            | | updated_at                     |                                                 | | vcpus                          | 8                                               | | version                        | 547815582085deb7b703d76a51e082c53aa9d9b4        | +--------------------------------+-------------------------------------------------+``

For example, you can use
``resource_properties='["=", "$processor.clock_speed", "2660000000"]'``
to reserve a node with a process running at 2.66 GHz. **Remember to use
a dollar sign in front of the property.**

Configuring resources
~~~~~~~~~~~~~~~~~~~~~

You can launch instances via the Nova command line client, which can be
installed in a virtualenv with ``pip install python-novaclient``. The
Nova client is also already installed in the CC-CentOS7 image. To launch
an instance inside a reservation, run:

``nova boot --flavor baremetal --image CC-CentOS7 --key-name <key_name> --nic net-id=<sharednet1_id> --hint reservation=<reservation_id> my-advanced-instance``

The ID of the sharednet1 network can be obtained using the
``neutron net-list`` command or by looking it up in the dashboard via
Network > Networks.

You can obtain the reservation ID via the web interface (see screenshot
below) or by running ``climate lease-show <lease_name>``. **Note that
the reservation ID and the lease ID are different.**

**|Picture - Reservation ID.png|**

Running a shell script on boot
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You might want to automatically execute some code after launching an
instance, whether it is installing packages, changing configuration
files, or running an application. OpenStack provides a mechanism called
to pass information to instances. This information can be any data in
any format, but if it is a shell script it will be automatically
executed after boot by . You can provide this shell script either via
the web interface in the "Post-Creation" tab when launching an instance,
or by providing a file to the nova command line using the
``--user-data`` option.

Kernel customization
~~~~~~~~~~~~~~~~~~~~

Before the February 2016 upgrade, support for kernel customizing on
bare-metal was limited due to the fact that instances were always
booting their kernel directly using PXE and a common kernel command
line. This required uploading kernel and ramdisk files to the Glance
image repository as well as updating or creating a new OS image using
these artifacts.

However, it is now easy to customize the operating system kernel or
modify the kernel command line. You now have the option of modifying the
boot loader configuration (``/boot/grub2/grub.cfg`` on CentOS 7 images)
to point it to a new kernel on the local disk, or specifying kernel
parameters and then rebooting using this modified configuration.

To do this, you must be using a whole disk image rather than a partition
image. Whole disk images contain their own kernel and ramdisk files and
do not have kernel\_id and ramdisk\_id properties in the image
repository, unlike partition images.

Snapshot an instance
~~~~~~~~~~~~~~~~~~~~

All instances in Chameleon, whether KVM or bare-metal, are running off
disk images. The content of these disk images can be snapshotted at any
point in time, which allows you to save your work and launch new
instances from updated images later.

While OpenStack KVM has built-in support for snapshotting in the Horizon
web interface and via the command line, bare-metal instances require a
more complex process. To make this process easier, we developed the
`cc-snapshot <https://github.com/ChameleonCloud/ChameleonSnapshotting>`__
tool, which implements snapshotting a bare-metal instance from command
line and uploads it to Glance, so that it can be immediately used to
boot a new bare-metal instance. The snapshot images created with this
tool are whole disk images.

For ease of use, *cc-snapshot* has been installed in all the appliances
supported by the Chameleon project. If you would like to use it in a
different setting, it can be downloaded and installed from the `github
repository <https://github.com/ChameleonCloud/ChameleonSnapshotting>`__.

Once cc-snapshot is installed, to make a snapshot of a bare-metal
instance, run the following command from inside the instance:
``sudo cc-snapshot <snapshot_name>``

You can verify that it has been uploaded to Glance by running the
following command:
``glance image-list``

If you prefer to use a series of standard Unix commands, or are
generally interested in more detail about image management, please refer
to our `image management
guide <https://www.chameleoncloud.org/docs/user-guides/ironic/#snapshotting_an_instance>`__.

Building and customizing Chameleon disk images 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Chameleon supports several official disk images (CentOS, Ubuntu). The
image creation process is leveraging the
`diskimage-builder <https://github.com/openstack/diskimage-builder>`__
software, which has enabled us to have images that work both on
bare-metal and KVM clouds. The scripts used to generate images are
public and can be accessed on GitHub:

-  `CC-CentOS7 <https://github.com/ChameleonCloud/CC-CentOS7>`__
-  `CC-Ubuntu14.04 <https://github.com/ChameleonCloud/CC-Ubuntu14.04>`__
-  `CC-Ubuntu16.04 <https://github.com/ChameleonCloud/CC-Ubuntu16.04>`__

Each repository has a README explaining how to generate the image, which
is done via a single script invocation. If you need to perform
customisation to one of these images, do not hesitate to fork the
corresponding project!

Running virtual machines on bare hardware
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For cloud computing and virtualization experiments, you might want to
run virtual machines on bare hardware that you fully control rather than
use the shared OpenStack KVM cloud. There are many different ways to
configure networking for virtual machines. The configuration described
below will enable you to connect your virtual machines to the Internet
using a which you must first configure manually on your host on the
default network interface.

First, set up your environment for the OpenStack command line tools by
following the instructions above. Install the Neutron client in a
virtualenv with ``pip install python-neutronclient``. Then, for each
virtual machine you want to run, request a Neutron port with
``neutron port-create sharednet1``. This should display, among other
information:

-  a fixed IP in the same private network as the physical nodes
-  a MAC address

Finally, start your virtual machine while assigning it the MAC address
provided by OpenStack. If your image is configured to use DHCP, the
virtual machine should receive the allocated IP.

Neutron ports allocated this way are not automatically deleted, so
please delete them after your experiment is over using the command line
``neutron port-delete``. You need to pass the ID of the ports, which you
can find with ``neutron port-list``.

Schedule instances on specific physical nodes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you have a reservation for multiple physical nodes, explicitly
identified with their UUIDs, you might want to force an instance to be
launched on a specific node rather than letting the scheduler select
one. This can be done with the Nova command line using a scheduler hint:

``nova boot --flavor baremetal --image CC-CentOS7 --key-name default --nic net-id=<sharednet1_id> --hint reservation=<reservation_id> --hint query='["=","$hypervisor_hostname", "<node_uuid>"]' <instance_name>``

From within an instance, you can discover which node it is running on by
executing
``curl http://169.254.169.254/openstack/latest/vendor_data.json`` which
will return a JSON dictionary describring site, cluster, and node.

Customize networking
~~~~~~~~~~~~~~~~~~~~

The bare metal deployment system used by Chameleon (OpenStack Ironic) is
currently restricted to using a single shared network per site. The
network configuration features available in the dashboard are not
supported (Networks and Routers).

Reserving nodes with heterogeneous hardware
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

It is possible to get an access to bare-metal nodes that contain very
specific hardware such as GPUs or storage hierarchy (enabling
experiments using multiple layers of caching). These nodes can be
discovered thanks to the `resource discovery
interface <https://www.chameleoncloud.org/user/discovery/>`__.

Via the dashboard
^^^^^^^^^^^^^^^^^

To use one of these nodes, please identify its ID in the resource
discovery interface, and during the creation of a new lease, enter the
ID in the ***Reserve Specific Node*** field.

For information, the IDs of the nodes with heterogeneous hardware are
listed below:

Type

IDs

Storage Hierarchy nodes

-  21945871-35b6-4d74-9af7-af4c9cd86b70
-  fe6c6005-c63d-4c0f-a653-e474d9191c43

GPU nodes (Nvidia K80)

-  5632a770-a933-4264-b90b-43181592f090
-  b8ea6a5d-3836-4df0-a3dc-c7047171f522

GPU nodes (Nvidia M40)

-  151ab019-81ef-471d-b552-16f12f4b4a3f
-  bb5c000d-6538-49a4-9d34-61441bf9f77d

Reserving special nodes via command line
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following commands illustrate how to reserve nodes with
heterogeneous hardware:

Type

Command

Storage nodes

``climate lease-create --physical-reservation min=2,max=2,resource_properties='["=", "$node_type", "storage"]' --start-date "2016-06-22 20:38" --end-date "2016-06-25 15:00" reserving-storage-nodes``

Infiniband nodes

``climate lease-create --physical-reservation min=2,max=2,resource_properties='["=", "$node_type", "compute_ib"]' --start-date "2016-06-22 20:38" --end-date "2016-06-25 15:00" reserving-infiniband-nodes``

Storage Hierarchy nodes

``climate lease-create --physical-reservation min=2,max=2,resource_properties='["=", "$node_type", "storage_hierarchy"]' --start-date "2016-06-22 20:38" --end-date "2016-06-25 15:00" reserving-ssd-nodes``

Nvidia K80 nodes

``climate lease-create --physical-reservation min=2,max=2,hypervisor_properties='["=", "$node_type", "gpu_k80"]' --start-date "2016-06-28 17:32" --end-date "2016-06-28 20:32" reserving-k80-nodes``

Nvidia M40 nodes

``climate lease-create --physical-reservation min=2,max=2,hypervisor_properties='["=", "$node_type", "gpu_k40"]' --start-date "2016-06-28 17:32" --end-date "2016-06-28 20:32" reserving-m40-nodes``

Troubleshooting
---------------

I can't SSH to my instance!
~~~~~~~~~~~~~~~~~~~~~~~~~~~

You might be seeing the following issues:

-  SSH doesn't reply (``ssh -vvv`` shows
   ``Connecting to <HOST_IP> [<HOST_IP>] port 22.``)
-  SSH asks for a password
-  SSH says
   ``Permission denied (publickey,gssapi-keyex,gssapi-with-mic).``

First, if you are using the **CC-CentOS7** image or one of its
derivates, make sure that you are using the **cc** account, rather than
ubuntu or your Chameleon username.
However, if you are using an Ubuntu image, the account to use will be
**ubuntu**.

Also wait for several minutes after launch as the physical node might
still be in the process of fully booting the operating system. We
recommend trying to SSH until the instance has been running for 10
minutes. If after 10 minutes you still cannot connect to the machine,
please .

The OpenStack web interface works fine but the command line clients complain about Authorization Failed: Unable to establish connection
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you get an error such as
``Authorization Failed: Unable to establish connection to https://openstack.uc.chameleoncloud.org:5000/v2.0/tokens``
when using the OpenStack command line clients, but you can use the web
interface without problem, this is likely because a firewall device is
blocking access to port 5000. Some institutions block port 5000 as it
also used for UPnP and some trojan horses on Windows. We recommend that
you and also contact your network administrator.

.. |Link - Discovering resources| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16661
.. |Link - Reserving resources| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16662
.. |Link - Configuring resources| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16664
.. |Link - Interacting with resources| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16663
.. |Link - Gathering results| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16665
.. |Link - advanced usage| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16666
.. |Link - troubleshooting| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16667
.. |Link - Resource discovery| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16646
.. |Link - resource discovery web interface| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16656
.. |Link - separate guide| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16658
.. |Link - Reference API from the Grid'5000 project| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16657
.. |Picture - RD1.png| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_16659
.. |Picture - RD2.png| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_16660
.. |Picture - Horizon Login.png| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_16647
.. |Picture - 2 Default project\_bz6C1na.png| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_16648
.. |Picture - 3 Project List.png| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_16649
.. |Picture - 4 Reservations dashboard.png| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_16650
.. |Picture - 5 Gantt.png| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_16651
.. |Picture - 6 Create lease.png| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_16653
.. |Picture - 7 Create lease.png| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_16652
.. |Picture - 8 Lease details.png| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_16654
.. |Picture - 8 Reservation active.png| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_16655
.. |Link - following these instructions| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16670
.. |Link - advanced usage section| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16669
.. |Picture - Reservation ID.png| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_16668
