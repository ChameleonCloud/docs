.. _gui:

===============================
Graphical User Interface (GUI)
===============================

The Graphical User Interface (GUI) provides a point-and-click experience for
working with Chameleon resources. From the GUI, you may perform tasks such as
manage and launch instances, and configure custom networking. Additionally, you
may download an *OpenStack RC* file from the GUI if you wish to work with the
:ref:`Command Line Interface <cli>`, instead. The Chameleon GUI is built on top
of `OpenStack Horizon <https://docs.openstack.org/horizon/latest/>`_ (running OpenStack Antelope). Chameleon 
has multiple resource sites, each with its own URL (though it is possible to
easily switch from one to other, see :ref:`gui-project-menu`).

- |CHI@TACC| - Texas Advanced Computing Center: https://chi.tacc.chameleoncloud.org
- |CHI@UC| - University of Chicago: https://chi.uc.chameleoncloud.org  
- |CHI@NCAR| - National Center for Atmospheric Research: https://chi.ncar.chameleoncloud.org
- |CHI@Edge| - Edge computing testbed: https://chi.edge.chameleoncloud.org

Chameleon also hosts |KVM@TACC|, a traditional OpenStack cloud where you may work with
virtual machines. This site **does not** have access to bare metal resources. It
is available at: https://kvm.tacc.chameleoncloud.org.

This section provides an overview of GUI interface navigation and basic functionality.
For detailed instructions on using specific Chameleon features, see the dedicated
documentation sections: :ref:`baremetal`, :ref:`networking`, :ref:`reservations`,
:ref:`images`, :ref:`object-store`, and :ref:`complex`.

You may login to either site using your Chameleon portal username and password.

.. _bare-metal-sites-independent:
.. attention::

   Each Chameleon testbed site---|CHI@TACC|, |CHI@UC|, |CHI@NCAR|, |CHI@Edge|, and |KVM@TACC|---is
   **independent**, so snapshots, keypairs, Swift containers, and other objects
   are unique to each site. For example, a keypair created at the |CHI@TACC|
   site is **not** available at the |CHI@UC| site. In addition, the bare metal
   resource types vary between sites.

.. toctree::
   :maxdepth: 1
   :caption: GUI Topics

   features
   api_access
   navigation