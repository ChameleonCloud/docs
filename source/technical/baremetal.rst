========================
Bare-metal Instances
========================

________________
Introduction
________________

Bare Metal access is a core Chameleon feature. When launched, a bare metal node is referred to as an *Instance*. It allows you to reserve and launch images on nodes with root access to the node and direct access to the hardware. This is useful for computer science experimentation such as power measurement. The pre-requisites for launching a bare metal node are:

- A configured SSH key within the GUI. For instructions on creating or importing an SSH key, see the documentation on :ref:`gui-key-pairs`.
- A reservation at either `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ or `CHI@UC <https://chi.uc.chameleoncloud.org>`_. For instructions on creating reservations, see the documentation on :ref:`reservations`

Once you have launched a bare metal instance, you may interact with it using SSH or the Serial Console.

________________________________
Launching Instances with the GUI
________________________________

You may use the GUI at either `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ or `CHI@UC <https://chi.uc.chameleoncloud.org>`_. Make sure that you have created an SSH Key Pair and made a Reservation for the hardware you wish to use. After launching an instance, you may access it either by associating a Floating IP address to the instance and logging in via SSH or by using the Serial Console in the GUI.

.. _baremetal-gui-launch:

Launch an Instance
_____________________

To launch an instance with the GUI, follow these steps:

#. In the navigation side bar, click *Project* > *Compute* > *Instances* to get to the *Instances* page.

   .. figure:: baremetal/instancespage.png
      :alt: The Instances page

      The Instances page

#. Click the *Launch Instance* button in the upper right corner. This will open the *Launch Instance* wizard. The left tabs display configuration steps. Steps labeled with a * are mandatory.

   .. figure:: baremetal/launchinstance.png
      :alt: The Launch Instance wizard.

      The Launch Instance wizard.

#. In the *Details* step, enter a name for your instance that is unique within your project and select a currently active reservation for the instance.
#. In the *Source* step, select an image to use for your instance by searching for it in the image list and clicking the "up" arrow next to the image. The *Allocated* list will display the image that is loaded. You may select a different image by clicking the "down" arrow next to your previously selected image in the *Allocated* list.

   .. figure:: baremetal/launchsource.png
      :alt: The Source configuration step

      The Source configuration step

#. In the *Flavor* step, select the *baremetal* flavor by clicking the "up" arrow next to it. This is the only flavor available.

   .. figure:: baremetal/launchflavor.png
      :alt: The Flavor configuration step

      The Flavor configuration step

#. In the *Key Pair* step, select one of your SSH key pairs. Although this step is not marked as mandatory, it is a good idea. If you do not select a key pair to be loaded on the bare metal instance, you may not be able to access it.

   .. figure:: baremetal/launchkeypair.png
      :alt: The Key Pair configuration step

      The Key Pair configuration step

#. Optionally, you may configure *Scheduler Hints*. This allows you to perform tasks such as launching your instance on a specific node within your reservation by UUID number.

   - In the *Custom* text box, type ``query`` and click the *+* button. This will add a *query* hint to the list on the right.
   - In the *query* hint, enter your scheduler hint. For example, if you require a specific node, type ``["=","$hypervisor_hostname","<node_uuid>"]`` where ``<node_uuid>`` is the node you are requesting.

   .. figure:: baremetal/launchscheduler.png 
      :alt: Adding a Scheduler Hint

      Adding a Scheduler Hint

#. When you are finished configure your instance, click the *Launch Instance* button. You will be returned to the *Instances* page, with your new instance appearing in the list with the *Build* status. It takes a few minutes to deploy the instance on bare metal hardware and reboot the machine.

   .. figure:: baremetal/instancesbuild.png
      :alt: An Instance with the Build status

      An Instance with the Build status

#. After a few minutes, the instance should become *Active*. The power state will show as *Running*. You can now :ref:`baremetal-gui-associate-ip`.

   .. figure:: baremetal/instancesactive.png
      :alt: An Instance with the Active status

      An Instance with the Active status

.. _baremetal-instance-id:

#. You may view instance information by clicking on an instance. This information include's the instance's *ID*, useful for retrieving metrics from the Gnocchi CLI.

   .. figure:: baremetal/instancedetails.png
      :alt: Instance details

      Instance details

.. _baremetal-gui-associate-ip:

Associate a Floating IP
_______________________

To make your instance publicly accessible over the Internet, you must associate a *Floating IP Address* to it. This will assign a publicly routable IP address to the instance which you may use to SSH into the instance. To associate a Floating IP, follow the steps below.

.. note:: All ports are accessible on a bare metal instance, and security groups are not observed. Assigning your instance a Floating IP address will make it completely accessible over the Internet. Therefore, it is a good idea to configure a firewall on your instance.

#. On the *Instances* page, click the *Associate Floating IP* button next to your bare metal instance. This will load the *Manage Floating IP Assocations* dialog. 
   
   .. figure:: baremetal/associate_manage.png
      :alt: The Manage Floating IP Associations dialog

      The Manage Floating IP Associations dialog

#. If you have previously allocated an IP address to your project that is not currently used, you may select it in the *IP Address* dropdown. Otherwise, click the *+* button to open the *Allocate Floating IP* dialog. In this dialog, you may simply click the *Allocate IP* button.

   .. figure:: baremetal/associate_pool.png
      :alt: the Allocate Floating IP dialog

      The Allocate Floating IP dialog

#. Your newly allocated Floating IP address will be automatically selected. You may click the *Associate* button.

   .. figure:: baremetal/associate_ip.png
      :alt: The Manage Floating IP Associations dialog with an IP selected

      The Manage Floating IP Associations dialog with an IP selected

#. You will be returned to the *Instances* page. Your instance should now display its allocated Floating IP address.

   .. figure:: baremetal/instanceswithip.png
      :alt: An instance with an allocated Floating IP

      An instance with an allocated Floating IP

________________________________
Launching Instances with the CLI
________________________________

You may use the CLI to launch a bare metal instance. Make sure that you have configured your SSH :ref:`gui-key-pairs` and are familiar with steps for using :ref:`cli`, including :ref:`cli-installing` and configuring your terminal session using :ref:`cli-rc-script`. You must also create :ref:`reservations` for the hardware you wish to use. You will need your reservation's ID. You can retrieve this with the Blazar client. For more information, see :ref:`reservation-cli`

Creating an Instance with the Nova Client
_________________________________________

To launch an instance inside a reservation, run:

.. code-block:: bash

   openstack server create --image CC-CentOS7 --flavor baremetal --key-name <key_name> --nic net-id=<sharednet1_id> --hint reservation=<reservation_id> my-instance

The ID of the ``sharednet1`` network can be obtained using the command:

.. code-block:: bash

   openstack network list command.
   
Alternatively, you may look it up in the GUI in the *Network* > *Networks* page. You can obtain your reservation ID via the web interface or by running:

.. code-block:: bash

   blazar lease-show <lease_name>
   
.. note:: The reservation ID and the lease ID are different

Running a Shell Script on Boot
______________________________

You might want to automatically execute some code after launching an instance, whether it is installing packages, changing configuration files, or running an application. OpenStack provides a mechanism called *User Data* to pass information to instances. This information can be any data in any format, but if it is a shell script it will be automatically executed after boot by cloudinit. You can provide this shell script either via the web interface in the *Configuration* tab when launching an instance, or by providing a file to the nova command line using the ``--user-data`` option.

Customizing the Kernel
______________________

Before the February 2016 upgrade, support for kernel customizing on bare- etal was limited due to the fact that instances were always booting their kernel directly using PXE and a common kernel command line. This required uploading kernel and ramdisk files to the Glance image repository as well as updating or creating a new OS image using these artifacts.

However, it is now easy to customize the operating system kernel or modify the kernel command line. You now have the option of modifying the boot loader configuration (/boot/grub2/grub.cfg on CentOS 7 images) to point it to a new kernel on the local disk, or specifying kernel parameters and then rebooting using this modified configuration.

To do this, you must be using a whole disk image rather than a partition image. Whole disk images contain their own kernel and ramdisk files and do not have ``kernel_id`` and ``ramdisk_id`` properties in the image repository, unlike partition images.

Running Virtual Machines on Bare Metal Hardware 
_______________________________________________

For cloud computing and virtualization experiments, you might want to run virtual machines on bare hardware that you fully control rather than use the shared OpenStack KVM cloud. There are many different ways to configure networking for virtual machines. The configuration described below will enable you to connect your virtual machines to the Internet using a `KVM Public Bridge <http://www.linux-kvm.org/page/Networking#public_bridge>`_ which you must first configure manually on your host on the default network interface.

You can use the CLI to request ports for your bridge. For each virtual machine you want to run, request a Neutron port with:

.. code-block:: bash

   openstack port-create sharednet1
   
This should display, among other information:

- A fixed IP in the same private network as the physical nodes
- A MAC address
  
Finally, start your virtual machine while assigning it the MAC address provided by OpenStack. If your image is configured to use DHCP, the virtual machine should receive the allocated IP.

Neutron ports allocated this way are not automatically deleted, so please delete them after your experiment is over using:

.. code-block:: bash

   openstack port delete <id>
   
You may find the ID of your ports using:

.. code-block:: bash

   openstack port list
   
Launching Instances on Specific Nodes
_____________________________________

If you have a reservation for multiple physical nodes, explicitly identified with their UUIDs, you might want to force an instance to be launched on a specific node rather than letting the scheduler select one. This can be done with the CLI using a scheduler hint:

.. code-block:: bash

   openstack server create --image CC-CentOS7 --flavor baremetal --key-name <key_name> --nic net-id=<sharednet1_id> --hint reservation=<reservation_id> --hint query='["=","$hypervisor_hostname","<node_uuid>"]' <instance_name>

From within an instance you have already launched, you can discover which node it is running on by executing 

.. code-block:: bash

   curl http://169.254.169.254/openstack/latest/vendor_data.json
   
This will return a JSON dictionary describing site, cluster, and node.

Customizing Networking
______________________

In its default configuration, the bare metal deployment system used by Chameleon (OpenStack Ironic) is restricted to using a single shared network per site. The network configuration features available in the dashboard are not supported (Networks and Routers). On `CHI@UC <https://chi.uc.chameleoncloud.org>`_, network layer 2 isolation is optionally available for compute nodes. You may find more details on the documentation for :ref:`networking`.

__________________________
Interacting with Instances
__________________________

Once your bare metal instance has launched, you may interact with it by using SSH if you have associated a Floating IP with it or by using the Serial Console from the GUI.

Connecting via SSH
__________________

If you have associated a Floating IP with the instance and you have the private key file for the Key Pair that was used to launch your instance, you may use it to SSH to the instance by following these steps:

#. Make sure the permissions on the private key file are set to 600 on your local computer using:

   .. code-block:: bash

      chmod 600 mykey.pem

#. Make sure you do not have a previous entry for the instance's Floating IP in your ``~/.ssh/known_hosts`` file on your computer. You may use a text editor such as ``nano`` to delete any matching entries.

#. To SSH into the instance, use the command:

   .. code-block:: bash

      ssh cc@<floating_ip>

#. You may receive the response below. Type ``yes`` and hit enter:

   .. code::

      The authenticity of host '130.202.88.241 (130.202.88.241)' can't be established.
      RSA key fingerprint is 5b:ca:f0:63:6f:22:c6:96:9f:c0:4a:d8:5e:dd:fd:eb.
      Are you sure you want to continue connecting (yes/no)?

#. When logged in, your prompt may appear like this:

   .. code::

      [cc@my-first-instance ~]$

.. note:: If you notice SSH errors such as connection refused, password requests, or failures to accept your key, it is likely that the physical node is still going through the boot process. In that case, please wait before retrying. Also make sure that you use the cc account. If after 10 minutes you still cannot connect to the machine, please open a ticket with our help desk.

#. You can now check whether the resource matches its known description in the resource registry. For this, simply run: 
   
   .. code-block:: bash
   
      sudo cc-checks -v

The ``cc-checks`` program prints the result of each check in green if it is successful and red if it failed. You can now run your experiment directly on the machine via SSH. You can run commands with root privileges by prefixing them with ``sudo``. To completely switch user and become root, use the ``sudo su - root`` command.

Connecting via the Serial Console
___________________________________

Chameleon now allows you to connect to the serial console of your bare metal nodes via the GUI. Once your instance is deployed, click on the *Console* button in the instance contextual menu.

.. figure:: baremetal/serialconsole.png
   :alt: The Serial Console button

   The Serial Console button

This should open a screen showing an interactive serial console (it could take some time to show up, give it 30 seconds or so).

.. figure:: baremetal/instanceconsole.png
   :alt: An open Console

   An open Console

Our latest images are configured to auto-login into the ``cc`` account. Other images may show you a login prompt. You can set a password on the ``cc`` account by accessing it via SSH, using the command ``sudo passwd cc``, and then using this password to connect to the console.
