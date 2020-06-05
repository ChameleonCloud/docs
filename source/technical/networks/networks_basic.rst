.. _basic-networking:

Basic Networking
================

.. Note:: Step-by-step instructions for getting started with Chameleon are available in the :ref:`getting-started` section of this documentation. These instructions include using basic networking functionality.

Shared Network
--------------

All Chameleon Projects have access to the fixed network ``sharednet1`` which is used by most experiments. The ``sharednet1`` is a pre-configured network shared among all Chameleon Projects with one *Subnet* and includes a *Router* providing NAT access to the public Internet. All instances using ``sharednet1`` can communicate directly.

Multiple Networks
-----------------

Some Chameleon bare metal nodes support connecting to multiple networks. Currently, the number of networks allowed is limited to the number of enabled NICs on the node (currently this is up to 2). It is possible to find such nodes via :ref:`resource-discovery` by filtering by the "Enabled" flag for a given Network Adapter slot. Note that the slots are 0-indexed, meaning the first NIC is referred to as Network Adapter #0.

When launching a node that supports multiple networks, simply assign multiple networks to the instance when you are launching it. The networks will be mounted on NICs in the same order that the networks are assigned; that is, the first assigned network will be mounted on Network Adapter #0, and the second on Network Adapter #1, and so on.

Floating IP Addresses
---------------------

Instances on Chameleon are assigned a *fixed* IP address that can be used for local connectivity as well as NAT access to the public Internet. A publicly accessible IPv4 address (*Floating IP address*) is required in order to access Chameleon instances from the Internet or host public services. `CHI\@TACC <https://chi.tacc.chameleoncloud.org>`_ and `CHI\@UC <https://chi.uc.chameleoncloud.org>`_ each have a limited number of public IP addresses that can be allocated to your instances.

The :ref:`getting-started` guide shows how to allocate *Floating IP address* to your nodes.

.. important:: The Chameleon floating IP address pool is a shared and finite resource. **Please be responsible and release any unused floating IP address, so other Chameleon users and projects can use them!**

Floating DNS Records
^^^^^^^^^^^^^^^^^^^^

Each Floating IP is also contained within a dedicated DNS A record; this means that you can access your instance over the Internet either via its Floating IP or a special hostname. This can be particularly helpful if you want to set up a TLS certificate for HTTPS to secure a service you are exposing over the web, e.g., with `LetsEncrypt <https://letsencrypt.org/>`_.

+-----------+-----------------------------------------------------------+
| Site      | Hostname pattern (for IP `AA.BB.CC.DD`)                   |
+===========+===========================================================+
| CHI\@TACC | | **chi-dyn-AA-BB-CC-DD.tacc.chameleoncloud.org**         |
|           | | `e.g., chi-dyn-129-114-108-147.tacc.chameleoncloud.org` |
+-----------+-----------------------------------------------------------+
| CHI\@UC   | | **chi-dyn-AA-BB-CC-DD.uc.chameleoncloud.org**           |
|           | | `e.g., chi-dyn-192-5-87-98.uc.chameleoncloud.org`       |
+-----------+-----------------------------------------------------------+

Security
--------

When your instance has a *Floating IP address* assigned, it is reachable directly over the public Internet. For this reason, it is important to consider the security of any services running on your instance. In particular, **ensure that you have not allowed SSH authentication with passwords** (this is disabled by default on Chameleon-supported images.)

There are additional network security mechanisms on the testbed that you should be aware of.

Firewall
^^^^^^^^

A configurable *Firewall* is available on `CHI\@TACC <https://chi.tacc.chameleoncloud.org>`_ and `CHI\@UC <https://chi.uc.chameleoncloud.org>`_. This is built on the `OpenStack Neutron Firewall-as-a-Service (FWaaS) <https://docs.openstack.org/neutron/latest/admin/fwaas.html>`_ system. By default, any instances connected to the ``sharednet1`` or ``sharedwan1`` shared networks automatically have a firewall configured with the following rules:

+------------+--------------------+-----------+
| Source     | Destination port   | Protocol  |
+============+====================+===========+
| *          | 22                 | TCP       |
+------------+--------------------+-----------+
| *          | 80                 | TCP       |
+------------+--------------------+-----------+
| *          | 443                | TCP       |
+------------+--------------------+-----------+
| *          | n/a                | ICMP      |
+------------+--------------------+-----------+
| 10./8      | *                  | TCP/UDP   |
+------------+--------------------+-----------+
| 172.16./12 | *                  | TCP/UDP   |
+------------+--------------------+-----------+
| 192.168./16| *                  | TCP/UDP   |
+------------+--------------------+-----------+
| fe80::/10  | *                  | ICMP/UDP  |
+------------+--------------------+-----------+

.. note:: If you think there is a case for allowing additional services/ports on this default firewall, please `open a Help Desk ticket <https://www.chameleoncloud.org/user/help/ticket/new/>`_ to let us know.

Security Groups
^^^^^^^^^^^^^^^

`KVM\@TACC <https://openstack.tacc.chameleoncloud.org>`_ supports *Security Groups*, which can be assigned directly to instances upon launch or after the instance is already running. By default, instances have no *Security Groups* applied, so all traffic is allowed.
