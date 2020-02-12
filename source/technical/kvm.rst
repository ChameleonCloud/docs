.. _kvm:

KVM
===

Introduction
------------

OpenStack is an Infrastructure as a Service (IaaS) platform that allows you to create and manage virtual environments. Chameleon provides an installation of OpenStack `Rocky <https://releases.openstack.org/rocky/index.html>`_ using the KVM virtualization technology at the `KVM@TACC <https://kvm.tacc.chameleoncloud.org>`_ site. Since the KVM hypervisor is used on this cloud, any virtual machines you upload must be compatible with KVM.

This documentation provide basic information about how to use the OpenStack web interface and provides some information specific to using OpenStack KVM on Chameleon. The interface is similar to the bare metal sites `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ and `CHI@UC <https://chi.uc.chameleoncloud.org>`_. However, the resources that you are using are virtual, rather than being tied to physical nodes. Familiarity with some concepts, such as :ref:`gui-key-pairs` are also required for KVM.

.. warning:: The old `KVM-2015@TACC <https://openstack.tacc.chameleoncloud.org>`_ is now deprecated. Existing projects should work to migrate workloads over to the new `KVM@TACC <https://kvm.tacc.chameleoncloud.org>`_ site. See :ref:`kvm-migrate` below.

Work with KVM using the GUI
---------------------------

An easy way to use OpenStack KVM on Chameleon is via the GUI, which is similar to the GUIs for `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ and `CHI@UC <https://chi.uc.chameleoncloud.org>`_. You log into the web interface using your Chameleon username and password. 

After a successful log in, you will see the *Overview* page as shown below. This page provides a summary of your current and recent usage and provides links to various other pages. Most of the tasks you will perform are done via the menu on the lower left and will be described below. One thing to note is that on the left, your current project is displayed. If you have multiple Chameleon projects, you can change which of them is your current project. All of the information displayed and actions that you take apply to your current project. So in the screen shot below, the quota and usage apply to the current project you have selected and no information about your other projects is shown.

.. figure:: kvm/new_overview.png

Managing Virtual Machine Instances
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One of the main activities you’ll be performing in the GUI is management of virtual machines, or instances. Go to *Project* > *Compute* > *Instances* in the navigation sidebar. For instances that you have running, you can click on the name of the instance to get more information about it and to access the VNC interface to the console. The dropdown menu to the left of the instance lets you perform a variety of tasks such as suspending, terminating, or rebooting the instance.

.. figure:: kvm/new_instances.png

Launching Instances
~~~~~~~~~~~~~~~~~~~

To launch an *Instance*, click the *Launch Instance* button. This will open the *Launch Instance* dialog.

.. figure:: kvm/new_launchdetails.png

On the *Details* tab, provide a name for this instance (to help you identify instances that you are running).

Next, go to the *Source* tab to select media to launch.

.. figure:: kvm/new_launchsource.png

Select the *Boot Source* of the instance, which is either an *Image*, an *Instance Snapshot* (an image created from a running virtual machine), a *Volume* (a persistent virtual disk that can be attached to a virtual machine), or a "Volume Snapshot". If you select "Image" as the *Boot Source*, the *Image Name* dropdown presents a list of virtual machine images that we have provided, that other Chameleon users have uploaded and made public, or images that you have uploaded for yourself. If you select *Boot from snapshot*, the *Instance Snapshot* dropdown presents a list of virtual machine images that you have created from your running virtual machines.

Go to the *Flavor* Tab and select the amount of resources (Flavor) to allocate to the instance.

.. figure:: kvm/new_launchflavor.png

Flavors refer to the virtual machine's assigned memory and and disk size. Different images and snapshots may require a larger Flavor. For example, the ``CC-CentOS7`` image requires at least an ``m1.small`` flavor.
   
   .. tip:: If you select different flavors from the Flavor dropdown, their characteristics are displayed on the right.

When you are finished with this step, go to the *Key Pair* Tab.

.. figure:: kvm/new_launchaccess.png

Select an SSH keypair that will be inserted into your virtual machine. You will need to select a keypair here to be able to access an instance created from one of the public images Chameleon provides. These images are not configured with a default root password and you will not be able to log in to them without configuring an SSH key.

Then, go to the *Security Groups* Tab.

.. figure:: kvm/new_secgroups.png

If you have previously defined *Security Groups*, you may select them here. Alternatively, you can configure them later.

Set up network using *Network* tab.

.. figure:: kvm/new_launchnetwork.png

#. Select which network should be associated with the instance. Click the Up arrow next to your project’s private network (PROJECT_NAME-net), not ``ext-net``.

Now you can launch your instance by clicking on the *Launch* button and the *Instances* page will show progress as it starts.

.. _kvm-associate-ip:

Associating a Floating IP Address
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You may assign a Floating IP Address to your Instance by selecting *Associate Floating IP* in the dropdown menu next to your Instance on the *Instances* page.

.. figure:: kvm/new_associatemenu.png

This process is similar to :ref:`baremetal-gui-associate-ip` on `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ and `CHI@UC <https://chi.uc.chameleoncloud.org>`_ bare metal sites.

Key Pairs
~~~~~~~~~

You will need to import or create SSH :ref:`gui-key-pairs`. This process is similar to the process performed on `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ and `CHI@UC <https://chi.uc.chameleoncloud.org>`_ bare metal sites.

Security Groups
~~~~~~~~~~~~~~~

*Security Groups* allow you to specify what inbound and outbound traffic is allowed or blocked to Instances. Unlike the `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ and `CHI@UC <https://chi.uc.chameleoncloud.org>`_ bare metal sites, `KVM@TACC <https://kvm.tacc.chameleoncloud.org>`_ observes Security Groups for Instances.

.. note:: By default, all inbound traffic is blocked to `KVM@TACC <https://kvm.tacc.chameleoncloud.org>`_ Instances, including SSH. You must apply a Security Group that allows TCP port 22 inbound to access your instance via SSH.

To create a Security Group, click *Projects* > *Network* > *Security Groups* in the navigation side bar. 

.. figure:: kvm/new_securitytab.png

Click the *+Create Security Group* button to open the *Create Security Group* page.

.. figure:: kvm/new_createsecurity.png

Enter a *Name* for your *Security Group*, and optionally provide a *Description*. Then click the *Create Security Group* button. 
Now, you should see your *Security Group* listed on the *Access and Security* page.

.. figure:: kvm/new_grouplist.png

Click the *Manage Rules* button in the *Action* column to open the *Manage Security Group Rules* page.

.. figure:: kvm/new_managerules.png

The default Security Group allows outbound IPv4 and IPv6 traffic for *Any IP Protocol* and *Port Range*. If no entry for *Ingress*, no inbound traffic will be allowed. You may add an additional rule by clicking on the *+Add Rule* to open the *Add Rule* dialog.

.. figure:: kvm/new_addrule.png

In this dialog, you can specify *Custom TCP Rule* (or *Custom UDP Rule* or *Custom ICMP Rule*), a *Direction* (*Ingress* for inbound traffic to your Instance or *Egress* for outbound traffic) and a *Port*. Alternatively, you can use a pre-defined rule in the *Rule* dropdown, such as *SSH*. when you are finished, click *Add*.

.. _kvm-security-group:

Adding a Security Group to an Instance
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Once you have defined a *Security Group*, you may apply it to an Instance by clicking *Project* > *Compute* > *Instances* in the navigation sidebar and clicking the *Edit Security Groups* option in the *Actions* dropdown.

.. figure:: kvm/new_editaction.png

The *Security Groups* tab in the *Edit Instance* dialog will pop up. 

.. figure:: kvm/new_editinstance.png

You may click the *+* button next to the Security Group you wish to apply in the *All Security Groups* list on the left. Once you are finished, click *Save* to finish the process.

.. _kvm-migrate:

Migrating from KVM-2015
-----------------------

The previous iteration of the KVM cloud, KVM-2015, came online at the end of 2015 and runs the 2015.1 "Kilo" release of OpenStack. The KVM-2015 cloud will continue to be operational until 2020, at which point it will be taken offline. As of November 1, 2019, all user key pairs and project images and networks have been migrated automatically to the `new KVM site <https://kvm.tacc.chameleoncloud.org>`_. In most cases, you can migrate to the new KVM cloud simply by using the ``kvm.tacc.chameleoncloud.org`` address instead of the old ``openstack.tacc.chameleoncloud.org`` address in your browser. If you are using OpenStack clients, you can point them to a new authentication URL via your RC file (see the :ref:`command line interface <cli>` documentation for more info). You can continue to use the same login credentials as before.

.. code-block:: shell

  export OS_AUTH_URL=https://kvm.tacc.chameleoncloud.org:5000/v3
  
Migrating data from instances or volumes from KVM-2015 to instances the new KVM is most easily accomplished using in-instance transfer methods such as rsync over ssh, sftp or similar techniques.

Rsync is a good choice because it can continue interrupted transfers and can do so securely over SSH. Some things to remember when using rsync include:

#. Instance flavors in new KVM do not include an option with 160GB disk. In this case, it is best to create and attach a volume to provide persistent, large storage to your instances. DigitalOcean has a `good guide <https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux>`_ for configuring the storage, once attached.
#. Both VMs will need a floating IP assigned.
#. Make sure that the security groups for instances on each of the KVM systems are set appropriately. When using rync over SSH, ingress and egress rules for port 22 will be needed.
#. The VM that will execute the rsync command will need to have the SSH private key matching the public key used for the remote VM.
#. Install rsync
  - CentOS
  ::
  
    sudo yum install rsync
  - Ubuntu
  ::
  
    sudo apt-get install rsync

Here is an example using a VM on the new KVM to copy data from a VM on KVM-2015:
  ::
  
    rsync -v -e ssh cc@X.X.X.X:/home/cc/remote_directory/ /home/cc/local_directory/
