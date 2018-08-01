.. _sdn:

___________________________
Software Defined Networking
___________________________


.. Tip:: A good way to start working with OpenFlow on Chameleon is the `OpenFlow Quick Start`_ appliance. 

.. _OpenFlow Quick Start: https://www.chameleoncloud.org/appliances/56/

Chameleon's Bring Your Own Controller (BYOC) functionality enables tenants to create isolated network switches managed using an OpenFlow controller provided by the tenant.  This feature is targeted at users wishing to experiment with software-defined networking (SDN) as well as enabling custom network appliances supporting experiments that have non-standard networking requirements. This document focuses on how to use OpenFlow networks on Chameleon. A complete discussion of OpenFlow and SDN is beyond the scope of this document.

.. Note::  **More information on OpenFlow**:   
           https://www.sdxcentral.com/sdn/definitions/what-is-openflow/  and 
           https://www.opennetworking.org/technical-communities/areas/specification/open-datapath/

OpenFlow switches, like traditional switches, forward network traffic between a number of ports used to connect other networks and devices. The primary difference is that OpenFlow switches rely on external software (a "controller") to dynamically manage the rules (or "flows") that determine how and where the traffic is forwarded. In addition, OpenFlow enables a much larger set of possible rules which can be imposed on the traffic.

The basic requirements of an OpenFlow switch are the switch and the controller. The switch is configured with the IP address and port of a controller (software) that manages the switch's rules.  When a packet arrives at the switch, the packet is tested against the rules that are known by the switch to determine what action(s) to take.  Typically, if there are no rules that apply to a packet, the packet is sent to the controller which replies with a set of rules for that type of packet. The new rules are cached in the switch and applied to subsequent packets until the rules expire or are explicitly removed.

.. Note:: **Common OpenFlow Controllers**:
          Open Daylight: https://www.opendaylight.org/
          Ryu: https://osrg.github.io/ryu/
          ONOS: https://onosproject.org/
          Floodlight: http://www.projectfloodlight.org/floodlight/
          NOX: https://github.com/noxrepo/nox

Chameleon and OpenFlow
______________________

BYOC is part of the expanded deployment for Chameleon's phase 2. It enables tenants to allocate OpenFlow switches controlled by their own OpenFlow controller. This capability is limited to the phase 2 hardware additions that include the Corsa DP2000 series OpenFlow switches and Skylake compute nodes. The Corsa switches are key to enabling the BYOC functionality.  These switches allow for the creation of mutually isolated forwarding contexts which can be thought of as virtual OpenFlow switches even though they are the native abstraction used by the Corsa DP2000s. Each isolated forwarding context can be configured to use its own OpenFlow controller. The Chameleon BYOC functionality enables tenants to specify the IP and port of an arbitrary OpenFlow controller when they create private networks.

.. Important:: OpenFlow capabilities are only available on the Skylake nodes. These are the only nodes that are attached to the Corsa DP2000 series switches.

Specifying an OpenFlow controller for your private network is just a special case of creating a private network.  Before proceeding you should become familiar with using regular private VLANs on Chameleon and be able to create your own private VLANs. Background information can be found in the document covering Reconfigurable Networking.

Alert: Currently it is not possible to specify an OpenFlow controller using the Horizon portal.  However, OpenFlow networks with tenant owned controllers can be created using Heat templates which integrate the instructions below.  

Using the CLI, an external OpenFlow controller (IP and port) can be specified on the command line using the "--description" field as shown below. Creating the subnet and router is the same as any other Chameleon network. 

.. Important:: For now, the OpenFlow functionality at UC is restricted to ExoGENI stitchable VLANs only. OpenFlow is available for all VLANs at the TACC site.

.. code-block:: bash

   openstack network create --provider-network-type vlan --provider-physical-network exogeni 
   --description OFController=<OF_Controller_IP>:<OF_Controller_Port> <network_name>

The output should look like the following:


.. code::

   +---------------------------+--------------------------------------+
   | Field                     | Value                                |
   +---------------------------+--------------------------------------+
   | admin_state_up            | UP                                   |
   | availability_zone_hints   |                                      |
   | availability_zones        |                                      |
   | created_at                | 2018-05-23T14:38:18Z                 |
   | description               | OFController=162.250.136.46:6653     |
   | dns_domain                | None                                 |
   | id                        | 5e359c6f-a69e-4f4d-b92a-784a5f6ca59f |
   | ipv4_address_scope        | None                                 |
   | ipv6_address_scope        | None                                 |
   | is_default                | None                                 |
   | mtu                       | 1500                                 |
   | name                      | exogeni-exogeni-3294                 |
   | port_security_enabled     | False                                |
   | project_id                | e8ae724d28374d0fa15a0e16674b5c47     |
   | provider:network_type     | vlan                                 |
   | provider:physical_network | exogeni                              |
   | provider:segmentation_id  | 3294                                 |
   | qos_policy_id             | None                                 |
   | revision_number           | 2                                    |
   | router:external           | Internal                             |
   | segments                  | None                                 |
   | shared                    | False                                |
   | status                    | ACTIVE                               |
   | subnets                   |                                      |
   | updated_at                | 2018-05-23T14:38:18Z                 |
   +---------------------------+--------------------------------------+


Example CLI command used to create the network:


.. code-block:: bash

   [root@admin02 ~]# NET="exogeni-3294"
   [root@admin02 ~]# PHYSICAL_NETWORK_TENANT="exogeni"
   [root@admin02 ~]# NET_TYPE="vlan"
   [root@admin02 ~]# NET_NAME="${PHYSICAL_NETWORK_TENANT}-${NET}"
   [root@admin02 ~]# OF_CONTROLLER_IP="162.250.136.46"
   [root@admin02 ~]# OF_CONTROLLER_PORT="6653"
   [root@admin02 ~]# openstack network create --provider-network-type ${NET_TYPE} \
   >                          --provider-physical-network ${PHYSICAL_NETWORK_TENANT} \
   >                          --description OFController=${OF_CONTROLLER_IP}:${OF_CONTROLLER_PORT} \
   >                          ${NET_NAME}
   +---------------------------+--------------------------------------+
   | Field                     | Value                                |
   +---------------------------+--------------------------------------+
   | admin_state_up            | UP                                   |
   | availability_zone_hints   |                                      |
   | availability_zones        |                                      |
   | created_at                | 2018-05-23T14:38:18Z                 |
   | description               | OFController=162.250.136.46:6653     |
   | dns_domain                | None                                 |
   | id                        | 5e359c6f-a69e-4f4d-b92a-784a5f6ca59f |
   | ipv4_address_scope        | None                                 |
   | ipv6_address_scope        | None                                 |
   | is_default                | None                                 |
   | mtu                       | 1500                                 |
   | name                      | exogeni-exogeni-3294                 |
   | port_security_enabled     | False                                |
   | project_id                | e8ae724d28374d0fa15a0e16674b5c47     |
   | provider:network_type     | vlan                                 |
   | provider:physical_network | exogeni                              |
   | provider:segmentation_id  | 3294                                 |
   | qos_policy_id             | None                                 |
   | revision_number           | 2                                    |
   | router:external           | Internal                             |
   | segments                  | None                                 |
   | shared                    | False                                |
   | status                    | ACTIVE                               |
   | subnets                   |                                      |
   | updated_at                | 2018-05-23T14:38:18Z                 |
   +---------------------------+--------------------------------------+

Controllers for Corsa DP2000 series switches
____________________________________________

OpenFlow controllers often need to be aware of the slight differences in implementation across switch vendors. What follows is a description of the quirks we have found while using the Corsa DP2000 series switches as well as a simple controller configuration that is compatible with Chameleon OpenFlow networks.

We have used Ryu and OpenDaylight controllers for the VFCs (Virtual Forwarding Context) on Corsa switches.  We have provided a sample OpenFlow Ryu controller application that is available on GitHub. In addition, we have provided a Chameleon appliance that creates a Ryu controller based on these code modifications.

This controller is derived from the Ryu simple_switch_13.py with the following considerations. If you want use any other OpenFlow controller you will have to make similar considerations.

1. VFCs on Corsa switches are created by allocating specific amounts of system resources. Each VFC has a limited amount of resources in order to accommodate the requests of all Chameleon users. This limits the number of flows that can be put in the flow tables. Controllers will need to be careful not to fill up the flow tables. In our example, an idle timeout (defaulting to 5 minutes) to any rule inserted into the VFC via the controller is added to ensure the flow tables are cleaned up. This way, the switch removes the rule itself, once traffic matching the rule stops passing (for the specified interval).

2. The Corsa switches do not support Actions=FLOOD since this reserved port type is only for hybrid switches and it is optional. Corsa is an Openflow-only switch which supports the required port ALL. Controllers must replace the Actions=FLOOD to Actions=ALL in packet out messages.

3. Flow tables are modified according to the status of the ports being added or deleted from the VFC. 

The following changes are made to the application:

Added the functions below:

.. code::

   def _port_status_handler(self, ev):
   def delete_flow(self, datapath, port):

Added IDLE_TIMEOUT to flow modification in:

.. code::

   def add_flow(self, datapath, priority, match, actions, buffer_id=None):

Changes are made in the function below to change ``Actions=FLOOD`` to ``actions=ALL`` in packet out message in the ``def _packet_in_handler(self, ev):`` method.



This controller application can be run by the script below:

.. code::

   CHAMELEON_RYU_URL="https://github.com/ChameleonCloud/ryu.git"
   CHAMELEON_RYU_APP="simple_switch_13_custom_chameleon.py"
   
   yum install -y epel-release
   yum install -y python-pip git
   pip install ryu
   
   RYU_DIR="/opt/ryu"
   
   mkdir ${RYU_DIR} && mkdir ${RYU_DIR}/repo
   
   git clone ${CHAMELEON_RYU_URL} ${RYU_DIR}/repo
   ln -s ${RYU_DIR}/repo/ryu/app/${CHAMELEON_RYU_APP} ${RYU_DIR}/${CHAMELEON_RYU_APP}
   
   
   RYU_PID_FILE="/var/run/ryu/ryu-manager.pid"
   RYU_LOG_FILE="/var/log/ryu/ryu-manager.log"
   RYU_CONFIG_DIR="/opt/ryu/etc"
   RYU_APP="${RYU_DIR}/${CHAMELEON_RYU_APP}"
   OFP_TCP_LISTEN_PORT="6653"
   
   
   /usr/bin/ryu-manager --pid-file \${RYU_PID_FILE} --ofp-tcp-listen-port \${OFP_TCP_LISTEN_PORT} --log-file \${RYU_LOG_FILE} \${RYU_APP}
