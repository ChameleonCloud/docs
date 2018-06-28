

.. _basic-networking:

________________
Basic Networking
________________

.. Note:: Step-by-step instructions for getting started with Chameleon are available in the :ref:`getting-started` section of this documentation. These instructions include using basic networking functionality.


Shared Network
_______________

All Chameleon Projects have access to the fixed network ``sharednet1`` which is used by most experiments. The ``sharednet1`` is a pre-configured network shared among all Chameleon Projects with a *Subnet* whose address space is ``10.52.0.0/22`` and includes a router providing NAT access to the public Internet. All instances using ``sharednet1`` can communicate directly.


Floating IP Addresses
_____________________

Instances on Chameleon are assigned a *fixed* IP address that can be used for local connectivity as well as NAT access to the public Internet. A publicly accessible IPv4 address (*Floating IP address*) is required in order to access Chameleon instances from the Internet or host public services. `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ and `CHI@UC <https://chi.uc.chameleoncloud.org>`_ each have a limited number of public IP addresses that can be allocated to your instances.

The :ref:`getting-started` guide shows how to allocate *Floating IP address* to your nodes.

.. important:: The Chameleon floating IP address pool is a shared and finite resource. **Please be responsible and release any unused floating IP address, so other Chameleon users and projects can use them!**

Security Groups
_______________

Currently, *Security Groups* are not implemented on `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ and `CHI@UC <https://chi.uc.chameleoncloud.org>`_. Therefore, all inbound and outbound port traffic is open to the Internet at these sites. `KVM@TACC <https://openstack.tacc.chameleoncloud.org>`_ observes *Security Groups*, which allows inbound and outbound traffic to be filtered by port with a default policy.
