Configure and interact with resources (using the command line)
==============================================================

Create an instance with the nova client
---------------------------------------

You can launch instances via the Nova command line client, which can be
installed in a virtualenv with \ ``pip install python-novaclient``. The
Nova client is also already installed in the CC-CentOS7 image. To launch
an instance inside a reservation, run: 

``nova boot --flavor baremetal --image CC-CentOS7 --key-name <key_name> --nic net-id=<sharednet1_id> --hint reservation=<reservation_id> my-advanced-instance``

The ID of the sharednet1 network can be obtained using the
``neutron net-list`` command or by looking it up in the dashboard via
Network > Networks.

You can obtain the reservation ID via the web interface or by
running \ ``climate lease-show <lease_name>``. \ **Note that
the reservation ID and the lease ID are different.**

Run a shell script on boot
--------------------------

You might want to automatically execute some code after launching an
instance, whether it is installing packages, changing configuration
files, or running an application. OpenStack provides a mechanism called
|Link| to pass information to instances. This information can be any
data in any format, but if it is a shell script it will be automatically
executed after boot by
`cloudinit <https://cloudinit.readthedocs.io/en/latest/>`__. You can
provide this shell script either via the web interface in the
"Post-Creation" tab when launching an instance, or by providing a file
to the nova command line using the \ ``--user-data`` option.

Customize the kernel
--------------------

Before the February 2016 upgrade, support for kernel customizing on
bare-metal was limited due to the fact that instances were always
booting their kernel directly using PXE and a common kernel command
line. This required uploading kernel and ramdisk files to the Glance
image repository as well as updating or creating a new OS image using
these artifacts.

However, it is now easy to customize the operating system kernel or
modify the kernel command line. You now have the option of modifying the
boot loader configuration (``/boot/grub2/grub.cfg`` on CentOS 7
images) to point it to a new kernel on the local disk, or specifying
kernel parameters and then rebooting using this modified configuration.

To do this, you must be using a whole disk image rather than a partition
image. Whole disk images contain their own kernel and ramdisk files and
do not have kernel\_id and ramdisk\_id properties in the image
repository, unlike partition images.

Snapshot an instance
--------------------

All instances in Chameleon, whether KVM or bare-metal, are running off
disk images. The content of these disk images can be snapshotted at any
point in time, which allows you to save your work and launch new
instances from updated images later.

While OpenStack KVM has built-in support for snapshotting in the Horizon
web interface and via the command line, bare-metal instances require a
more complex process. To make this process easier, we developed the
|Link| tool, which implements snapshotting a bare-metal instance from
command line and uploads it to Glance, so that it can be immediately
used to boot a new bare-metal instance. The snapshot images created with
this tool are whole disk images.

For ease of use, cc-snapshot has been installed in all the appliances
supported by the Chameleon project. If you would like to use it in a
different setting, it can be downloaded and installed from |Link|.

Once cc-snapshot is installed, to make a snapshot of a bare-metal
instance, run the following command from inside the instance:

::

    sudo cc-snapshot <snapshot_name>

You can verify that it has been uploaded to Glance by running the
following command:

::

    glance image-list

If you prefer to use a series of standard Unix commands, or are
generally interested in more detail about image management, please refer
to our |Link|.

Building and customizing Chameleon disk images
----------------------------------------------

Chameleon supports several official disk images (CentOS, Ubuntu). The
image creation process is leveraging the diskimage-builder software,
which has enabled us to have images that work both on bare-metal and KVM
clouds. The scripts used to generate images are public and can be
accessed on GitHub:

-  |Link|
-  |Link|
-  |Link|

Each repository has a README explaining how to generate the image, which
is done via a single script invocation. If you need to perform
customisation to one of these images, do not hesitate to fork the
corresponding project!

Run virtual machines on bare hardware
-------------------------------------

For cloud computing and virtualization experiments, you might want to
run virtual machines on bare hardware that you fully control rather than
use the shared OpenStack KVM cloud. There are many different ways to
configure networking for virtual machines. The configuration described
below will enable you to connect your virtual machines to the Internet
using a `KVM public
bridge <http://www.linux-kvm.org/page/Networking#public_bridge>`__ which
you must first configure manually on your host on the default network
interface.

First, set up your environment for the OpenStack command line tools
by following the instructions above. Install the Neutron client in a
virtualenv with \ ``pip install python-neutronclient``. Then, for each
virtual machine you want to run, request a Neutron port with
``neutron port-create sharednet1``. This should display, among other
information:

-  a fixed IP in the same private network as the physical nodes
-  a MAC address

Finally, start your virtual machine while assigning it the MAC address
provided by OpenStack. If your image is configured to use DHCP, the
virtual machine should receive the allocated IP.

Neutron ports allocated this way are not automatically deleted, so
please delete them after your experiment is over using the command line
``neutron port-delete``. You need to pass the ID of the ports, which you
can find with ``neutron port-list``.

Schedule instances on specific physical nodes
---------------------------------------------

If you have a reservation for multiple physical nodes, explicitly
identified with their UUIDs, you might want to force an instance to be
launched on a specific node rather than letting the scheduler select
one. This can be done with the Nova command line using a scheduler hint:

``nova boot --flavor baremetal --image CC-CentOS7 --key-name default --nic net-id=<sharednet1_id> --hint reservation=<reservation_id> --hint query='["=","$hypervisor_hostname", "<node_uuid>"]' <instance_name>``

From within an instance, you can discover which node it is running on by
executing
``curl http://169.254.169.254/openstack/latest/vendor_data.json`` which
will return a JSON dictionary describing site, cluster, and node.

Customize networking
--------------------

In its default configuration, the bare metal deployment system used by
Chameleon (OpenStack Ironic) is restricted to using a single shared
network per site. The network configuration features available in the
dashboard are not supported (Networks and Routers).

On CHI@UC, network layer 2 isolation is optionally available for compute
nodes. See our \ |Link| page for more details.

Use FPGAs
---------

Consult the |Link| if you would like to use the FPGAs available on
Chameleon.

Next Step
---------

Now that you have created some resources, it is time to interact with
them! You will find instructions to the next step by visiting the
following link:

-  |Link|

.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16802
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16815
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16816
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16817
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16826
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16827
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16828
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_17192
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16780
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16723
