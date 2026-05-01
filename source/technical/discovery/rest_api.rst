Using the REST APIs for Resource Discovery
===================================================

The Resource Discovery API gives programmatic access to the same hardware
inventory that powers the `Hardware Discovery
<https://chameleoncloud.org/hardware/>`_ page. It is aimed at three main use
cases:

- **Scripted node selection** — find nodes matching specific hardware criteria
  (CPU model, GPU, storage type, etc.) before constructing a reservation.
- **Reproducibility tracking** — detect hardware changes between experiment
  runs using the versioned change history.
- **Tool building** — integrate Chameleon hardware data into your own
  dashboards or automation frameworks.

For most users, the Hardware Discovery page or the :ref:`python-chi <jupyter>`
library is the easier path. This API is for power users and integrators who
need direct, scriptable access.

The API uses a REST architecture over HTTP, so any HTTP client works: cURL,
a browser, or any language's HTTP library. It also implements "Hypermedia as
the Engine of Application State" (HATEOAS) — every response includes ``links``
that point to related resources, so you can traverse the full hierarchy by
following links rather than constructing URLs manually.

Prerequisites
___________________________

Chameleon uses `cURL <https://curl.haxx.se/>`_ to interact with the API.  The User-Agent `cURL <https://curl.haxx.se/>`_ is a command line tool for transferring data with URL syntax, supporting many protocols including HTTP and HTTPS.

To install `cURL <https://curl.haxx.se/>`_, follow the instructions below:

**OS X**

cURL is installed by default on OS X. Nothing to do for you!

**Linux**

Use your package manager to install cURL. Either (Debian/Ubuntu-based distributions):

.. code-block:: shell

   $ sudo apt-get install curl

or (RedHat-based distributions):

.. code-block:: shell

   $ sudo yum install curl

**Windows**

Download and install the cURL package from `the website <https://curl.haxx.se/download.html>`_.

Your First Requests
___________________________

The API entry-point for the resource discovery API is located at https://api.chameleoncloud.org/. Open your Terminal program (or the cURL executable if you're on Windows), and use cURL to fetch the resource located at that URL:

.. code-block:: shell

   curl -i https://api.chameleoncloud.org/

.. tip:: The ``-i`` flag tells cURL to display the HTTP header in addition to the HTTP  body.

Below is what you should see in response:

.. code-block:: javascript

   HTTP/2 200
   date: Fri, 01 May 2026 02:17:01 GMT
   content-type: application/json
   content-length: 250
   strict-transport-security: max-age=15724800; includeSubDomains

   {"type":"grid","uid":"chameleoncloud","version":"aaa09ab330838062ed66ee8a3841e90fe9495039","timestamp":"1776354589","links":[{"rel":"sites","href":"/sites"},{"rel":"self","href":"/"},{"rel":"parent","href":"/"},{"rel":"versions","href":"/versions"}]}

.. note:: The HTTP status of ``200 OK`` indicates that the server is able to process your request and that everything is fine.

.. tip::
   Pipe any response through ``jq`` to pretty-print it and make it easier to
   read:

   .. code-block:: shell

      curl https://api.chameleoncloud.org/ | jq

You may notice that the response contains a number of link elements, which advertise other resources that you can access. For example, let's fetch the ``/sites`` resource.

.. code-block:: shell

   curl https://api.chameleoncloud.org/sites | jq

The response should look like:

.. note:: The actual response includes all 6 Chameleon sites. Two are shown here for brevity.

.. code-block:: json

   {
     "total": 6,
     "offset": 0,
     "items": [
       {
         "uid": "tacc",
         "name": "CHI@TACC",
         "description": "Texas Advanced Computing Center",
         "email_contact": "help@chameleoncloud.org",
         "latitude": 30.390223,
         "longitude": -97.72563,
         "location": "Austin, Texas, USA",
         "security_contact": "help@chameleoncloud.org",
         "site_class": "baremetal",
         "sys_admin_contact": "help@chameleoncloud.org",
         "user_support_contact": "help@chameleoncloud.org",
         "web": "https://chi.tacc.chameleoncloud.org",
         "version": "aaa09ab330838062ed66ee8a3841e90fe9495039",
         "links": [
           {
             "rel": "self",
             "href": "/sites/tacc"
           },
           {
             "rel": "parent",
             "href": "/"
           },
           {
             "rel": "clusters",
             "href": "/sites/tacc/clusters"
           },
           {
             "rel": "versions",
             "href": "/sites/tacc/versions"
           },
           {
             "rel": "version",
             "href": "/sites/tacc/versions/aaa09ab330838062ed66ee8a3841e90fe9495039"
           }
         ],
         "type": "site"
       },
       {
         "uid": "uc",
         "name": "CHI@UC",
         "description": "University of Chicago",
         "email_contact": "help@chameleoncloud.org",
         "latitude": 41.718002,
         "longitude": -87.982952,
         "location": "Argonne National Laboratory, Lemont, Illinois, USA",
         "security_contact": "help@chameleoncloud.org",
         "site_class": "baremetal",
         "sys_admin_contact": "help@chameleoncloud.org",
         "user_support_contact": "help@chameleoncloud.org",
         "web": "https://chi.uc.chameleoncloud.org",
         "version": "aaa09ab330838062ed66ee8a3841e90fe9495039",
         "links": [
           {
             "rel": "self",
             "href": "/sites/uc"
           },
           {
             "rel": "parent",
             "href": "/"
           },
           {
             "rel": "clusters",
             "href": "/sites/uc/clusters"
           },
           {
             "rel": "versions",
             "href": "/sites/uc/versions"
           },
           {
             "rel": "version",
             "href": "/sites/uc/versions/aaa09ab330838062ed66ee8a3841e90fe9495039"
           }
         ],
         "type": "site"
       }
     ],
     "version": "aaa09ab330838062ed66ee8a3841e90fe9495039",
     "links": [
       {
         "rel": "self",
         "href": "/sites"
       },
       {
         "rel": "parent",
         "href": "/"
       }
     ]
   }

.. note:: Previous versions of the API included a ``"type"`` field (e.g. ``"type": "application/vnd.grid5000.collection+json"``) on every link object in responses. This field has since been removed and no longer appears in API responses.

Discover Resources
___________________________

It is easy to discover resources using REST APIs when you chase down the ``links`` in the responses.

As seen in the previous section, when you fetch the API root resource, you can
find the link to the collection of sites. If you look at the site description,
you will find a list of links to other resources. For example, each site has a
link named ``clusters``. When you fetch this link, it returns the list of
clusters on that site.

.. note::
   In this API, a "cluster" is a logical grouping of nodes at a site inherited
   from the Grid'5000 data model — it is not an HPC-style compute cluster.
   Every baremetal site (CHI@TACC, CHI@UC, CHI@NCAR, CHI@NU, CHI@NRP) has
   exactly one cluster, always named ``chameleon``. CHI@Edge has no clusters
   and its devices are not accessible through this API path.

   In practice this means the ``clusters`` level is a fixed pass-through: the
   path to nodes at any baremetal site is always
   ``/sites/{site}/clusters/chameleon/nodes``.

For example, to get clusters at *CHI@TACC*:

.. code-block:: shell

   curl https://api.chameleoncloud.org/sites/tacc/clusters | jq

There is a link named ``nodes`` in each cluster description, which returns
the list of nodes for that cluster.

.. tip::
   Since every baremetal site uses the same cluster name, you can go directly
   to the nodes endpoint without traversing the clusters step:

   .. code-block:: shell

      curl https://api.chameleoncloud.org/sites/tacc/clusters/chameleon/nodes | jq

You should get back a large collection of nodes. Each node is described in
detail, so you can programmatically find the nodes most suitable for your
experiments.

The following command examples allow you to see that some of the nodes on the *chameleon* cluster at *TACC* have a different disk configuration:

.. code-block:: shell

   curl https://api.chameleoncloud.org/sites/tacc/clusters/chameleon/nodes/f503a229-9d71-4819-bf56-5d8490b29e7c | jq | grep -A 10 storage_devices
   curl https://api.chameleoncloud.org/sites/tacc/clusters/chameleon/nodes/d4a46dc6-7cac-417f-800c-faea63a46130 | jq | grep -A 10 storage_devices


Fetch the Latest Changes
___________________________

Chameleon hardware is added, updated, or removed over time — including
component replacements that may affect your results even when a node's overall
specifications appear unchanged. The versioned change history lets you detect
these events, which is useful for experimental reproducibility.

To fetch the change history for a site:

.. code-block:: shell

   curl https://api.chameleoncloud.org/sites/tacc/versions | jq

Each version in the response represents a change to some resource at that site.
You can compare versions across experiment runs to verify that the hardware
environment was consistent.