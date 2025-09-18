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
