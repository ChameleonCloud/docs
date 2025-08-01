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

.. _kvm-hardware:

Hardware
--------

Instances on KVM@TACC are virtualized, but the underlying hardware may be of interest.
For general compute flavors (flavors that start with "m1"), the underlying hardware is:

+-------------------+----------------------------------------------------+
| Component         | Details                                            |
+===================+====================================================+
| Processor         | Intel Xeon E5-2670 v3 @ 2.30GHz                    |
+-------------------+----------------------------------------------------+
| Chassis           | Dell PowerEdge R630                                |
+-------------------+----------------------------------------------------+
| Network Adapters  | 2 x 1 Gbps                                         |
+-------------------+----------------------------------------------------+

For GPU flavors, (those starting with "g1.h100"), instances will be scheduled on the following hardware:

+-------------------+----------------------------------------------------+
| Component         | Details                                            |
+===================+====================================================+
| Processor         | Intel Xeon Platinum 8468 @ 2.1GHz,                 |
|                   | 48C/96T, 16GT/s, 105M Cache                        |
+-------------------+----------------------------------------------------+
| Memory            | 1 TB DDR5-4800 RAM                                 |
+-------------------+----------------------------------------------------+
| Chassis           | Dell PowerEdge XE964                               |
+-------------------+----------------------------------------------------+
| GPU               | 4 x NVIDIA HGX H100 4-GPU SXM 94GB HBM2e 700W GPU  |
+-------------------+----------------------------------------------------+
| Network Adapters  | 1 x 25 Gbps,                                       |
+-------------------+----------------------------------------------------+


.. toctree::
   :maxdepth: 2
   :caption: KVM Topics

   kvm_gui
   kvm_cli
   kvm_lbaas
   kvm_volumes
   kvm_instance_migration
