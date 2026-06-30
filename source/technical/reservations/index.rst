.. _reservations:

=============
Reservations
=============

Unlike virtual resources on a regular on-demand cloud, physical resources on
Chameleon must be reserved before using them for an experiment. Once a
reservation has been accepted, users are guaranteed that resources will be
available at the time they chose (except in extraordinary circumstances such as
hardware or platform failures), which helps to plan large scale experiments.

Chameleon resources are reserved via `Blazar
<https://docs.openstack.org/blazar/latest/>`_ which provides Reservation as a
Service for OpenStack.

Three types of resources can be reserved: physical bare metal hosts, network
segments (VLANs), and floating IPs.

.. note::
   This section covers Blazar leases for bare metal resources. |CHI@Edge| uses a
   different, container-lease model rather than Blazar reservations — see the
   `CHI@Edge docs
   <https://chameleoncloud.gitbook.io/chi-edge/getting-started>`_.

.. note::
   Leases can also be created and managed programmatically via the `chi.lease
   module <https://python-chi.readthedocs.io/en/latest/modules/lease.html>`_ in
   `python-chi <https://python-chi.readthedocs.io/en/latest/>`_ — see our
   :doc:`Jupyter and python-chi guide
   <../../getting-started/jupyter-python-chi>` for an introduction.

.. attention::

   **A note on lease stacking**

   To prevent resource hoarding and ensure fair access to specialized hardware,
   Chameleon discourages "lease stacking" or making multiple overlapping
   reservations. Review our `lease stacking policy <https://www.chameleoncloud.org/learn/frequently-asked-questions/#toc-what-are-the-policies-on-chameleon-resource-usage->`_
   to align your reservations with community practices for efficient resource use.

.. toctree::
   :maxdepth: 1
   :caption: Reservation Topics

   gui_reservations
   cli_reservations