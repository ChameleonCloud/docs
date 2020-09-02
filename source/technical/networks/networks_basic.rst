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

Instances on Chameleon are assigned a *fixed* IP address that can be used for local connectivity as well as NAT access to the public Internet. A publicly accessible IPv4 address (*Floating IP address*) is required in order to access Chameleon instances from the Internet or host public services. |CHI@TACC| and |CHI@UC| each have a limited number of public IP addresses that can be allocated to your instances.

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

When your instance has a *Floating IP address* assigned, it is reachable
directly over the public Internet. For this reason, it is important to consider
the security of any services running on your instance. In particular, **ensure
that you have not allowed SSH authentication with passwords** (this is disabled
by default on Chameleon-supported images.)

In order to better protect Chameleon instances, Chameleon Ubuntu and CentOS 
base images come with baked-in firewall rules which allow all communication 
within Chameleon private networks, but severely restrict connections over the public 
internet. If using a different image or if you disable firewall rules, realize 
that any network services can potentially be exposed to the public Internet if 
your instance has a Floating IP attached.

.. warning::

   Some commodity systems such as Apache Spark and Hadoop have in the past
   shipped with *very insecure* default settings. Pay particular attention to
   the security needs of your experiment when selecting what systems you need
   to install on your node, particularly when exposing the node to the Internet.

.. note::

   We're here to help! If you want advice on how to securely run your
   experiment, feel free to file a |Help Desk| ticket.

Firewall
^^^^^^^^

Chameleon-supported Ubuntu and CentOS images are preconfigured with a firewall
utility called ``ufw`` enabled and the following rules set:

.. code-block:: shell

    ufw limit ssh
    ufw allow http
    ufw allow https
    ufw allow from 10.0.0.0/8
    ufw allow from 172.16.0.0/12
    ufw allow from 192.168.0.0/16
    ufw default deny incoming

These rules allow ssh traffic on port 22 over the public internet, but will 
limit the number of attempts to 6 for every 30 seconds.

HTTP/HTTPS on port 80 and 443 are allowed.

Communication is fully allowed over the 3 private network ranges use by
Chameleon.

Any other incomming connections will be denied.

You can enable communication over a specifc port using the command:

.. code-block:: shell

        sudo ufw allow <port>

You can also permit connections from a specific ip or network:

.. code-block:: shell

        sudo ufw allow from <ip address or network> 

The `man page for ufw
<http://manpages.ubuntu.com/manpages/bionic/man8/ufw.8.html>`_ has more
examples.

Security Groups
^^^^^^^^^^^^^^^

`KVM\@TACC <https://kvm.tacc.chameleoncloud.org>`_ supports *Security Groups*, which can be assigned directly to instances upon launch or after the instance is already running. By default, instances have no *Security Groups* applied, so all traffic is allowed.

Limit bound interfaces
^^^^^^^^^^^^^^^^^^^^^^

Instead of binding a web service to all interfaces (e.g. ``0.0.0.0`` for IPv4,
``::`` for IPv6), consider listening only on the node's private IP, which is not
routable from the public Internet. If you can, listening on localhost
(``127.0.0.1``) is even safer. Most web services have a way to specify the bind
address and some default to binding on all interfaces, which is often insecure.
