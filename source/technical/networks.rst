.. _networking:

==========
Networking
==========


Networking on Chameleon is implemented using `OpenStack Neutron <https://docs.openstack.org/neutron/latest/>`_.
Most experiments will require :ref:`basic-networking` functionality including Internet access and connectivity between nodes.
Chameleon provides basic networking capabilities via a pre-configured shared network called ``sharednet1``.
Many experiments require additional connectivity and control of the network.  These experiments can utilize Chameleon's advanced
networking capabilities including :ref:`network-isolation` and :ref:`stitching`.


.. toctree::
   :maxdepth: 1
   :caption: Networking Topics

   networks/networks_basic
   networks/networks_vlan
   networks/networks_stitching
   networks/networks_fabnet
   networks/networks_jumbo_frames
