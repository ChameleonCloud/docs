Persistent Storage via Volumes
==============================

KVM supports volumes, which allow you to attach persistent storage to your instances.
The storage on your instance is ephemeral, meaning that it will be lost when the instance is deleted.
Since instances are tied to a reservation, which expire, it may be useful to use volumes to store data that you want to keep beyond the lifetime of an instance.

Currently, |KVM@TACC| does not have an object store, but you can set up access to the |CHI@TACC| object store, which is located in the same data center.
See our :ref:`object-store` docs.

Managing Volumes via the GUI
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Creating/Editing/Deleting Volumes
---------------------------------

1. Login to `KVM@TACC <https://kvm.tacc.chameleoncloud.org/project/>`__ using your Chameleon account.

2. Navigate to the Volumes overview under "Volumes > Volumes" in the sidebar.
   Select "Create Volume" to create a new volume.
   Enter a name and a size in Gigabytes.
   Under type, select either "ceph-hdd" or "ceph-ssd."
   The storage type "ceph-ssd" is backed by a smaller set of nodes with SSD storage.
   This type of volume will be relatively performant (the same as your instance's root partition), but only a small portion of capacity is on the SSDs.
   The "ceph-hdd" type is backed by spinning disks, and you may experience slow performance doing random access.
   Click "Create Volume".

3. On the volume overview page, you can rename your volume via "Edit Volume".
   By selecting the action arrow, you can click "Extend Volume" to increase its size.
   By selecting "Change Volume Type" you can switch between "ceph-ssd" and "ceph-hdd".

4. To delete your volume, on the volume overview page you can select the action arrow click "Delete Volume".

Attach/Detach Volumes
---------------------

This guide assumes you have a running instance (see :ref:`kvm-launch-instance`).

After creating your volume, you can attach it to your instance by selecting the "Manage Attachments" action.
On the "Manage Volumes Attachments" dialog, pick your instance from the dropdown and confirm by clicking "Attach Volume".
On the Volume overview, you'll now see which device the volume will appear inside your instance.

In order to use the new block device, you'll need to parition, format, and mount it inside your instance.
These instructions may vary depending on your operating system, but for more information see these links on `how to partition <https://docs.digitalocean.com/products/volumes/how-to/partition/>`__ and `how to mount <https://docs.digitalocean.com/products/volumes/how-to/mount/>`__ block volumes.

In the future, you will not need to partition and format the volume, and can just mount it after attaching.

Managing volumes via Python-chi
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

See `this Trovi artifact <https://chameleoncloud.org/experiment/share/48c7e345-e27e-4717-9459-d0e19743622c>`_ for how to manage volumes via python-chi.