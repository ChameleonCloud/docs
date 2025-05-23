.. _resource-discovery:

==================
Resource Discovery
==================

Resource discovery on Chameleon allows you to explore and identify the specific hardware resources available for your experiments. You can discover nodes by their hardware characteristics, view detailed specifications, check maintenance history, and reserve specific resources that meet your experimental requirements.

Chameleon supports fine-grained resource discovery for experimentation, which means that you can identify a specific node, view the node's hardware maintenance history and reserve it for repeated use.

All physical resources available in Chameleon are described in the Chameleon resource registry. The resource registry is based on the `Reference API from the Grid'5000 project <https://www.grid5000.fr/mediawiki/index.php/API>`_. Users can consult the registry via the resource discovery GUI or directly via REST APIs.

.. note:: Some resource discovery features are available through the `Chameleon Portal <https://chameleoncloud.org>`_, while others are available **only** through the REST APIs.

.. toctree::
   :maxdepth: 1
   :caption: Resource Discovery Topics

   hardware_catalog
   rest_api