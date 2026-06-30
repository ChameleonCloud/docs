.. _networking:

==========
Networking
==========


Networking on Chameleon is implemented using `OpenStack Neutron <https://docs.openstack.org/neutron/latest/>`_.
Most experiments will require :ref:`basic-networking` functionality including Internet access and connectivity between nodes.
Chameleon provides basic networking capabilities via a pre-configured shared network called ``sharednet1``.
Many experiments require additional connectivity and control of the network.  These experiments can utilize Chameleon's advanced
networking capabilities including :ref:`network-isolation`, :ref:`multisitelayer3`, and :ref:`stitching`.

.. note::
   Networks can also be created and managed programmatically via the
   `chi.network module
   <https://python-chi.readthedocs.io/en/latest/modules/network.html>`_ in
   `python-chi <https://python-chi.readthedocs.io/en/latest/>`_ — see our
   :doc:`Jupyter and python-chi guide
   <../../getting-started/jupyter-python-chi>` for an introduction.

.. toctree::
   :maxdepth: 1
   :caption: Networking Topics

   networks_basic
   networks_vlan
   networks_stitching
   networks_fabnet
   networks_jumbo_frames
