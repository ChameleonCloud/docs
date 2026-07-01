.. _baremetal:

====================
Bare Metal Instances
====================

Bare metal instances on Chameleon provide you with exclusive access to physical
hardware resources. This allows you to run experiments with full control over
the compute environment, from the hypervisor level down to the bare metal. Bare
metal instances are ideal for systems research, performance evaluation, and
experiments that require specific hardware features or configurations.

Before launching an instance, make sure you own a lease. About how to create a
lease, see :ref:`reservations`. Once your lease is started, you are
almost ready to start an instance. But first, you need to make sure that you
will be able to connect to it by setting up :ref:`gui-key-pairs`.

.. important::
   If your experiment doesn't need exclusive access to physical hardware,
   Chameleon also offers a multi-tenant, virtualized cloud via :ref:`kvm` and
   container-based edge computing via |CHI@Edge| (`docs
   <https://chameleoncloud.gitbook.io/chi-edge/getting-started>`_). For help
   deciding which fits your experiment, see the Tips and Tricks post `Bare
   Metal or KVM? Which Should You Choose and When
   <https://blog.chameleoncloud.org/posts/bare-metal-or-kvm-which-should-you-choose-and-when/>`_.

.. note::
   Instances can also be launched and managed programmatically via the
   `chi.server module
   <https://python-chi.readthedocs.io/en/latest/modules/server.html>`_ in
   `python-chi <https://python-chi.readthedocs.io/en/latest/>`_ — see our
   :doc:`Jupyter and python-chi guide
   <../../getting-started/jupyter-python-chi>` for an introduction.

.. toctree::
   :maxdepth: 1
   :caption: Bare Metal Topics

   launching_gui
   launching_cli
   interacting
   composable_hardware