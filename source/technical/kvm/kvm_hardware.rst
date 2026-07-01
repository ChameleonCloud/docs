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
| Chassis           | Dell PowerEdge XE9640                              |
+-------------------+----------------------------------------------------+
| GPU               | 4 x NVIDIA HGX H100 4-GPU SXM 94GB HBM2e 700W GPU  |
+-------------------+----------------------------------------------------+
| Network Adapters  | 1 x 25 Gbps,                                       |
+-------------------+----------------------------------------------------+

Two of the H100 nodes on KVM@TACC support NVIDIA **Multi-Instance GPU (MIG)**
partitioning, which splits a single H100 into up to 7 smaller, isolated
GPU instances instead of allocating full-GPU passthrough. This raises the
effective per-node capacity from 4 to up to 28 instances, making it easier
to get GPU access for smaller jobs that do not need a full H100.

.. attention::
   Standard KVM@TACC instance leases can run for up to 6 months, but leases
   for GPU-attached flavors (``g1.h100.*``) are capped at **7 days (1
   week)** — the same duration limit that applies to bare metal host leases.
   This timeboxing keeps GPU capacity available to more users over time. See
   the `Chameleon FAQ
   <https://www.chameleoncloud.org/learn/frequently-asked-questions/#toc-what-are-the-policies-on-chameleon-resource-usage->`_
   for the authoritative policy.
