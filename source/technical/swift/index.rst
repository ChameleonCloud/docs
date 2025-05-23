.. _object-store:

============
Object Store
============

Chameleon provides an object store service through the `OpenStack Swift
<https://docs.openstack.org/swift/latest/>`_ interface. It is intended to be
used for storing and retrieving data used during experiments, such as input
files needed for your applications, or results produced by your experiments.

.. hint::
   Chameleon object store service is currently backed by a `Ceph
   <https://ceph.com/>`_ cluster with more than 2.1 PB of capacity. The data is
   replicated, keeping two copies of each object, effectively providing over 1
   PB of storage available to users. This storage capacity will increase as the
   project goes on. The replication should provide good availability in case of
   hardware failures. However, all copies are kept within the same data center
   and are not backed up on a separate system; if you feel that this does not
   provide sufficient reliability in your case, you should consider backing up
   really critical data externally.

Availability
============

You can access the *Object Store* from instances running on |CHI@TACC| and
|CHI@UC|. Each region has its own store, meaning that objects uploaded to one
are not visible to the other. In general you should use the store local to the
region where your instances are running for the best performance.  To make it
easier for you to use the *Object Store* client, we installed it in all
appliances supported by Chameleon. Additionally, you can also access the *Object
Store* from the |CHI@TACC| or |CHI@UC| GUIs under the *Object Store*
panel.

.. hint::
   `KVM\@TACC <https://kvm.tacc.chameleoncloud.org>`_ users can access the TACC
   store by using their |CHI@TACC| :ref:`OpenStack RC file <cli-rc-script>`.

Objects and Containers
======================

*Objects* are equivalent to individual files. They are stored in *Containers*,
which are data structures that can contain multiple *Objects*. When uploading
*Objects*, they must be stored inside of *Containers*. You may perform
operations on individual *Objects* inside Containers, such as downloading or
deleting them. You may also work with entire *Containers* and perform operations
such as downloading an entire *Container*.

.. toctree::
   :maxdepth: 2
   :caption: Object Store Topics

   swift_gui
   swift_cli
   swift_mount