=====================
Bare metal instances
=====================

Before launching an instance, make sure you own a lease. About how to create a
lease, please see :ref:`reservations`. Once your lease is started, you are
almost ready to start an instance. But first, you need to make sure that you
will be able to connect to it by setting up :ref:`gui-key-pairs`.

Launching instances with the GUI
================================

.. _baremetal-gui-launch:

Launch an instance
------------------

To launch an instance with the GUI, follow the steps:

#. In the navigation side bar, click *Project* > *Compute* > *Instances* to get
   to the *Instances* page.

   .. figure:: baremetal/instancespage.png
      :alt: The Instances page

      The Instances page

#. Click the *Launch Instance* button in the upper right corner. This will open
   the *Launch Instance* wizard with several configuration steps. Steps with
   ``*`` are required.

   .. figure:: baremetal/launchinstance.png
      :alt: The Launch Instance wizard.

      The Launch Instance wizard.

#. In the *Details* step, enter a name for your instance that is unique within
   your project and select a currently active reservation for the instance.

#. In the *Source* step, select an image for your instance and click the "up"
   arrow. The image should move to the *Allocated* list, and can be removed by
   clicking the "Down" arrow if you wish to select a different image.

   .. figure:: baremetal/launchsource.png
      :alt: The Source configuration step

      The Source configuration step

#. In the *Flavor* step, select the *baremetal* flavor by clicking the "up"
   arrow next to it. This is the only flavor available.

   .. figure:: baremetal/launchflavor.png
      :alt: The Flavor configuration step

      The Flavor configuration step

   .. hint::

      If you are familiar with Openstack, other implementations allow for the
      selection of flavors based on machine disk size and RAM. On Chameleon, the
      only flavor available is "baremetal" because hardware selection is
      performed in reservations.

#. In the *Networks* step, select a network by clicking the "up" arrow next to
   it. To learn about the Chameleon default network and how to create your own
   network, please see :ref:`networking`.

#. In the *Key Pair* step, select one of your SSH key pairs. If you only have
   one key pair associated with your account, then it is selected by default.

   .. figure:: baremetal/launchkeypair.png
      :alt: The Key Pair configuration step

      The Key Pair configuration step

   .. important::

      It is a good practice to make sure that the instance is launching with the
      key pair of your choice, or you will not be able to access your instance.

   .. tip::
      You may import or create key pairs directly through this step.

#. Optionally, you may configure *Scheduler Hints*. This is useful if you would
   like to launch an instance on a specific node in your multi-node reservation
   by *UUID*.

   - In the *Custom* text box, type ``query`` and click the *+* button. This
     will add a *query* hint to the list on the right.
   - In the *query* hint, enter your scheduler hint. For example, if you require
     a specific node, type ``["=","$hypervisor_hostname","<node_uuid>"]`` where
     ``<node_uuid>`` is the node you are requesting.

   .. figure:: baremetal/launchscheduler.png
      :alt: Adding a Scheduler Hint

      Adding a Scheduler Hint

#. If you want to customize your instance after it has launched, you can add a
   customization script in the *Configuration* step.

   - You can type in the script in *Customization Script*.
   - Or you can upload your script via *Load script from a file*.

   .. figure:: baremetal/customizationscript.png
      :alt: Adding a Customization Script

      Adding a Customization Script

      .. tip::
         You can :ref:`disable and turn off appliance agents
         <turn-off-appliance-agents>` using a customization script.

#. Finish configuring and start launching the instance by clicking on the
   *Launch Instance* button. The instance will show up in the instance list, at
   first in *Build* status. It takes a few minutes to deploy the instance on
   bare metal hardware and reboot the machine.

   .. figure:: baremetal/instancesbuild.png
      :alt: An Instance with the Build status

      An Instance with the Build status

#. After a few minutes, the instance should become *Active*. The power state
   will show as *Running*. You can now :ref:`baremetal-gui-associate-ip`.

   .. figure:: baremetal/instancesactive.png
      :alt: An Instance with the Active status

      An Instance with the Active status

#. To view instance details, click on the instance.

   .. figure:: baremetal/instancedetails.png
      :alt: Instance details

      Instance details

.. _baremetal-gui-associate-ip:

Associate a Floating IP
-----------------------

To make your instance publicly accessible over the Internet, you must associate
a *Floating IP Address* to it.

#. On the *Floating IPs* page (under the *Network* section in the left-hand
   sidebar), ensure that there is a free Floating IP available in your project.
   If there is not, click the *Allocate IP to Project* button to bring up the
   *Allocate Floating IP* dialog. In this dialog, you may simply click *Allocate
   IP*. You can optionally specify a description for the IP for your
   convenience.

   .. figure:: baremetal/associate_pool.png
      :alt: the Allocate Floating IP dialog

      The Allocate Floating IP dialog

#. Once a Floating IP is allocated to your project, it will display in the list
   view, and you can click the *Associate* button for the Floating IP to assign
   it to a running or spawning instance. This button will bring up the *Manage
   Floating IP Associations* dialog.

   .. figure:: baremetal/floating_ip_overview.png
      :alt: The Floating IP list view with a Floating IP available

      The Floating IP list view with a Floating IP available

#. In the dialog, select an instance from the "Port to be associated" dropdown.
   Your instance's display name will be displayed here. Click *Associate* to
   complete the process of assigning the IP to your instance.

   .. figure:: baremetal/associate_ip.png
      :alt: The Manage Floating IP Associations dialog with an IP selected

      The Manage Floating IP Associations dialog with an IP selected

#. If you go back to the *Instances* page, you should now see the *floating
   IP* attached to the instance.

   .. figure:: baremetal/instanceswithip.png
      :alt: An instance with an allocated Floating IP

      An instance with an allocated Floating IP

Launching Instances with the CLI
================================

.. tip::

   Reading :ref:`cli` is highly recommanded before continuing on the following
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
You can obtain your *reservation ID* via the web interface or by running:

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
script either via the web interface in the *Configuration* tab when launching an
instance, or by providing a file to the nova command line using the
``--user-data`` option.

.. _turn-off-appliance-agents:
.. tip::

   Chameleon supported images are configured with appliance agents, including
   :ref:`collectd <metrics>` and :ref:`Heat agents <all-to-all-info-exchange>`.
   To turn off appliance agents on boot, in order to remove the potential impact
   on experimental measurements, pass the following script as ``user-data``.

   .. code-block:: bash

      #!/bin/bash
      systemctl stop collectd.service
      systemctl disable collectd.service
      systemctl stop os-collect-config.service
      systemctl disable os-collect-config.service

   Turning off ``collectd`` will **stop** collecting :ref:`Gnocchi metrics
   <metrics>`, but you can :ref:`turn on and configure the daemon
   <configure-collectd>` anytime for monitoring your experiment.

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

Neutron ports allocated this way are not automatically deleted, so please delete
them after your experiment is over using:

.. code-block:: bash

   openstack port delete <id>

You may find the ID of your ports using:

.. code-block:: bash

   openstack port list

Launching instances on specific nodes
-------------------------------------

If you have a reservation for multiple physical nodes, explicitly identified
with their *UUIDs*, you might want to force an instance to be launched on a
specific node rather than letting the scheduler select one. This can be done
with the CLI using a scheduler hint:

.. code-block:: bash

   openstack server create \
   --image CC-CentOS8 \
   --flavor baremetal \
   --key-name <key_name> \
   --nic net-id=<sharednet1_id> \
   --hint reservation=<reservation_id> \
   --hint query='["=","$hypervisor_hostname","<node_uuid>"]' \
   <instance_name>

From within an instance you have already launched, you can discover which node
it is running on by executing

.. code-block:: bash

   curl http://169.254.169.254/openstack/latest/vendor_data.json

This will return a JSON dictionary describing site, cluster, and node.

Customizing networking
----------------------

In its default configuration, the bare metal deployment system used by Chameleon
(`OpenStack Ironic <https://docs.openstack.org/ironic/latest/>`_) is restricted
to using a single shared network per site. The network configuration features
available in the dashboard are not supported (Networks and Routers). On
|CHI@UC|, network layer 2 isolation is optionally available for compute nodes.
You may find more details on the documentation for :ref:`networking`.

Interacting with instances
==========================

Once your bare metal instance has launched, you may interact with it by using
SSH if you have associated a *Floating IP* to it or by using the *Serial
Console* from the GUI.

.. _connecting-via-ssh:

Connecting via SSH
------------------

If you have associated a *Floating IP* with the instance and you have the
private key in place, you should be able to connect to the instance via SSH
using the ``cc`` account.

To access the instance using SSH, type the command in your terminal:

   .. code-block:: bash

      ssh cc@<floating_ip>

.. error::
   If you get errors:

   .. code-block:: shell

      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
      ...

   It is likely that you have saved a previous entry for the instance's
   *Floating IP* in your ``~/.ssh/known_hosts`` file on your computer. Simply
   removing the entry from the file should solve the issue.

   You can remove the entry from the ``~/.ssh/known_hosts`` file by using the
   command:

   .. code-block:: shell

      ssh-keygen -R <floating_ip>

You may receive the response below. Type ``yes`` and hit enter:

   .. code::

      The authenticity of host '130.202.88.241 (130.202.88.241)' can't be established.
      RSA key fingerprint is 5b:ca:f0:63:6f:22:c6:96:9f:c0:4a:d8:5e:dd:fd:eb.
      Are you sure you want to continue connecting (yes/no)?

When logged in, your prompt may appear like this:

   .. code::

      [cc@my-first-instance ~]$

.. note::

   If you notice SSH errors such as connection refused, password requests, or
   failures to accept your key, it is likely that the physical node is still
   going through the boot process. In that case, please wait before retrying.
   Also make sure that you use the ``cc`` account. If after 10 minutes you still
   cannot connect to the machine, please open a ticket with our |Help Desk|.

You can now check whether the resource matches its known description in the
resource registry. For this, simply run:

   .. code-block:: bash

      sudo cc-checks -v

The ``cc-checks`` program prints the result of each check in green if it is
successful and red if it failed. You can now run your experiment directly on the
machine via SSH. You can run commands with root privileges by prefixing them
with ``sudo``. To completely switch user and become root, use the ``sudo su -
root`` command.

Connecting via serial console
-----------------------------

Chameleon now allows you to connect to the serial console of your bare metal
nodes via the GUI. Once your instance is deployed, click on the *Console* button
in the instance contextual menu.

.. figure:: baremetal/serialconsole.png
   :alt: The Serial Console button

   The serial console button

This should open a screen showing an interactive serial console (it could take
some time to show up, give it 30 seconds or so).

.. figure:: baremetal/instanceconsole.png
   :alt: An open Console

   An open console

Our latest images are configured to auto-login into the ``cc`` account. Other
images may show you a login prompt. You can set a password on the ``cc`` account
by accessing it via SSH, using the command ``sudo passwd cc``, and then using
this password to connect to the console.
