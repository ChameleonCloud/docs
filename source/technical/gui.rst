.. _gui:

===============================
Graphical User Interface (GUI)
===============================

.. contents:: Table of Contents
   :local:
   :depth: 2

Introduction
============

The Graphical User Interface (GUI) provides a point-and-click experience for
working with Chameleon resources. From the GUI, you may perform tasks such as
manage and launch instances, and configure custom networking. Additionally, you
may download an *OpenStack RC* file from the GUI if you wish to work with the
:ref:`Command Line Interface <cli>`, instead. The Chameleon GUI is built on top
of `OpenStack Horizon <https://docs.openstack.org/horizon/latest/>`_. Chameleon 
has multiple resource sites, each with its own URL (though it is possible to
easily switch from one to other, see :ref:`gui-project-menu`).

- |CHI@TACC| - Texas Advanced Computing Center: https://chi.tacc.chameleoncloud.org
- |CHI@UC| - University of Chicago: https://chi.uc.chameleoncloud.org  
- |CHI@NCAR| - National Center for Atmospheric Research: https://chi.ncar.chameleoncloud.org

Chameleon also hosts an *OpenStack KVM* implementation where you may work with
virtual machines. This site **does not** have access to bare metal resources. It
is available at:

    https://kvm.tacc.chameleoncloud.org

This section provides an overview of GUI interface navigation and basic functionality.
For detailed instructions on using specific Chameleon features, see the dedicated
documentation sections: :ref:`baremetal`, :ref:`networking`, :ref:`reservations`,
:ref:`images`, :ref:`object-store`, and :ref:`complex`.

You may login to either site using your Chameleon portal username and password.

.. _bare-metal-sites-independent:
.. attention::

   Each Chameleon testbed sites---|CHI@TACC|, |CHI@UC|, and |KVM@TACC|---are
   **independent**, so snapshots, keypairs, Swift containers, and other objects
   are unique to each site. For example, a keypair created at the |CHI@TACC|
   site is **not** available at the |CHI@UC| site. In addition, the bare metal
   resource types vary between sites.

GUI Features
============

Upon logging in to the GUI at a Chameleon site, you will see your project's
Overview page.

.. figure:: gui/gui.png
   :alt: The Chameleon GUI

   The Chameleon GUI

.. _gui-project-menu:

Project and Site Menu
---------------------

To switch among the projects you belong to, use the project and site menu---the
dropdown on the upper left of the screen next to the Chameleon logo. You can
also use this menu to switch from one Chameleon site to another. This allows you
to easily perform multi-site experiments.

.. figure:: gui/project_dropdown.png
   :alt: Switching between projects

   Switching between projects

.. _gui-user-menu:

User Menu
---------

To access user specific settings and download *OpenStack RC* files, use the user
menu---the dropdown on the upper right of the screen where you will see your
account name.

.. figure:: gui/user_dropdown.png
   :alt: The user dropdown menu

   The user dropdown menu

.. _gui-settings:

Settings
~~~~~~~~

In the settings menu, you can change user specific settings such as the
Timezone.

.. figure:: gui/user_settings.png
   :alt: User settings

   User settings

.. note::

   Updating your timezone is **highly** recommended. When you make reservations
   for bare metal resources, your local time will be used. UTC is the default
   Timezone.


Help
~~~~

The *Help* menu item will take you to this documentation site.


OpenStack RC File
~~~~~~~~~~~~~~~~~

Clicking on this menu items will download a customized `RC file
<http://www.catb.org/jargon/html/R/rc-file.html>`_ for use with the OpenStack
Command Line Interface. Source the RC file using ``source`` command to configure
environment variables that allow you to easily log in using the :ref:`Command
Line Interface <cli>`. For more information about *OpenStack RC* script, please
see :ref:`cli-rc-script`.

Sign Out
~~~~~~~~

Use the *sign out* menu item to sign out from your current site.

.. note::

   If you do not sign out manually, your session will expire in one hour.

.. _gui-api-access:

API Access
==========

The API Access page lists all the available REST APIs that are used for
configuring the :ref:`cli`. In addition, you may download :ref:`cli-rc-script`
scripts via this page.

.. note::

   Typically, the key generated from your computer will be at
   ``~/.ssh/id_rsa.pub``. On Mac OS X, you can run in a terminal: ``cat
   ~/.ssh/id_rsa.pub | pbcopy``. It copies the content of the public key to your
   copy/paste buffer. Then you can simply paste in the "Public Key" box.

.. figure:: gui/api_access.png
   :alt: The API Access page

   The API Access page

GUI Navigation
==============

The navigation sidebar on the left allows you to access different sections
of the interface. The main navigation elements are described below.

.. figure:: gui/sidebar.png
   :alt: The GUI sidebar


.. _gui-compute:

Compute
-------

The *Compute* section provides interfaces for managing instances, images, and SSH key pairs.

Overview
~~~~~~~~

The Overview page provides a graphical summary of your project's current resource usage.

.. figure:: gui/overview.png
   :alt: The Overview page

.. _gui-compute-instances:

Instances
~~~~~~~~~

The *Instances* page displays your running instances with options to launch, terminate, 
monitor, or reboot them. For detailed instructions on launching and managing instances, 
see :ref:`baremetal`.

.. figure:: gui/instances.png
   :alt: The Instances page

Images
~~~~~~

The *Images* page allows you to view available images and launch instances from them. 
You can only edit images you own. For comprehensive image management including uploading 
and sharing, see :ref:`images`.

.. figure:: gui/images.png
   :alt: The Images page

.. _gui-key-pairs:

Key Pairs
~~~~~~~~~

The *Key Pairs* page allows you to create, import and manage SSH key pairs for instance access.

.. figure:: gui/key_pairs.png
   :alt: The Key Pairs page

For detailed instructions on creating and importing key pairs, see the 
:ref:`baremetal instance launch guide <baremetal-gui-launch>`.

Network
-------

The *Network* section provides interfaces for managing virtual network resources. 
For comprehensive networking instructions, see :ref:`networking`.

Network Topology
~~~~~~~~~~~~~~~~

The *Network Topology* page displays your current virtual network topology in 
topology or graph formats.

.. figure:: gui/network_topology.png
   :alt: The Network Topology page

   The Network Topology page

Networks, Routers, and Floating IPs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The *Networks*, *Routers*, and *Floating IPs* pages allow you to create and manage 
these network resources for your project.

.. figure:: gui/networks.png
   :alt: The Networks page

.. attention::
   Chameleon bare metal sites (|CHI@TACC|, |CHI@UC|, |CHI@NCAR|) **do not** support
   security groups - all ports are open to the public.

For detailed networking procedures including floating IP management, see :ref:`networking`.

Orchestration
-------------

The *Orchestration* section provides interfaces for working with complex appliances 
and Heat templates. For comprehensive instructions, see :ref:`complex`.


Stacks
~~~~~~

A deployed complex appliance is referred to as a “stack” – just as a deployed
single appliance is typically referred to as an “instance”. The Stacks page
allows you to launch, rebuild, or terminate stacks.

.. figure:: gui/stacks.png
   :alt: The Stacks page

   The Stacks page



Object Store
------------

The *Containers* section provides access to Chameleon's object/blob storage. 
For detailed object store instructions, see :ref:`object-store`.

.. figure:: gui/containers.png
   :alt: The Containers page

   The Containers page

Reservations
------------

The *Reservations* section allows you to manage your resource leases. 
For comprehensive reservation instructions, see :ref:`reservations`.

.. figure:: gui/leases.png
   :alt: The Leases page

   The Leases page

Identity
--------

The *Projects* section under *Identity* shows projects you belong to and allows 
you to set your default project.

.. figure:: gui/projects.png
   :alt: The Projects page

   The Projects page
