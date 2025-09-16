.. _kvm:

===
KVM
===

OpenStack is an Infrastructure as a Service (IaaS) platform that allows you to
create and manage virtual environments. Chameleon provides an installation of
OpenStack `Xena <https://releases.openstack.org/xena/index.html>`_ using the
KVM virtualization technology at the `KVM\@TACC
<https://kvm.tacc.chameleoncloud.org>`_ site. Since the KVM hypervisor is used
on this cloud, any virtual machines you upload must be compatible with KVM.

This documentation provide basic information about how to use the OpenStack web
interface and provides some information specific to using OpenStack KVM on
Chameleon. The interface is similar to the bare metal sites |CHI@TACC| and
|CHI@UC|. However, the resources that you are using are virtual, rather than
being tied to physical nodes. Familiarity with some concepts, such as
:ref:`gui-key-pairs` are also required for KVM.

.. note::
   **GPU Access on KVM**

   We have GPUs available NOW on `KVM\@TACC`. See below for details on GPU hardware available through KVM!

.. toctree::
   :maxdepth: 2
   :caption: KVM Topics

   kvm_hardware
   kvm_gui
   kvm_cli
   kvm_lbaas
   kvm_volumes
   kvm_instance_migration
