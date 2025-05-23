.. _shares:

====================
Shares
====================

Chameleon provides a shared file system service through the `OpenStack Manila <https://docs.openstack.org/manila/latest/>`_ interface.
With the service, you can create a shared file system, mount to the bare metal instances, and manage some of its properties, such as visibility.

.. hint::

  Chameleon shared file system service is currently backed by a CephFS. Same as our :ref:`object store <object-store>` service, the data is
  replicated and the replication should provide good availability in case of hardware failures.

  *Difference between shared file system and object store*
	You can choose either shared file system or object store to store, manage, and share your data with your collaborators. The object store
	is suitable for storing large objects at scale, but isn't suitable for transactional data, as objects are immutable and updated in their
	entirety. Chameleon shared file system instead provides a NFS mount to the bare metal instances, with the NFS protocol managing locking
	and data integrity processes required to provide multiple concurrent access to data. 

The shared file system service is available at `CHI@UC <https://chi.uc.chameleoncloud.org/>`_ and `CHI@TACC <https://chi.tacc.chameleoncloud.org/>`_.
Each region has its own service and the shares created at one region are not available to the other. As all other Chameleon services, you can create
and manage your shares using both GUI and CLI.

.. toctree::
   :maxdepth: 1
   :caption: Shares Topics

   concepts
   gui_management
   cli_management
   mounting