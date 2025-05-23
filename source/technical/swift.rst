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

Managing Object Store using the GUI
===================================

To access the *Object Store* using the GUI at |CHI@TACC| or |CHI@UC|, use the
navigation sidebar to go to *Project* > *Object Store* > *Containers*.

.. figure:: swift/containerspage.png
   :alt: The Containers page
   :figclass: screenshot

   The Containers page

Working with Containers
-----------------------

To create a container, click the *+Container* button. This will open the *Create
Container* dialog.

.. figure:: swift/createcontainer.png
   :alt: The Create Container dialog
   :figclass: screenshot

   The Create Container dialog

Choose a unique name of your container and set the visibility to either *Public*
or *Not Public*. When you are finished, click the *Submit* button. You will see
your new *Container* appear in the list on the *Containers* page.

.. figure:: swift/containerlist.png
   :alt: The Container list
   :figclass: screenshot

   The Container list

You may click on a *Container* to see the details and work with *Objects* belong
to it.

.. figure:: swift/containerdetail.png
   :alt: Container details
   :figclass: screenshot

   Container details

.. attention::
   Downloading a container is not available from the GUI. Use the CLI to
   download containers.

You may delete a container by clicking the *Delete* icon in the upper right of
the *Container Detail Panel*.

.. figure:: swift/containerdelete.png
   :alt: The Delete Container button
   :figclass: screenshot

   The Delete Container button

Working with Objects
--------------------

To upload a local file to a container, click the button with the *Upload* symbol
next to the search bar.

.. figure:: swift/uploadobject.png
   :alt: The Upload button
   :figclass: screenshot

   The Upload button

This will open the *Upload File* dialog.

.. figure:: swift/uploaddialog.png
   :alt: The Upload File dialog
   :figclass: screenshot

   The Upload File dialog

Choose a file to upload from your local file system and give a name to the
object.

Working with Folders
--------------------

If you wish to create a *Folder* within your *Container*, click the *+Folder*
button and give a name to your folder in the *Create Folder* dialog.

.. figure:: swift/createfolder.png
   :alt: The Create Folder dialog
   :figclass: screenshot

   The Create Folder dialog

Your new folder will appear in the *Container details*.

.. figure:: swift/containerwithfolder.png
   :alt: A Container with a Folder
   :figclass: screenshot

   A Container with a Folder

You may browse your folder and upload files to it by clicking on the folder.

.. figure:: swift/containerfolder.png
   :alt: A Folder within the Container
   :figclass: screenshot

   A Folder within the Container

.. _object-store-cli:

Managing Object Store using the CLI
====================================

.. tip::
   Reading :ref:`cli` is highly recommended before continuing on the following
   sections.

In addition to :ref:`cli-installing`, you must also install
``python-swiftclient`` package:

.. code-block:: bash

   pip install python-swiftclient

Then, you must set environment variables for your account and project using
:ref:`cli-rc-script`.

Working with Containers
-----------------------

To create a *Container*, use the following command:

.. code-block:: bash

   openstack container create <container_name>

.. tip::
   By default, the *Container* created using the above command will not be
   visible to the public.

To view all containers that belong to your project, run:

.. code-block:: bash

   openstack container list

.. tip::
   You may use ``--prefix <prefix>`` as a filter to list the containers whose
   name starts with ``<prefix>``.

To see details of a container, use the command:

.. code-block:: bash

   openstack container show <container_name>

To view a list of objects within a container, use the command:

.. code-block:: bash

   openstack object list <container_name>

To download a container with all the objects belong to it, use the following
command:

.. code-block:: bash

   openstack container save <container_name>

To delete a container and wipe out all the objects belong to it, use the
following command, and **be careful**!

.. code-block:: bash

   openstack container delete --recursive <container_name>

Working with Objects
--------------------

You may upload a file from your local machine to a container using the following
command:

.. code-block:: bash

   openstack object create <container_name> <local_filename>

.. tip::
   Optionally, you may name the object differently from it's original name in
   your local machine by using the ``--name`` parameter.

To delete an object from a container, run:

.. code-block:: bash

   openstack object delete <container_name> <object_name>

If you wish to download an individual object directly from a container, use the
command:

.. code-block:: bash

   openstack object save <container_name> <object_name>

Large object support
^^^^^^^^^^^^^^^^^^^^

The Swift CLI only supports objects up to 4GB. Larger objects are supported,
provided they are uploaded in segments. This advanced functionality is only
supported using a separate Swift interface. For a version compatible with
Chameleon's authentication, you need `python-swiftclient >= 3.11.1`, and
to generate and use an :ref:`Application Credential <cli-application-credential>`

.. code-block:: bash

   pip install "python-swiftclient>=3.11.1"

Instead of invoking commands via ``openstack``, you will instead use the
``swift`` command, which supports a ``--segment-size`` parameter, specifying
the segment size in bits. ``--segment-size 4831838208`` is close to the segment
limit of 4GB.

There is also a ``--changed`` flag, which prevents uploading of the object if
the checksum has not changed:

.. code-block:: bash

   swift --os-auth-type v3applicationcredential \
   --os-application-credential-id <credential_id> \
   --os-application-credential-secret <credential_secret> \
   upload --changed --segment-size 4831838208 \
   <container_name> <path>

Working with Folders
--------------------

There isn't "folders" when you managing the *Object Store* with the CLI.
However, when you create an object, you may use the delimiter ``/`` to specify
the path.

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
