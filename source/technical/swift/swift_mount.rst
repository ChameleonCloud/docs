.. _cc-rclone:

Mounting Object Store as a File System
======================================

.. tip::
   rclone can upload small and large files to the object store, however,
   if you have trouble uploading larger objects, you may need to use the
   Swift CLI instead.

When logged into an instance using Chameleon-supported images, such as
`CC-CentOS9-Stream <https://www.chameleoncloud.org/appliances/112/>`_ and
`CC-Ubuntu24.04 <https://www.chameleoncloud.org/appliances/122/>`_, you will
find a README in the home directory for the `cc` user. The README describes
how to mount containers in the Chameleon Object Store into a directory
called ``cc_my_mounting_point`` in your home directory. Mounts are facilitated
by the `rclone <https://rclone.org/>`_ tool. If the directory does not exist,
this directory will be created the first time you mount a container.
Inside the ``cc_my_mounting_point`` directory, you will find directories
that map to containers you've mounted. If there is a directory inside
``cc_my_mounting_point`` that is not mounted it should have a file named
``THIS_IS_NOT_MOUNTED`` in it. Once you mount the container, the file
will no longer be visible until the container is unmounted.

The tool can mount existing containers in the object store, or create them
if they don't exist. The containers are from the specific site where the
instance is located and only work at sites that have an object store
(currently ``CHI@UC`` and ``CHI@TACC``). For example, instances running at
``CHI@UC`` will interact with the object store also at ``CHI@UC``. You will
not be able to interact with object store data at other sites using this
method.

.. important::

   Some older Chameleon-supported images have an outdated mechanism for mounting
   the object store using ``cc-cloudfuse``. This mechanism for mounting
   the object store is no longer recommended or supported. On older images
   you should use the Swift CLI directory to use the object store.

To mount, use the following command:

.. code-block:: bash

   cc-mount-object-store start your_container_name

Now you can access your Chameleon Object Store as your local file system at:
`~/cc_my_mounting_point/your_container_name`.

You can investigate if a mount is running for a container with:

.. code-block:: bash

   cc-mount-object-store status your_container_name

You can also list all running mounts with:

.. code-block:: bash

   cc-mount-object-store list

To unmount, use the following command:

.. code-block:: bash

   cc-mount-object-store stop your_container_name

.. important::
   **Limitations**

   The primary usage scenario of the ``rclone`` tool is to allow you to
   interact with Chameleon Object Store using familiar file system operations.
   Because the tool runs on top of an object store, it is important
   to understand that not all functionality will behave identically to a regular
   file system.

   #. Symbolic links, file permissions, and POSIX file locking operations are
      not supported.

   #. Updating an existing file is an expensive operation as it downloads the
      entire file to local disk before it can modify the contents.

   #. You can mount from multiple nodes, but there is no synchronization
      between nodes regarding writes to Object Storage.

   #. The mounting root directory can only contain directories, as they are
      mapped to Object Store containers.

   #. Renaming directories is not allowed.

   #. It keeps an in-memory cache of the directory structure, so it may not be
      usable for large file systems. In addition, files added by other
      applications will not show up until the cache expires.

   Keep these limitations in mind when considering the use of this tool
   to interact with the object store.

.. warning::
   The use of ``rclone`` to sync files between your instance
   and the object store is a best effort tool. It is the responsibilty
   of the user to verify the files sync'd correctly and are valid.

   Given the challenges of mapping files in a file system to an object
   store over a network, numerous problems can occur that may impact
   the availability of files on the object store. If you attempt
   to copy files into the mount point and receive errors, it is
   important that you verify the existence and contents of the file
   in the object store and not simply assume the file has been
   persisted there (even if it is present in the mount point).