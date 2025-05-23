.. _mount-share:

Mounting Shares to Instances
=============================

In order to allow your instances to access the share, you need to create your instances using the :ref:`pre-reserved storage network <storage_network>`.
To learn more about how to create a bare metal instance on a network, read :ref:`the bare metal instances section <baremetal-gui-launch>`. 

.. important::

  The shares are independent of the storage networks. You can create shares any time regardless of the status of the storage networks.
  The storage networks are only used to access your data stored in the share.

After your instance becomes active, find the export location path of the share using :ref:`GUI <view-share-gui>` or :ref:`CLI <view-share-cli>`.
To mount the share, run the following command:

.. code-block:: bash

  sudo mount -t nfs -o nfsvers=4.2,proto=tcp <export location path> <mount dir>

Now, you can read and write to the share and it behaves identically to a regular file system.

To unmount, run the following command:

.. code-block:: bash

  sudo umount <mount dir>