.. _network-jumbo-frames:

Jumbo Frames
=============

By default, Ethernet frames for networks created on each Chameleon site
default to 1500 byte MTU (maximum transmission unit). However, all TOR
switches on Chameleon are configured to allow for payloads of up to 9000 bytes.
If you would like to experiment with jumbo frames on your private networks or
over Layer 2 connections then please follow the steps below to implement.

.. note::

    You will not be able to send jumbo frames out over the public internet, as
    many commercial networks do not support jumbo frames. You also will not be
    able to send jumbo frames across two separate tenant networks via an
    OpenStack router. However, traffic between your nodes or over a stitched
    layer2 network like ExoGENI can all utilize jumbo frames.

.. important::

    Do not set your MTU value greater than 9000. MTUs greater than 9000 bytes
    are not supported on Chameleon.


Enabling Jumbo Frames When Creating a Network
---------------------------------------------

Enabling jumbo frames on a new network will ensure that the first Ethernet
interface on all newly created baremetal instances will have its MTU set to
the value specified.

.. code-block:: bash

   openstack network create --provider-network-type vlan --mtu 9000 \
        --provider-physical-network physnet1 <network_name>

.. note::

    You can verify the MTU is correct on your instance with the command
    ``ifconfig eno1``. The first Ethernet interface is typically ``eno1`` for
    most Chameleon base images.


Enabling Jumbo Frames on Existing Network
-----------------------------------------

You can also modify the MTU of an existing network using the command below.
Please note that this will only effect newly created baremetal instances.

.. code-block:: bash

   openstack network set <network_name> --mtu 9000


Enabling Jumbo Frames on Existing Instances
-------------------------------------------

Setting the MTU on your Chameleon network only affects instances on boot to set
the first Ethernet interface. If you already have a live baremetal instance
then you can simply use the command below on the instance to set MTU manually.

.. code-block:: bash

   sudo ip link set dev eno1 mtu 9000
