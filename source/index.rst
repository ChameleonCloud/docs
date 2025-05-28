====================
Welcome to Chameleon
====================

What is Chameleon?
==================

Chameleon is an NSF-funded testbed system for Computer Science experimentation. 
It provides researchers with deeply reconfigurable cloud infrastructure for systems, 
networking, distributed computing, and security research. Unlike traditional cloud 
services, Chameleon offers both bare metal access to physical hardware and traditional 
virtual machines, giving you full control over the software stack and enabling 
reproducible experimental research.

Key Features
============

**Hardware Access**
  * **Bare metal instances**: Full control over physical servers without virtualization overhead
  * **Virtual machines**: Traditional OpenStack KVM instances for development and testing
  * **Diverse hardware**: Intel/AMD CPUs (with ROCm support), ARM ThunderX2, GPUs, FPGAs, Atom processors, high-memory nodes
  * **Storage options**: NVMe SSDs, traditional spinning disks, shared file systems
  * **High-performance networking**: InfiniBand, 25/100 Gigabit Ethernet

**Experimental Capabilities**
  * **Resource isolation**: Dedicated hardware reservations for reproducible experiments
  * **Custom images**: Create and share disk images with your experimental software
  * **Power monitoring**: Measure energy consumption at the node and application level
  * **Performance metrics**: Built-in monitoring and data collection tools

**Advanced Networking**
  * **Isolated networks**: Create private Layer-2 VLANs for multi-node experiments
  * **Multi-site Layer-3**: Direct routing between Chameleon sites via FABRIC (FabnetV4)
  * **WAN connectivity**: Connect to external networks and other testbeds via FABRIC
  * **Flexible topologies**: Advanced routing and network configuration

**Collaboration & Reproducibility**
  * **Trovi sharing portal**: Package and share complete experimental environments
  * **Jupyter integration**: Interactive development and data analysis environment
  * **Multi-site deployment**: Experiments across geographically distributed sites

Getting Started
===============

**New to Chameleon?**
  Start with our :doc:`getting-started guide <getting-started/index>` to create an account, 
  join a project, and launch your first instance.

**Need access to the testbed?**
  Learn about :doc:`PI eligibility <user/pi_eligibility>` and :doc:`project management <user/project>`.

**Ready to use the testbed?**
  Choose your interface:
  
  * :doc:`Web Interface <technical/gui/index>` - Point-and-click access to all features
  * :doc:`Command Line <technical/cli/index>` - Programmatic access and automation
  * :doc:`Jupyter Environment <technical/jupyter/index>` - Interactive notebooks and data analysis

Quick Navigation
================

**Core Workflow**
  1. :doc:`Discover resources <technical/discovery/index>` - Find the right hardware for your experiment
  2. :doc:`Make reservations <technical/reservations/index>` - Reserve nodes and networks
  3. :doc:`Launch instances <technical/baremetal/index>` - Deploy your experimental environment
  4. :doc:`Monitor and collect data <technical/power_monitoring/index>` - Measure performance and energy usage

**Advanced Features**
  * :doc:`Custom images <technical/images/index>` - Create reproducible software environments
  * :doc:`Complex deployments <technical/complex/index>` - Multi-node orchestration with Heat
  * :doc:`Networking <technical/networks/index>` - Advanced network topologies and isolation
  * :doc:`FPGA programming <technical/fpga/index>` - Hardware acceleration experiments
  * :doc:`Share your work <technical/sharing/index>` - Publish experiments via Trovi

**Data & Storage**
  * :doc:`Object storage <technical/swift/index>` - Scalable data storage and sharing
  * :doc:`Shared file systems <technical/shares/index>` - NFS-mounted storage for instances
  * :doc:`KVM instances <technical/kvm/index>` - Traditional virtual machines when needed

**Getting Help**
  * :doc:`Help desk <user/help>` - Submit tickets and view system status
  * :doc:`User profile <user/profile>` - Manage your account settings
  * :doc:`Daypass access <technical/daypass>` - Temporary access for artifact reproduction

About the Testbed
=================

Chameleon operates multiple sites providing different capabilities:

**Core Sites:**

* **CHI@TACC** (Texas): Large-scale bare metal cloud with diverse Intel/AMD hardware including GigaIO nodes
* **CHI@UC** (Chicago): Networking-focused site with specialized hardware and GPU/FPGA resources
* **CHI@NCAR** (Colorado): ARM ThunderX2 nodes for edge computing and atmospheric science research
* **CHI@Edge**: Distributed edge computing with Raspberry Pi devices (including Raspberry Pi 5)
* **KVM@TACC** (Texas): Traditional OpenStack cloud

**Associate Sites:**

* **CHI@NRP**: National Research Platform integration
* **CHI@NU**: Northwestern University integration
* **CHI@EVL**: Electronic Visualization Laboratory (UIC) integration

The testbed serves hundreds of research projects annually, supporting publications 
in systems, networking, distributed computing, cybersecurity, edge computing, and 
atmospheric sciences.

Learn more about Chameleon and join the community at https://www.chameleoncloud.org.