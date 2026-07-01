.. _composable-hardware:

Composable Hardware
====================

Composable hardware lets you change which GPUs are attached to which bare
metal nodes *after* you reserve them, instead of being locked into whatever
GPU-to-node pairing shipped in the chassis. Chameleon's composable systems are
built on `GigaIO <https://gigaio.com/>`_'s **FabreX** technology: a
configurable PCIe backplane that acts as a virtual switch, so an accelerator
attached to any node on the fabric appears to that node's OS as if it were
directly, physically connected.

Because FabreX connects accelerators over PCIe rather than through a host's
memory controller, composable nodes also support device-to-device
communication, enabling Nvidia GPUDirect peer-to-peer transfers directly
between GPUs.

.. tip::
   For a walkthrough of the FabreX architecture and why composability is
   useful for GPU-hungry experiments, see the Tips and Tricks post
   `Composable Hardware on Chameleon NOW!
   <https://chameleoncloud.org/blog/2024/08/19/composible-hardware-on-chameleon-now/>`_.

Hardware specifications
------------------------

Composable GigaIO nodes are filterable in the :doc:`Resource Browser
<../discovery/hardware_catalog>` and reservable by the ``compute_gigaio`` node
type.

CHI@UC
~~~~~~~

- 8x Dell PowerEdge R6525 nodes
- 2x AMD EPYC 7763 processors per node (256 threads per node)
- 512 GB RAM per node
- 2x 480 GB SATA SSDs per node
- 8x Nvidia A100 PCIe GPUs (80 GB), one attached to each node by default

CHI@TACC
~~~~~~~~~

- 6x Dell PowerEdge R650 nodes
- Intel Xeon Platinum 8380 processor per node
- 256 GB RAM per node
- 4x Nvidia A100-class PCIe GPUs, distributed across the 6 nodes: 2x A100
  (40 GB) and 2x A30

.. note::
   CHI@TACC also hosts a separate LIQID-based composable system
   (``compute_liqid`` node type: 8x PowerEdge R6525 nodes with 10x A100 PCIe
   GPUs and NVMe storage on the fabric). It uses the same reservation and
   recomposition workflow described below.

Reserving and recomposing nodes
---------------------------------

Each composable node comes with one GPU attached by default, so to compose a
system with multiple GPUs on a single node you must reserve all of the nodes
whose GPUs you want to combine. For example, to end up with 4 GPUs on one
node, reserve 4 ``compute_gigaio`` nodes.

#. Create a lease for the ``compute_gigaio`` node type as you would for any
   other bare metal resource — see :ref:`reservations`. For example, via the
   CLI:

   .. code-block:: bash

      openstack reservation lease create \
        --reservation min=4,max=4,resource_type=physical:host,resource_properties='["=", "$node_type", "compute_gigaio"]' \
        --start-date "2026-07-17 16:00" \
        --end-date "2026-07-18 16:00" \
        my-composable-lease

#. Once your lease is confirmed, open a ticket at the |Help Desk| requesting
   the GPU-to-node configuration you need. Chameleon staff will recompose the
   fabric to match your request when your reservation starts — recomposition
   is not self-service and does not happen automatically.

.. attention::
   Submit your recomposition ticket as soon as your lease is confirmed.
   Recomposition happens when your reservation *starts*, so a ticket filed
   after that point may delay access to the hardware for the beginning of
   your reservation window.
