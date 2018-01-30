Using the Resource Discovery API
================================

Introduction
------------

Chameleon resources are mainly accessed and operated via the OpenStack
web interface, command line utilities, and APIs. To provide resource
discovery capabilities, we make available an API which was developed as
part of |Link - the Grid'5000 project|. The same information can also be
accessed via the |Link - resource discovery web interface|.

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
the simplest User-Agent available: |Link - cURL|. cURL is a command line
tool for transferring data with URL syntax, supporting many protocols
including HTTP and HTTPS.

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

Download and install the |Link - cURL package from the website|.

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

Hit ENTER to execute the cURL command, and here is what you should see
in response:

``HTTP/1.1 200 OK Server: nginx/1.6.2 Date: Wed, 15 Apr 2015 19:17:25 GMT Content-Type: application/vnd.grid5000.item+json; charset=utf-8 Content-Length: 757 Connection: keep-alive Allow: GET Vary: accept Last-Modified: Fri, 03 Apr 2015 14:17:41 GMT ETag: "61028edadc229565624d8d7ce781d628" Cache-Control: max-age=60, public, must-revalidate=true, proxy-revalidate=true, s-maxage=60 X-Info: Use `?pretty=yes` or add the HTTP header `X-Rack-PrettyJSON: yes` if you want pretty output. X-UA-Compatible: IE=Edge,chrome=1 X-Runtime: 0.006757``

``{"type":"grid","uid":"chameleoncloud","version":"547815582085deb7b703d76a51e082c53aa9d9b4","release":"3.1.9","timestamp":1429125445,"links":[{"rel":"sites","href":"/sites","type":"application/vnd.grid5000.collection+json"},{"rel":"self","type":"application/vnd.grid5000.item+json","href":"/"},{"rel":"parent","type":"application/vnd.grid5000.item+json","href":"/"},{"rel":"version","type":"application/vnd.grid5000.item+json","href":"/versions/547815582085deb7b703d76a51e082c53aa9d9b4"},{"rel":"versions","type":"application/vnd.grid5000.collection+json","href":"/versions"},{"rel":"users","type":"application/vnd.grid5000.collection+json","href":"/users"},{"rel":"notifications","type":"application/vnd.grid5000.collection+json","href":"/notifications"}]}``

The HTTP status of ``200 OK`` indicates that the server was able to
process your request and that everything went fine.

Note that by default the response body is not displayed in a pretty
format. You must add the ``pretty`` query parameter to the end of the
URI if you want the API to display it in a prettier way:

``$ curl -i https://api.chameleoncloud.org/?pretty HTTP/1.1 200 OK Server: nginx/1.6.2 Date: Wed, 15 Apr 2015 19:20:34 GMT Content-Type: application/vnd.grid5000.item+json; charset=utf-8 Content-Length: 1022 Connection: keep-alive Allow: GET Vary: accept Last-Modified: Fri, 03 Apr 2015 14:17:41 GMT ETag: "c5941dae9855a8c494ee0fdc4030e5ec" Cache-Control: max-age=60, public, must-revalidate=true, proxy-revalidate=true, s-maxage=60 X-UA-Compatible: IE=Edge,chrome=1 X-Runtime: 0.038736``

``{   "type": "grid",   "uid": "chameleoncloud",   "version": "547815582085deb7b703d76a51e082c53aa9d9b4",   "release": "3.1.9",   "timestamp": 1429125634,   "links": [     {       "rel": "sites",       "href": "/sites",       "type": "application/vnd.grid5000.collection+json"     },     {       "rel": "self",       "type": "application/vnd.grid5000.item+json",       "href": "/"     },     {       "rel": "parent",       "type": "application/vnd.grid5000.item+json",       "href": "/"     },     {       "rel": "version",       "type": "application/vnd.grid5000.item+json",       "href": "/versions/547815582085deb7b703d76a51e082c53aa9d9b4"     },     {       "rel": "versions",       "type": "application/vnd.grid5000.collection+json",       "href": "/versions"     },     {       "rel": "users",       "type": "application/vnd.grid5000.collection+json",       "href": "/users"     },     {       "rel": "notifications",       "type": "application/vnd.grid5000.collection+json",       "href": "/notifications"     }   ] }``

Note that you should not use the ``pretty`` query parameter in your
scripts, since it requires a bit more processing power to generate.

Now that we see the response payload in a prettier format, we can see
that it contains a number of ``link`` elements, which advertise other
resources that you can access. For example, let's fetch the
``/sites`` resource. From now on we remove the ``-i`` option to show
only the body of the response:

``$ curl https://api.chameleoncloud.org/sites?pretty {   "total": 1,   "offset": 0,   "items": [     {       "description": "Texas Advanced Computing Center",       "email_contact": "help@chameleoncloud.org",       "latitude": 30.390223,       "location": "Austin, Texas, USA",       "longitude": -97.72563,       "name": "TACC",       "security_contact": "help@chameleoncloud.org",       "sys_admin_contact": "help@chameleoncloud.org",       "type": "site",       "uid": "tacc",       "user_support_contact": "help@chameleoncloud.org",       "web": "https://www.chameleoncloud.org",       "version": "547815582085deb7b703d76a51e082c53aa9d9b4",       "links": [         {           "rel": "clusters",           "href": "/sites/tacc/clusters",           "type": "application/vnd.grid5000.collection+json"         },         {           "rel": "self",           "type": "application/vnd.grid5000.item+json",           "href": "/sites/tacc"         },         {           "rel": "parent",           "type": "application/vnd.grid5000.item+json",           "href": "/"         },         {           "rel": "version",           "type": "application/vnd.grid5000.item+json",           "href": "/sites/tacc/versions/547815582085deb7b703d76a51e082c53aa9d9b4"         },         {           "rel": "versions",           "type": "application/vnd.grid5000.collection+json",           "href": "/sites/tacc/versions"         },         {           "rel": "jobs",           "type": "application/vnd.grid5000.collection+json",           "href": "/sites/tacc/jobs"         },         {           "rel": "deployments",           "type": "application/vnd.grid5000.collection+json",           "href": "/sites/tacc/deployments"         },         {           "rel": "vlans",           "type": "application/vnd.grid5000.collection+json",           "href": "/sites/tacc/vlans"         },         {           "rel": "metrics",           "type": "application/vnd.grid5000.collection+json",           "href": "/sites/tacc/metrics"         },         {           "rel": "status",           "type": "application/vnd.grid5000.item+json",           "href": "/sites/tacc/status"         }       ]     }   ],   "version": "547815582085deb7b703d76a51e082c53aa9d9b4",   "links": [     {       "rel": "self",       "type": "application/vnd.grid5000.collection+json",       "href": "/sites"     }   ] }``

Discover Resources
------------------

In this section, you will learn how to discover the resources that
compose Chameleon. Whether it is sites, clusters, or nodes, you can
discover the full hardware stack with the Resource Discovery API.

Fetch the list of sites
~~~~~~~~~~~~~~~~~~~~~~~

As seen in the previous section, when you fetch the API root resource,
you can find the link to the collection of sites.

``$ curl https://api.chameleoncloud.org/sites?pretty {   "total": 1,   "offset": 0,   "items": [     {       "description": "Texas Advanced Computing Center",       "email_contact": "help@chameleoncloud.org",       "latitude": 30.390223,       "location": "Austin, Texas, USA",       "longitude": -97.72563,       "name": "TACC",       "security_contact": "help@chameleoncloud.org",       "sys_admin_contact": "help@chameleoncloud.org",       "type": "site",       "uid": "tacc",       "user_support_contact": "help@chameleoncloud.org",       "web": "https://www.chameleoncloud.org",       "version": "547815582085deb7b703d76a51e082c53aa9d9b4",       "links": [         {           "rel": "clusters",           "href": "/sites/tacc/clusters",           "type": "application/vnd.grid5000.collection+json"         },         {           "rel": "self",           "type": "application/vnd.grid5000.item+json",           "href": "/sites/tacc"         },         {           "rel": "parent",           "type": "application/vnd.grid5000.item+json",           "href": "/"         },         {           "rel": "version",           "type": "application/vnd.grid5000.item+json",           "href": "/sites/tacc/versions/547815582085deb7b703d76a51e082c53aa9d9b4"         },         {           "rel": "versions",           "type": "application/vnd.grid5000.collection+json",           "href": "/sites/tacc/versions"         },         {           "rel": "jobs",           "type": "application/vnd.grid5000.collection+json",           "href": "/sites/tacc/jobs"         },         {           "rel": "deployments",           "type": "application/vnd.grid5000.collection+json",           "href": "/sites/tacc/deployments"         },         {           "rel": "vlans",           "type": "application/vnd.grid5000.collection+json",           "href": "/sites/tacc/vlans"         },         {           "rel": "metrics",           "type": "application/vnd.grid5000.collection+json",           "href": "/sites/tacc/metrics"         },         {           "rel": "status",           "type": "application/vnd.grid5000.item+json",           "href": "/sites/tacc/status"         }       ]     }   ],   "version": "547815582085deb7b703d76a51e082c53aa9d9b4",   "links": [     {       "rel": "self",       "type": "application/vnd.grid5000.collection+json",       "href": "/sites"     }   ] }``

If you look at the site description, you will find a list of
``links`` to other resources. For example, each site has a link named
``clusters`` (highlighted in bold above). When you fetch this link, it
returns the list of clusters on that site.

Fetch the clusters and nodes of a site
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For the TACC site:

``$ curl https://api.chameleoncloud.org/sites/tacc/clusters/?pretty {   "total": 1,   "offset": 0,   "items": [     {       "created_at": "Fri, 20 Feb 2015 14:00:00 GMT",       "model": "Dell PowerEdge M610",       "type": "cluster",       "uid": "alamo",       "version": "547815582085deb7b703d76a51e082c53aa9d9b4",       "links": [         {           "rel": "nodes",           "href": "/sites/tacc/clusters/alamo/nodes",           "type": "application/vnd.grid5000.collection+json"         },         {           "rel": "self",           "type": "application/vnd.grid5000.item+json",           "href": "/sites/tacc/clusters/alamo"         },         {           "rel": "parent",           "type": "application/vnd.grid5000.item+json",           "href": "/sites/tacc"         },         {           "rel": "version",           "type": "application/vnd.grid5000.item+json",           "href": "/sites/tacc/clusters/alamo/versions/547815582085deb7b703d76a51e082c53aa9d9b4"         },         {           "rel": "versions",           "type": "application/vnd.grid5000.collection+json",           "href": "/sites/tacc/clusters/alamo/versions"         }       ]     }   ],   "version": "547815582085deb7b703d76a51e082c53aa9d9b4",   "links": [     {       "rel": "self",       "type": "application/vnd.grid5000.collection+json",       "href": "/sites/tacc/clusters"     },     {       "rel": "parent",       "type": "application/vnd.grid5000.item+json",       "href": "/sites/tacc"     }   ] }``

Again, you find ``links`` in each cluster description. There is a link
named ``nodes`` for this cluster, which as its name indicates,
returns the list of nodes for this cluster.

| ``$ curl https://api.chameleoncloud.org/sites/tacc/clusters/alamo/nodes/?pretty {   "total": 45,   "offset": 0,   "items": [     {       "architecture": {         "platform_type": "x86_64",         "smp_size": 2,         "smt_size": 8       },       "bios": {         "release_date": "04/06/2010",         "vendor": "Dell Inc.",         "version": 2.0       },       "chassis": {         "manufacturer": "Dell Inc.",         "name": "PowerEdge M610",         "serial": "2X71JM1"       },       "gpu": {         "gpu": false       },       "main_memory": {         "ram_size": 12587876352       },       "monitoring": {         "wattmeter": false       },       "network_adapters": [         {           "bridged": false,           "device": "eno1",           "driver": "bnx2",           "interface": "Ethernet",           "mac": "00:26:b9:fb:6a:34",           "management": false,           "model": "NetXtreme II BCM5709S Gigabit Ethernet",           "mounted": true,           "rate": 1000000000,           "switch": null,           "switch_port": null,           "vendor": "Broadcom Corporation"         },         {           "bridged": false,           "device": "eno2",           "driver": "bnx2",           "interface": "Ethernet",           "mac": "00:26:b9:fb:6a:36",           "management": false,           "model": "NetXtreme II BCM5709S Gigabit Ethernet",           "mounted": false,           "rate": 1000000000,           "vendor": "Broadcom Corporation"         }       ],       "operating_system": {         "kernel": "3.10.0-123.20.1.el7.x86_64",         "name": "centos",         "version": "7.0.1406"       },       "processor": {         "cache_l1": null,         "cache_l1d": 32768,         "cache_l1i": 32768,         "cache_l2": 262144,         "cache_l3": 8388608,         "clock_speed": 2660000000,         "instruction_set": "x86-64",         "model": "Intel Xeon",         "other_description": "Intel(R) Xeon(R) CPU           X5550  @ 2.67GHz",         "vendor": "Intel",         "version": "X5550"       },       "storage_devices": [         {           "device": "sda",           "driver": "mptsas",           "interface": "SCSI",           "model": "ST9500430SS",           "rev": "DS62",           "size": 500107862016,           "vendor": "SEAGATE"         }       ],       "supported_job_types": {         "besteffort": false,         "deploy": true,         "virtual": "ivt"       },       "type": "node",       "uid": "0a5b61b2-dc1c-4bee-86f7-247c9689ea88",       "version": "547815582085deb7b703d76a51e082c53aa9d9b4",       "links": [         {           "rel": "self",           "type": "application/vnd.grid5000.item+json",           "href": "/sites/tacc/clusters/alamo/nodes/0a5b61b2-dc1c-4bee-86f7-247c9689ea88"         },         {           "rel": "parent",           "type": "application/vnd.grid5000.item+json",           "href": "/sites/tacc/clusters/alamo"         },         {           "rel": "version",           "type": "application/vnd.grid5000.item+json",           "href": "/sites/tacc/clusters/alamo/nodes/0a5b61b2-dc1c-4bee-86f7-247c9689ea88/versions/547815582085deb7b703d76a51e082c53aa9d9b4"         },         {           "rel": "versions",           "type": "application/vnd.grid5000.collection+json",           "href": "/sites/tacc/clusters/alamo/nodes/0a5b61b2-dc1c-4bee-86f7-247c9689ea88/versions"         }       ]     },``
| ``    [ ... ]     {       "architecture": {         "platform_type": "x86_64",         "smp_size": 2,         "smt_size": 8       },       "bios": {         "release_date": "04/06/2010",         "vendor": "Dell Inc.",         "version": 2.0       },       "chassis": {         "manufacturer": "Dell Inc.",         "name": "PowerEdge M610",         "serial": "H761HSM"       },       "gpu": {         "gpu": false       },       "main_memory": {         "ram_size": 12587876352       },       "monitoring": {         "wattmeter": false       },       "network_adapters": [         {           "bridged": false,           "device": "eno1",           "driver": "bnx2",           "interface": "Ethernet",           "mac": "00:26:b9:fb:65:b8",           "management": false,           "model": "NetXtreme II BCM5709S Gigabit Ethernet",           "mounted": true,           "rate": 1000000000,           "switch": null,           "switch_port": null,           "vendor": "Broadcom Corporation"         },         {           "bridged": false,           "device": "eno2",           "driver": "bnx2",           "interface": "Ethernet",           "mac": "00:26:b9:fb:65:ba",           "management": false,           "model": "NetXtreme II BCM5709S Gigabit Ethernet",           "mounted": false,           "rate": 1000000000,           "vendor": "Broadcom Corporation"         }       ],       "operating_system": {         "kernel": "3.10.0-123.20.1.el7.x86_64",         "name": "centos",         "version": "7.0.1406"       },       "processor": {         "cache_l1": null,         "cache_l1d": 32768,         "cache_l1i": 32768,         "cache_l2": 262144,         "cache_l3": 8388608,         "clock_speed": 2660000000,         "instruction_set": "x86-64",         "model": "Intel Xeon",         "other_description": "Intel(R) Xeon(R) CPU           X5550  @ 2.67GHz",         "vendor": "Intel",         "version": "X5550"       },       "storage_devices": [         {           "device": "sda",           "driver": "mptsas",           "interface": "SCSI",           "model": "ST9500430SS",           "rev": "DS62",           "size": 500107862016,           "vendor": "SEAGATE"         }       ],       "supported_job_types": {         "besteffort": false,         "deploy": true,         "virtual": "ivt"       },       "type": "node",       "uid": "fa318558-9be2-49e0-bb5a-0c28a0f5e99d",       "version": "547815582085deb7b703d76a51e082c53aa9d9b4",       "links": [         {           "rel": "self",           "type": "application/vnd.grid5000.item+json",           "href": "/sites/tacc/clusters/alamo/nodes/fa318558-9be2-49e0-bb5a-0c28a0f5e99d"         },         {           "rel": "parent",           "type": "application/vnd.grid5000.item+json",           "href": "/sites/tacc/clusters/alamo"         },         {           "rel": "version",           "type": "application/vnd.grid5000.item+json",           "href": "/sites/tacc/clusters/alamo/nodes/fa318558-9be2-49e0-bb5a-0c28a0f5e99d/versions/547815582085deb7b703d76a51e082c53aa9d9b4"         },         {           "rel": "versions",           "type": "application/vnd.grid5000.collection+json",           "href": "/sites/tacc/clusters/alamo/nodes/fa318558-9be2-49e0-bb5a-0c28a0f5e99d/versions"         }       ]     }   ],   "version": "547815582085deb7b703d76a51e082c53aa9d9b4",   "links": [     {       "rel": "self",       "type": "application/vnd.grid5000.collection+json",       "href": "/sites/tacc/clusters/alamo/nodes"     },     {       "rel": "parent",       "type": "application/vnd.grid5000.item+json",       "href": "/sites/tacc/clusters/alamo"     }   ] }``

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

.. |Link - the Grid'5000 project| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_3418
.. |Link - resource discovery web interface| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_3421
.. |Link - cURL| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_3424
.. |Link - cURL package from the website| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_3427
