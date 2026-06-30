.. _resource-discovery:

==================
Resource Discovery
==================

Resource discovery on Chameleon allows you to explore and identify the specific
hardware resources available for your experiments. You can discover nodes by
their hardware characteristics, view detailed specifications, check maintenance
history, and reserve specific resources that meet your experimental
requirements.

All physical resources available in Chameleon are described in the Chameleon
resource registry. The resource registry is based on the `Reference API from
the Grid'5000 project <https://www.grid5000.fr/mediawiki/index.php/API>`_.
Users can consult the registry via the resource discovery GUI or directly via
REST APIs.

.. note::
   Some resource discovery features are available through the `Chameleon Portal
   <https://chameleoncloud.org>`_, while others are available **only** through the
   REST APIs.

.. note::
   This section covers discovery of Chameleon's bare metal resources. |CHI@Edge|
   devices are not part of the resource registry and are discovered and
   managed separately — see the `CHI@Edge docs
   <https://chameleoncloud.gitbook.io/chi-edge/getting-started>`_.

.. toctree::
   :maxdepth: 1
   :caption: Resource Discovery Topics

   hardware_catalog
   rest_api