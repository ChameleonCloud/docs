Launching Instances with the CLI
================================

.. tip::

   Reading :ref:`cli` is highly recommended before continuing on the following
   sections.

Creating an instance with the CLI
---------------------------------

To launch an instance inside a reservation, run:

.. code-block:: bash

   openstack server create \
   --image CC-CentOS8 \
   --flavor baremetal \
   --key-name <key_name> \
   --nic net-id=<sharednet1_id> \
   --hint reservation=<reservation_id> \
   my-instance

The ID of the ``sharednet1`` network can be obtained using the command:

.. code-block:: bash

   openstack network list

Alternatively, you may look it up in the GUI in the *Network* > *Networks* page.
You can obtain your *reservation ID* via the GUI or by running:

.. code-block:: bash

   openstack reservation lease show <lease_name>

.. attention:: The **reservation ID** and the **lease ID** are different

Running a script on boot
^^^^^^^^^^^^^^^^^^^^^^^^

You might want to automatically execute some code after launching an instance,
whether it is installing packages, changing configuration files, or running an
application. OpenStack provides a mechanism called `User Data
<https://docs.openstack.org/latest/user/#term-user-data>`_ to pass information
to instances. This information can be any data in any format, but if it is a
shell script it will be automatically executed after boot by `cloudinit
<https://cloudinit.readthedocs.io/en/latest/>`_. You can provide this shell
script either via the GUI in the *Configuration* tab when launching an
instance, or by providing a file to the nova command line using the
``--user-data`` option.

.. _turn-off-appliance-agents:
.. tip::

   Chameleon supported images are configured with appliance agents, including
   ``collectd`` (for system monitoring) and :ref:`Heat agents <all-to-all-info-exchange>`.
   To turn off appliance agents on boot, in order to remove the potential impact
   on experimental measurements, pass the following script as ``user-data``.

   .. code-block:: bash

      #!/bin/bash
      systemctl stop collectd.service
      systemctl disable collectd.service
      systemctl stop os-collect-config.service
      systemctl disable os-collect-config.service

   Turning off ``collectd`` will **stop** collecting system metrics, but you can
   restart and configure the daemon anytime for monitoring your experiment. For power
   monitoring capabilities, see :ref:`power-monitoring`.

Customizing the Kernel
----------------------

It is easy to customize the operating system kernel or modify the kernel command
line. You now have the option of modifying the boot loader configuration (e.g.,
``/boot/grub2/grub.cfg`` on CentOS 7 images) to point it to a new kernel on the
local disk, or specifying kernel parameters and then rebooting using this
modified configuration.

To do this, you must be using a whole disk image rather than a partition image.
Whole disk images contain their own kernel and ramdisk files and do not have
``kernel_id`` and ``ramdisk_id`` properties in the image repository, unlike
partition images. Most Chameleon base images are whole disk images, giving you
a good place to start if you're interested in custom kernels.

Running virtual machines on bare metal
--------------------------------------

For cloud computing and virtualization experiments, you might want to run
virtual machines on bare hardware that you fully control rather than use the
shared OpenStack KVM cloud. There are many different ways to configure
networking for virtual machines. The configuration described below will enable
you to connect your virtual machines to the Internet using a `KVM Public Bridge
<http://www.linux-kvm.org/page/Networking#public_bridge>`_ which you must first
configure manually on your host on the default network interface.

First, set up your environment for the OpenStack command line tools by following
:ref:`the instructions <cli>`. Install the `Neutron
<https://docs.openstack.org/neutron/latest/>`_ client in a virtualenv with:

.. code-block:: bash

   pip install python-neutronclient

Then, for each virtual machine you want to run, request a `Neutron
<https://docs.openstack.org/neutron/latest/>`_ port with:

.. code-block:: bash

   openstack port-create sharednet1

This should display, among other information:

- A fixed IP in the same private network as the physical nodes
- A MAC address

Finally, start your virtual machine while assigning it the *MAC address*
provided by OpenStack. If your image is configured to use *DHCP*, the virtual
machine should receive the allocated IP.

Neutron ports allocated this way are not automatically deleted, so delete
them after your experiment is over using:

.. code-block:: bash

   openstack port delete <id>

You may find the ID of your ports using:

.. code-block:: bash

   openstack port list


Inspecting your node
--------------------

From within an instance you have already launched, you can discover which node
it is running on by executing

.. code-block:: bash

   curl http://169.254.169.254/openstack/latest/vendor_data.json

This will return a JSON dictionary describing site, cluster, and node.

Customizing networking
----------------------

In its default configuration, the bare metal deployment system used by Chameleon
(OpenStack Ironic <https://docs.openstack.org/ironic/latest/>`_) is restricted
to using a single shared network per site. The network configuration features
available in the dashboard are not supported (Networks and Routers). On
|CHI@UC|, network layer 2 isolation is optionally available for compute nodes.
You may find more details on the documentation for :ref:`networking`.