.. _stitching:

_______________________________________

External Layer2 Connections (Stitching)
_______________________________________


Chameleon provides support for sophisticated networking experiments by providing `GENI-style stitching <http://groups.geni.net/geni/wiki/GeniNetworkStitchingSites>`_. This capability enables users to deploy networking experiments (layer 2 and layer 3) that span Chameleon and other facilities such as `FABRIC <https://fabric-testbed.net/>`_.  Users can create dedicated Chameleon networks directly connected to external facilities and configure custom subnets and routers for handling these external connections. This capability is essential to users interested in experimenting with wide-area networks in a controlled environment or lower-level wide-area protocols (e.g.  BGP or other routing protocols) that are not typically configurable by experimenters.

Stitched Chameleon networks are connected to external facilities using one VLAN allocated from of a pool VLANs that are statically provisioned between Chameleon and the external facility. Users can allocate one of these VLANs by making a reservation using Blazar. Currently, externally stitched networks are created by Blazar when the reservation is started.   There is a pool of VLANs (3300-3309) between the Chameleon CHI\@UC racks to the FABRIC site at StarLight (Chicago). Connections between the TACC site and FABRIC are in development.

The remainder of this document describes how to stitch Chameleon experiments to external resources using FABRIC. In addition to creating the stitched networks, you will need to know how to configure subnets and routers on dynamic VLANs as described in the :ref:`network-isolation` documentation.

.. note::

    Stitching to FABRIC with the Python API is shown this a `Trovi Artifact <https://www.chameleoncloud.org/experiment/share/9284120f-3436-41f3-9e82-238e0628ec6c>`_


.. _network-stitchable-create:

Configuring a Stitchable Network
________________________________

Your first step will require creating a stitchable network. Unlike creating
other networks on Chameleon, stitchable networks can only be created by first
reserving a stitchable VLAN segment. Once you reserve a VLAN segment, your network
will be created automatically. To reserve a segment on the appropriate
external testbed make sure to include ``fabric`` as the ``stitch_provider``
in the ``resource_properties`` attribute. An example is provided below:

.. code-block:: bash

   openstack reservation lease create --reservation \
   resource_type=network,network_name=my-stitchable-network,\
   resource_properties='["==","$stitch_provider","fabric"]' \
   --start-date "2022-01-01 12:00" --end-date "2022-01-02 12:00" \
   my-stitchable-network-lease

After your stitched VLAN network is created, you will be able to query for the network to get the specific VLAN
that is used by your network.  Openstack refers to the VLAN as the ``segmentation_id``.  The following command
will display the VLAN.

.. code-block:: bash

    openstack network show my-stitchable-network --format value -c provider:segmentation_id

At this point your Chameleon network is connected to a FABRIC ``facility port`` at layer 2.  You can now create a
FABRIC slice and specify the Chameleon ``segmentation_id`` to use.  This is a layer 2 connection and you can configure
higher-level protocols, such as IP, in any way you desire.


Connecting Stitchable Isolated Networks across Chameleon Sites
______________________________________________________________

Coming soon! When FABRIC stitching is available at TACC, you will be able to directly connect your
experiments that span UC and TACC Chameleon sites.
