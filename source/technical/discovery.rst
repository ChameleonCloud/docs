===================
Resource Discovery
===================

Introduction
============

Chameleon supports fine grained resource discovery for experimentation. This means that you can identify a specific node, see the node's hardware maintenance history and reserve it for repeated use. Some resource discovery features are available through the GUI or web portal, while others such as node version history are available only through command line access.

The Hardware Catalog on the Chameleon Portal
============================================

You may use the `Hardware <https://chameleoncloud.org/hardware/>`_ page at the `Chameleon Portal <https://chameleoncloud.org>`_ to see the different hardware resource types available at each Chameleon site.

Availability
____________

The *CHI@TACC* and *CHI@UC* buttons in the *Availability* section of the Resource Browser allow you to open the GUI Lease Calendar at each of the respective Chameleon sites. You will be required to login to your Chameleon account to view these lease calendars.

.. figure:: discovery/availability.png
   :alt: Resource availability links to the lease calendars

   Resource availability links to the lease calendars

Chameleon Resource Browser
__________________________

The Chameleon Resource Browser allows you to filter Chameleon resources by node type and view details of each node. 

.. figure:: discovery/resourcebrowser.png
   :alt: Chameleon Resource Browser

   The Chameleon Resource Browser

You may filter for specific node types by selecting the checkboxes that match your filter criteria. Alternatively, you may click the buttons such as *Compute* and *Infiniband Support* to automatically select common filter options. The number next to each of the node type names in each of the buttons or next to each of the checkboxes indicate the total number of nodes matching those filter types. After you have selected filter criteria, you can click the *View* button to see details of individual nodes that match your criteria.

.. figure:: discovery/nodedetails.png
   :alt: Node details

   Node details

The Resource Browser will generate a list of node matching nodes with fine grained details. The heading for each node is that specific node's *UUID*. This UUID can be used to make a specific reservation for that node later, or to identify metrics collected from the node using Gnocchi. In addition, the node details also show a *Version* UUID. This Version UUID is useful for retrieving a maintenance history for the node. When maintenance is performed, failed components may be replaced such as a bad hard drive. The Version UUID allows you to see such maintenance events. 

.. note:: When maintenance is performed on a node, the node hardware types typically do not change. Therefore, you can expect a node with a 250GB hard drive to still have the same type of hard drive maintenance. However, it may be important for your experimental reproducibility to know if replaced hardware affects your metrics.

If you would like to see more precise characteristics for each component of a node, you may visit the vendor's website. For example, if you would like specific details about an Intel processor model, you may visit `Intel's CPU Database <https://ark.intel.com>`_.

Generating a Reservation Script
_______________________________

You may generate a CLI script for reserving the nodes that you have filtered by clicking on the *Reserve* button.

.. figure:: discovery/reserve.png
   :alt: Generating a reservation script

   Generating a reservation script

You must fill out the reservation start and end dates and times for a time in the future and specify the number of nodes you wish to reserve. Once you have completed the form, click *Generate*. This will show a new dialog with a CLI command for reserving those nodes.

.. figure:: discovery/reservationscript.png
   :alt: An auto-generated reservation script

   An auto-generated reservation script

You may use this script with the CLI if you have the Python `python-blazarclient` package installed and you have run :ref:`cli-rc-script` in your terminal session. For further documentation on how to use the CLI to reserve nodes, see :ref:`reservation-cli`.

Using the REST API to Retrieve Chameleon Versioning
===================================================

The Chameleon REST API allows you to retrieve Chameleon versioning information programmatically. This is useful for automating certain tasks like Resource Discovery or experimental cataloguing. The Chameleon REST API is based on the `Grid 5000 API <https://www.grid5000.fr/mediawiki/index.php/API>`_ and is available at ``https://api.chameleoncloud.org``. Requests to the API return results in JSON format. Each endpoint can also accept the ``/?pretty`` request parameter to return a formatted JSON dictionary.

.. note:: Not all features from the Grid 5000 API have been implemented on Chameleon Cloud.

Chameleon Platform Versions
___________________________

If you wish to see system-wide version changes to the Chameleon platform, you may access the ``/sites/[sitename]/versions/`` endpoint. From a Unix terminal, you may use

.. code-block:: bash

   curl https://api.chameleoncloud.org/sites/tacc/versions/?pretty
   
to retrieve a JSON response describing site maintenance history for Chameleon resources at the Texas Advanced Computing Center. Your response may look like this:

.. code-block:: json

   {
     "total": 45,
     "offset": 0,
     "items": [
       {
         "uid": "86f6934b0783bd209daace2bf4805b8d1614f689",
         "date": "Tue, 21 Feb 2017 18:47:38 GMT",
         "message": "Add missing device name",
         "author": "Pierre Riteau",
         "type": "version",
         "links": [
           {
             "rel": "self",
             "href": "/sites/tacc/versions/86f6934b0783bd209daace2bf4805b8d1614f689",
             "type": "application/vnd.grid5000.item+json"
           },
           {
             "rel": "parent",
             "href": "/sites/tacc",
             "type": "application/vnd.grid5000.item+json"
           }
         ]
       },

In this response, ``total`` refers to the number of platform revisions made to this site. ``items`` contains a detailed description of each revision and its associated version UUID.

Node Information
________________

You may retrieve information about a specific bare metal node by its UUID using the ``/sites/[sitename]/clusters/chameleon/nodes/[uuid]`` endpoint. From a Unix terminal, you may use

.. code-block:: bash

   curl https://api.chameleoncloud.org/sites/tacc/clusters/chameleon/nodes/ffdb2e25-bd9d-4c82-b08b-c3c425ed46d5/?pretty

to retrieve a JSON response about the node with UUID ``ffdb2e25-bd9d-4c82-b08b-c3c425ed46d5`` at the Texas Advanced Computing Center. This will retrieve a response that may look like this:

.. code-block:: json

   {
     "architecture": {
       "platform_type": "x86_64",
       "smp_size": 2,
       "smt_size": 48
     },
     "bios": {
       "release_date": "03/09/2015",
       "vendor": "Dell Inc.",
       "version": 1.2
     },
     "chassis": {
       "manufacturer": "Dell Inc.",
       "name": "PowerEdge R630",
       "serial": "1PLKD42"
     },
     "gpu": {
       "gpu": false
     },
     "main_memory": {
       "humanized_ram_size": "128 GiB",
       "ram_size": 134956859392
     },

In addition, you may retrieve version information from each node with the endpoint ``/sites/[sitename]/clusters/chameleon/nodes/[node_uuid]/versions/``.
