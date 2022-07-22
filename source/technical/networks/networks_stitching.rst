.. _stitching:

_______________________________________
External Layer2 Connections (Stitching)
_______________________________________

Chameleon provides support for sophisticated networking experiments by providing `GENI-style stitching <http://groups.geni.net/geni/wiki/GeniNetworkStitchingSites>`_. This capability enables users to deploy networking experiments (layer 2 and layer 3) that extend across Chameleon, potentially other testbeds such as `GENI <http://www.geni.net/>`_, and into physical resources on their own campus networks. Users can create a dedicated network associated with a dynamic VLAN, subnet with own DHCP server, and router for external connections.

Currently, it is possible to connect user-configured networks to other domains (e.g. GENI) over circuits created on Internet2’s Advanced Layer 2 Service (AL2S). In this setup, a pool of VLANs is extended from Chameleon CHI\@UC racks to the AL2S endpoint at StarLight. Currently, 10 VLAN tags (3290-3299) are dedicated to this AL2S endpoint, although 3290 is reserved for system use. A user-configured network that is associated with one of the dedicated AL2S VLAN tags (segmentation ID must be the same as AL2S VLAN tag) can be stitched to external domains (e.g. GENI). A circuit on AL2S needs to be created.

This document describes how to stitch Chameleon experiments to external resources including `Internet2 <https://www.internet2.edu/>`_ connected campuses. You will need to know how to create stitchable dynamic VLANs as described in the :ref:`network-isolation` documentation.

This document also describes connecting isolated stitchable networks across Chameleon sites (|CHI@UC| and |CHI@TACC| ) over layer-2 circuits.

Chameleon has the capability to create dynamically managed VLANs associated with user-configured private IP subnets as described on :ref:`network-isolation`. Users can create a dedicated network associated with a dynamic VLAN, subnet with own DHCP server, and router for external connections. These networks can be created through the web as well as command line interface. User-configured networks (isolated networks) are associated with VLANs by *Segmentation IDs*.

In the following sections, this workflow is described for different settings.


.. _network-stitchable-create:

Configuring a Stitchable Network
________________________________

Your first step will require creating a stitchable network. Unlike creating
other networks on Chameleon, stitchable networks can only be created by first
reserving a stitchable VLAN segment using the CLI (See
:ref:`reservation-cli-vlan`). Once you reserve any VLAN segment, your network
will be created automatically. To reserve a segment on the appropriate
external testbed make sure to include ``exogeni`` as the ``stitch_provider``
in the ``resource_properties`` attribute. An example is provided below:

.. code-block:: bash

   openstack reservation lease create --reservation \
   resource_type=network,network_name=my-stitchable-network,\
   resource_properties='["==","$stitch_provider","exogeni"]' \
   --start-date "2015-06-17 16:00" --end-date "2015-06-17 18:00" \
   my-stitchable-network-lease

Connecting Chameleon to user owned domains
__________________________________________

Users can connect their local domains to Chameleon over manually created layer-2 circuits on AL2S. Local domains need to be connected to the other AL2S endpoint of the circuit by users.

Circuits on AL2S are created through the Internet2 `AL2S OESS portal <https://al2s.net.internet2.edu/oess/>`_. The `OESS (Open Exchange Software Suite) <https://docs.globalnoc.iu.edu/sdn/oess.html>`_ is a set of software used to configure and control dynamic layer 2 virtual circuit (VLAN) networks on OpenFlow enabled switches. It includes a web-based user interface as well as a web services API.

Chameleon is connected to the AL2S endpoint at StarLight:

.. code::

   Node: sdn-sw.star.net.internet2.edu
   Interface: et-8/0/0
   VLAN range: 3290-3299

A user can log into the AL2S OESS portal and create a circuit connecting the Chameleon endpoint to the user-owned endpoint. The user should have an account to log in to the AL2S OESS portal. On OESS, users are members of workgroups. After logging in to the portal, a user can see the workgroups that he/she is a member of.

.. figure:: networks/oess.png

Network resources on AL2S are granted access to the workgroups. This access is granted by the owner of the AL2S network resource (campus network administrators or network engineers at regional providers). After granting access to the resources, they become available for the workgroup and start showing up in the “Available Resources” section. For the user to create such a circuit on AL2S with Chameleon endpoint, the workgroup that the user has membership should be granted access for this endpoint. This can be requested from Chameleon by opening a ticket with our help desk.

As an example, Chameleon resources can be seen in “Available Resources” section for a user in the “ExoGENI” workgroup after access to the workgroup is granted.

.. figure:: networks/available.png

The user in the ExoGENI workgroup can create a circuit with two endpoints to connect a local site to Chameleon.

.. code::

   Endpoint 1 (Local site):
   Node: sdn-sw.rale.net.internet2.edu
   Interface: et-9/0/0
   VLAN: 3998

   Endpoint 2 (|CHI@UC|):
   Node: sdn-sw.star.net.internet2.edu
   Interface: et-8/0/0
   VLAN: 3290

To create a circuit, follow these instructions:

#. Create a new VLAN

   .. figure:: networks/createvlan.png

#. Select endpoints

   .. figure:: networks/selectendpoints.png

#. Submit circuit request

   .. figure:: networks/submitcircuit.png

#. When the circuit is provisioned, you should see this:

   .. figure:: networks/circuitprovisioned.png

#. In addition, the Path can be seen on the map. Utilization data becomes available after 3 hours.

   .. figure:: networks/pathseen.png

At this point, a layer-2 circuit is created on AL2S. The user-configured network with segmentation ID 3290 can be connected to the local servers. The user needs to extend the VLANs at the local site (3998 in this case) to the AL2S endpoint.

To obtain an account to access AL2S OESS portal, users should contact Internet2. Information can be found from the links below:

- `AL2S Participants <https://www.internet2.edu/products-services/advanced-networking/layer-2-services/al2s-participants/>`_
- `AL2S Layer 2 Service Workgroups <https://www.internet2.edu/products-services/advanced-networking/layer-2-services/#service-participate>`_
- `AL2S FAQ <https://www.internet2.edu/products-services/advanced-networking/layer-2-services/#service-faq>`_
- `Using OESS <https://docs.globalnoc.iu.edu/sdn/oess/using-oess.html>`_

Connecting Stitchable Isolated Networks across Chameleon Sites
______________________________________________________________

1. Create isolated networks by specifying the "exogeni" stitch_provider. Follow the documentation for :ref:`network-stitchable-create`
   A "stitchable" VLAN tag will be returned.
   This step will be executed the same way on both UC and TACC sites.
2. After having stitchable isolated networks on UC and TACC sites, a request should be sent to the |Help Desk| for creation of AL2S circuits.
   In the request, following information should be specified:

   - Information for the network at UC (Project ID, name of the network, ID of the network)
   - Information for the network at TACC (Project ID, name of the network, ID of the network)
   - Duration of the circuit in active state
