CentOS 7 KVM SR-IOV appliance
=============================

The CentOS 7 KVM SR-IOV appliance is built from the |Link| and
additionally contains the KVM hypervisor and a recompiled kernel to
enable SR-IOV over Infiniband.

Description
-----------

-  Image name: CC-CentOS7-KVM-SRIOV
-  Default user account: cc
-  Remote access: Key-Based SSH
-  Root access: passwordless sudo from the cc account
-  Chameleon admin access: enabled on the ccadmin account
-  Cloud-init enabled on boot: yes
-  Repositories (Yum): EPEL, RDO (OpenStack)
-  Installed packages:

   -  Rebuilt kernel for enabling IOMMU
   -  Mellanox SR-IOV drivers for InfiniBand
   -  KVM hypervisor
   -  Standard development tools such as make, gcc, gfortran, etc.
   -  Config management tools: Puppet, Ansible, Salt
   -  OpenStack command-line clients

Availability
------------

-  |Link|

Documentation
-------------

Please refer to the |Link| for documentation on how to reserve and
provision resources. use the image name CC-CentOS7-KVM-SRIOV.

Set up a floating IP on your node and connect to it with SSH. If you are
using bare metal nodes with InfiniBand, you can first setup the IB
interface ip address (otherwise, skip these steps). To do this, edit the
/etc/sysconfig/network-scripts/ifcfg-ib0 file and check that the last 2
decimals for the IPADDR field are the same as the Ethernet ip address
(if the Ethernet address is 10.20.x.y, then the IPADDR field can have
the value 172.16.x.y).

Next, run the following two commands as root:

``[root@host]# ifdown ib0 [root@host]# ifup ib0``

The instance should now be setup to use.

Launching Virtual Machines on Bare-metal InfiniBand Nodes with SR-IOV on Chameleon
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you are using bare metal nodes with Infiniband on Chameleon, you can
launch VMs with SR-IOV. Before you can launch a VM, you have to create a
network port first. To do this, source your OpenStack credentials file
(see |Link|) and run this command:

``[user@host]$ neutron port-create sharednet1``

Note the MAC address and IP address are in the output of this command.
You should use this MAC address while launching a VM and the IP address
to ssh to the VM. You also need the PCI device ID of the virtual
function that you want to assign to the VM. This can be obtained by
running ``lspci | grep Mellanox`` and looking for the device ID (with
format - XX:XX.X) of one of the virtual functions as shown below:

| ``[cc@host]$ lspci | grep Mellanox 03:00.0 Network controller: Mellanox Technologies MT27500 Family [ConnectX-3] 03:00.1 Network controller: Mellanox Technologies MT27500/MT27520 Family [ConnectX-3/ConnectX-3 Pro Virtual Function]``
| ``...``

The PCI device ID of the Virtual Function is ``03:00:1`` in the above
example. Now, to launch a VM on your instance with SR-IOV, run the
following commands as root:

``[root@host]# tunctl -b -t tap0 [root@host]# ifconfig tap0 up [root@host]# brctl addif br0 tap0 [root@host]# qemu-system-x86_64 \ -enable-kvm \ -daemonize \ -boot c \ -cpu host \ -smp <num_of_vcores> \ -m <memory> \ -hda /path/to/disk/image \ -net nic,macaddr=<mac_address>,model=virtio \ -net tap,ifname=tap0,script=no \ -device pci-assign,host=<virtual_function_device_id>,id=hostdev0 \ -vnc none``

You should now have a VM running on your instance. If you want to run
more VMs on your instance, you will have to create more network ports.
You will also have to create more tap interfaces (like tap1, tap2, etc.)
and make appropriate changes to the VM launch commands mentioned above.

Launching Virtual Machines on bare metal nodes without Infiniband on Chameleon
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you are using bare-metal nodes without Infiniband on Chameleon, you
can launch VMs with bridged networking. Before you can launch a VM, you
have to create a network port first as described above. To launch a VM,
run the following commands as root:

``[root@host]# tunctl -b -t tap0 [root@host]# ifconfig tap0 up [root@host]# brctl addif br0 tap0 [root@host]# qemu-system-x86_64 \ -enable-kvm \ -daemonize \ -boot c \ -cpu host \ -smp <num_of_vcores> \ -m <memory> \ -hda /path/to/disk/image \ -net nic,macaddr=<mac_address>,model=virtio \ -net tap,ifname=tap0,script=no \ -vnc none``

You should now have a VM running on your instance. If you want to run
more VMs on your instance, you will have to create more network ports.
You will also have to create more tap interfaces (like tap1, tap2, etc.)
and make appropriate changes to the VM launch commands mentioned above.

Author and Support Contact
--------------------------

Created and maintained by Ohio State University. For support email:
`appliances@chameleoncloud.org <mailto:appliances@chameleoncloud.org?subject=%5BCC-CentOS7-SRIOV%5D%20Help%20needed%20(please%20customize%20subject)>`__

.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_9223
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_9313
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_9309
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_9311
