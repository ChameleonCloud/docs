.. _resource-discovery:

==================
Resource Discovery
==================

Resource discovery on Chameleon allows you to explore and identify the specific
hardware resources available for your experiments. You can discover nodes by
their hardware characteristics, view detailed specifications, and be directed to
where you can reserve specific resources that meet your experimental requirements.

All physical resources available in Chameleon are described in the Chameleon
reference repository. Users can consult the repository via the resource
discovery GUI or directly via REST APIs.

.. note::
   This section covers discovery of Chameleon's bare metal resources. |CHI@Edge|
   devices are not part of the reference repository and are discovered and
   managed separately — see the `CHI@Edge docs
   <https://chameleoncloud.gitbook.io/chi-edge/getting-started>`_.

.. note::
   Resource discovery is also available programmatically via the `chi.hardware
   module <https://python-chi.readthedocs.io/en/latest/modules/hardware.html>`_
   in `python-chi <https://python-chi.readthedocs.io/en/latest/>`_ — see our
   :doc:`Jupyter and python-chi guide
   <../../getting-started/jupyter-python-chi>` for an introduction.

.. toctree::
   :maxdepth: 1
   :caption: Resource Discovery Topics

   hardware_catalog
   virtual_machines
   rest_api