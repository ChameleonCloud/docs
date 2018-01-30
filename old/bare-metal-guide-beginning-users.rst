Bare Metal guide for beginning users
====================================

Discovering Resources with API
------------------------------

Chameleon resources are mainly accessed and operated via the OpenStack
web interface, command line utilities, and APIs. To provide resource
discovery capabilities, we make available an API which was developed as
part of \ `the Grid'5000
project <https://www.grid5000.fr/mediawiki/index.php/Grid5000:Home>`__.
The same information can also be accessed via the \ `resource discovery
web interface <https://www.chameleoncloud.org/user/discovery/>`__.

The API is designed for users who want to
programmatically discover Chameleon resources. It uses a REST
architecture on top of the HTTP protocol. As a consequence, any HTTP
client can be used to query the API: command-line tools (cURL),
browsers, and the numerous HTTP libraries available in your
favorite programming language.

It also implements the concept of "Hypermedia as the Engine of
Application State" (HATEOAS), by specifying a set of hyperlinks in all
responses returned by the API, which allow a user agent to discover at
runtime the set of available resources as well as their semantics and
content types, and transition from one resource to another.

First steps
-----------

In this guide you will learn how to interact with the API using one of
the simplest
User-Agent available: \ `cURL <https://curl.haxx.se/>`__. cURL is a
command line tool for transferring data with URL syntax, supporting many
protocols including HTTP and HTTPS.

Installing cURL
~~~~~~~~~~~~~~~

OS X
^^^^

cURL is installed by default on OS X. Nothing to do for you!

Linux
^^^^^

Use your package manager to install cURL. Either (Debian/Ubuntu-based
distributions):

``$ sudo apt-get install curl``

or (RedHat-based distributions):

``$ sudo yum install curl``

Windows
^^^^^^^

Download and install the `cURL package from the
website <https://curl.haxx.se/download.html>`__.

Your First Requests
~~~~~~~~~~~~~~~~~~~

The API entry-point for the resource discovery API is located
at \ ``https://api.chameleoncloud.org/``. Open your Terminal program (or
the cURL executable if you're on Windows), and use cURL to fetch
the resource located at that URL:

``$ curl -i https://api.chameleoncloud.org/``

.. raw:: html

   <div
   style="background: #eee; border: 1px solid #ccc; padding: 5px 10px;">

The \`\`-i\`\` flag tells cURL to display the HTTP header in addition to
the HTTP  body.

.. raw:: html

   </div>

<iframe src="http://showterm.io/7eed7546901bbdc49a598" width="640"
height="480"/></iframe>

Hit ENTER to execute the cURL command, and here is what you should see
in response:

<iframe src="http://showterm.io/7eed7546901bbdc49a598" width="640"
height="480"></iframe>

Note that by default the response body is not displayed in a pretty
format. You must add the ``pretty`` query parameter to the end of the
URI if you want the API to display it in a prettier way:

<iframe src="http://showterm.io/6dbcaa07d4514920f4e00" width="640"
height="480"></iframe>

Note that you should not use the ``pretty`` query parameter in your
scripts, since it requires a bit more processing power to generate.

Now that we see the response payload in a prettier format, we can see
that it contains a number of ``link`` elements, which advertise other
resources that you can access. For example, let's fetch the
``/sites`` resource. From now on we remove the ``-i`` option to show
only the body of the response:

<iframe src="http://showterm.io/7eed7546901bbdc49a598" width="640"
height="480"></iframe>

Discover Resources
------------------

In this section, you will learn how to discover the resources that
compose Chameleon. Whether it is sites, clusters, or nodes, you can
discover the full hardware stack with the Resource Discovery API.

Fetch the list of sites
~~~~~~~~~~~~~~~~~~~~~~~

As seen in the previous section, when you fetch the API root resource,
you can find the link to the collection of sites.

<iframe src="http://showterm.io/7eed7546901bbdc49a598" width="640"
height="480"></iframe>

If you look at the site description, you will find a list of
``links`` to other resources. For example, each site has a link named
``clusters`` (highlighted in bold above). When you fetch this link, it
returns the list of clusters on that site.

Fetch the clusters and nodes of a site
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For the TACC site:

<iframe src="http://showterm.io/32228fac834b3a64144e5" width="640"
height="480"></iframe>

Again, you find ``links`` in each cluster description. There is a link
named ``nodes`` for this cluster, which as its name indicates,
returns the list of nodes for this cluster.

<iframe src="http://showterm.io/288dc780481eda03fa1da" width="640"
height="480"></iframe>

You should get back a big collection of nodes with 45 nodes in total (in
the example above only two are displayed, the rest is ommitted). Each
node is described in great details, so that you can programmatically
find the cluster and nodes that are most suitable for your experiments.

This allows you to see that some of the nodes on the Alamo cluster at
TACC have a different disk configuration:

| ``$ curl https://api.chameleoncloud.org/sites/tacc/clusters/alamo/nodes/45f0fc6a-a21b-4461-8414-ebf765143aad?pretty | grep -A 10 storage_devices``
| ``  "storage_devices": [     {       "device": "sda",       "driver": "mptsas",       "interface": "SCSI",       "model": "ST9146852SS",       "rev": "HT03",       "size": 146815733760,       "vendor": "SEAGATE"     }   ],``

| ``$ curl -s https://api.chameleoncloud.org/sites/tacc/clusters/alamo/nodes/0a5b61b2-dc1c-4bee-86f7-247c9689ea88?pretty | grep -A 10 storage_devices``
| ``  "storage_devices": [     {       "device": "sda",       "driver": "mptsas",       "interface": "SCSI",       "model": "ST9500430SS",       "rev": "DS62",       "size": 500107862016,       "vendor": "SEAGATE"     }   ],``

Fetch the latest changes brought to a site
------------------------------------------

Let's go back to the site's description. In Chameleon, resources are
added, updated, or removed over time. If you want to keep an eye on
those changes, you can fetch the latest changes that occurred on a
specific site:

``$ curl https://api.chameleoncloud.org/sites/tacc/versions/?pretty {   "total": 2,   "offset": 0,   "items": [     {       "uid": "3bb8ab172bfc6c96dbd57f76ba37de7dd3c4d63a",       "date": "Mon, 02 Mar 2015 15:48:28 GMT",       "message": "Add other nodes from the Alamo cluster",       "author": "Pierre Riteau",       "type": "version",       "links": [         {           "rel": "self",           "href": "/sites/tacc/versions/3bb8ab172bfc6c96dbd57f76ba37de7dd3c4d63a",           "type": "application/vnd.grid5000.item+json"         },         {           "rel": "parent",           "href": "/sites/tacc",           "type": "application/vnd.grid5000.item+json"         }       ]     },     {       "uid": "e5af929bc3920ef40a2eb446f3b23e8d1aac66bd",       "date": "Wed, 25 Feb 2015 11:35:52 GMT",       "message": "Initial commit",       "author": "Pierre Riteau",       "type": "version",       "links": [         {           "rel": "self",           "href": "/sites/tacc/versions/e5af929bc3920ef40a2eb446f3b23e8d1aac66bd",           "type": "application/vnd.grid5000.item+json"         },         {           "rel": "parent",           "href": "/sites/tacc",           "type": "application/vnd.grid5000.item+json"         }       ]     }   ],   "links": [     {       "rel": "self",       "href": "/sites/tacc/versions",       "type": "application/vnd.grid5000.collection+json"     },     {       "rel": "parent",       "href": "/sites",       "type": "application/vnd.grid5000.item+json"     }   ] }``

Each version represents a change to some resources of the testbed.
As the Chameleon experimental testbed has only been available recently,
there are not yet meaningful changes available via the ``versions``
link. As we add or upgrade resources, new versions will appear via this
API.

Next Step
---------

Now, it is time to provision some resources! Please choose your way:

-  `Provision resources via
   web <https://www.chameleoncloud.org/provision-resources>`__
-  `Provision resources via command line
   (advanced) <https://www.chameleoncloud.org/advanced-provision-resources>`__
