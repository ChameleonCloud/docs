.. _object-store:

===========================
Object Store
===========================
____________
Introduction
____________

Chameleon provides an object store service through the `OpenStack Swift <https://docs.openstack.org/swift/latest/>`_ interface. It is intended to be used for storing and retrieving data used during experiments, such as input files needed for your applications, or results produced by your experiments.

.. hint::
   Chameleon object store service is currently backed by a `Ceph <https://ceph.com/>`_ cluster with more than 2.1 PB of capacity. The data is replicated, keeping two copies of each object, effectively providing over 1 PB of storage available to users. This storage capacity will increase as the project goes on. The replication should provide good availability in case of hardware failures. However, all copies are kept within the same data center and are not backed up on a separate system; if you feel that this does not provide sufficient reliability in your case, you should consider backing up really critical data externally.

Availability
____________

You can access the *Object Store* from instances running on `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ and `CHI@UC <https://chi.uc.chameleoncloud.org>`_. Each region has its own store, meaning that objects uploaded to one are not visible to the other. In general you should use the store local to the region where your instances are running for the best performance.  To make it easier for you to use the *Object Store* client, we installed it in all appliances supported by Chameleon. Additionally, you can also access the *Object Store* from the `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ or `CHI@UC <https://chi.uc.chameleoncloud.org>`_ web interfaces under the *Object Store* panel.

.. hint::
    `KVM@TACC <https://openstack.tacc.chameleoncloud.org>`_ users can access the TACC store by using their `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ :ref:`OpenStack RC file <cli-rc-script>`.

Objects and Containers
______________________

*Objects* are equivalent to individual files. They are stored in *Containers*, which are data structures that can contain multiple *Objects*. When uploading *Objects*, they must be stored inside of *Containers*. You may perform operations on individual *Objects* inside Containers, such as downloading or deleting them. You may also work with entire *Containers* and perform operations such as downloading an entire *Container*.

_____________________________________
Managing Object Store using the GUI
_____________________________________

.. note:: The Object Store is implemented at TACC. Therefore, only `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ implements a GUI interface for the *Object Store*. However, the CLI works for both `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ and `CHI@UC <https://chi.uc.chameleoncloud.org>`_.

To access the *Object Store* using the GUI at `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_, use the navigation sidebar to go to *Project* > *Object Store* > *Containers*.

.. figure:: swift/containerspage.png
   :alt: The Containers page

   The Containers page

Working with Containers
_________________________

To create a container, click the *+Container* button. This will open the *Create Container* dialog.

.. figure:: swift/createcontainer.png
   :alt: The Create Container dialog

   The Create Container dialog

Choose a unique name of your container and set the visibility to either *Public* or *Not Public*. When you are finished, click the *Submit* button. You will see your new *Container* appear in the list on the *Containers* page.

.. figure:: swift/containerlist.png
   :alt: The Container list

   The Container list

You may click on a *Container* to see the details and work with *Objects* belong to it.

.. figure:: swift/containerdetail.png
   :alt: Container details

   Container details

.. attention:: Downloading a container is not available from the GUI. Use the CLI to download containers.

You may delete a container by clicking the *Delete* icon in the upper right of the *Container Detail Panel*.

.. figure:: swift/containerdelete.png
   :alt: The Delete Container button

   The Delete Container button

Working with Objects
_____________________

To upload a local file to a container, click the button with the *Upload* symbol next to the search bar.

.. figure:: swift/uploadobject.png
   :alt: The Upload button

   The Upload button

This will open the *Upload File* dialog.

.. figure:: swift/uploaddialog.png
   :alt: The Upload File dialog

   The Upload File dialog

Choose a file to upload from your local file system and give a name to the object.

Working with Folders
_____________________

If you wish to create a *Folder* within your *Container*, click the *+Folder* button and give a name to your folder in the *Create Folder* dialog.

.. figure:: swift/createfolder.png
   :alt: The Create Folder dialog

   The Create Folder dialog

Your new folder will appear in the *Container details*.

.. figure:: swift/containerwithfolder.png
   :alt: A Container with a Folder

   A Container with a Folder

You may browse your folder and upload files to it by clicking on the folder.

.. figure:: swift/containerfolder.png
   :alt: A Folder within the Container

   A Folder within the Container

_____________________________________
Managing Object Store using the CLI
_____________________________________

.. tip:: Reading :ref:`cli` is highly recommanded before continuing on the following sections.

In addition to :ref:`cli-installing`, you must also install ``python-swiftclient`` package:

.. code-block:: bash

   pip install python-swiftclient

Then, you must set environment variables for your account and project using :ref:`cli-rc-script`.

Working with Containers
_________________________

To create a *Container*, use the following command:

.. code-block:: bash

   swift post <container_name>

.. tip:: By default, the *Container* created using the above command will not be visible to the public.

To view all containers that belong to your project, run:

.. code-block:: bash

   swift list

.. tip:: You may use ``--prefix <prefix>`` as a filter to list the containers whose name starts with ``<prefix>``.

To see details of a container, use the command:

.. code-block:: bash

   swift stat <container_name>

To view a list of objects within a container, use the command:

.. code-block:: bash

   swift list <container_name>

To download a container with all the objects belong to it, use the following command:

.. code-block:: bash

   swift download <container_name>

To delete a container and wipe out all the objects belong to it, use the following command:

.. code-block:: bash

   swift delete <container_name>

Working with Objects
______________________

.. tip:: swift can upload objects up to 4GB. Larger objects must be broken into segments no larger than this with the --segment-size option indicating size in bits. ``--segment-size 4831838208`` is close to 4GB and not above this limit. 

You may upload a file from your local machine to a container using the following command:

.. code-block:: bash

   swift upload <container_name> <local_filename>

.. tip:: Optionally, you may name the object differently from it's original name in your local machine by using the ``--object-name <object_name>`` parameter.

To delete an object from a container, run:

.. code-block:: bash

   swift delete <container_name> <object_name>

If you wish to download an individual object directly from a container, use the command:

.. code-block:: bash

   swift download <container_name> <object_name> 

Working with Folders
_______________________

There isn't "folders" when you managing the *Object Store* with the CLI. However, when you create an object, you may use the delimiter ``/`` to specify the path.

________________________________________
Mounting Object Store as a File System
________________________________________

.. tip:: Cloudfuse can upload objects up to 4GB. For larger objects, please use the Swift CLI.

When logged into an instance using Chameleon-supported images, such as `CC-CentOS8 <https://www.chameleoncloud.org/appliances/83/>`_ and `CC-Ubuntu18.04 <https://www.chameleoncloud.org/appliances/69/>`_,
you will see a directory called ``my_mounting_point`` which is a pre-mounted directory to your Chameleon Object Store at the same site of your instance. Each Object Store container that you have access to will appear as a subdirectory inside this mount.

You can also switch to a different site using the ``cc-cloudfuse`` tool.

The ``cc-cloudfuse`` tool (Source: `ChameleonCloud/cc-cloudfuse <https://github.com/ChameleonCloud/cc-cloudfuse>`_) is pre-installed in Chameleon-supported images. 
It is based on the ``cloudfuse`` tool (Source: `redbo/cloudfuse <https://github.com/redbo/cloudfuse>`_), which is used to mount your Chameleon Object Store as a directory on your Linux environment.

Before mounting, you need to configure your Chameleon credentials.
There are three ways of configuration.

1. Source your :ref:`Chameleon RC file <cli-rc-script>`. 
2. Create a ``~/.cloudfuse`` file with the following content:
  
  .. code-block:: bash

     # using keystone v2
     username=<username>
     password=<password>
     tenant=<project name>
     region=<region name> # CHI@TACC or CHI@UC
     authurl=https://chi.<uc/tacc>.chameleoncloud.org:5000/v2.0
   
     # using keystone v3
     username=<username>
     password=<password>
     projectid=<project id>
     region=<region name> # CHI@TACC or CHI@UC
     authurl=https://chi.<uc/tacc>.chameleoncloud.org:5000/v3

3. Pass Chameleon credentials as command line options (see below)

To mount, use the following command:

.. code-block:: bash

   cc-cloudfuse mount <mount_dir>

If you don't use :ref:`Chameleon RC file <cli-rc-script>` or ``~/.cloudfuse`` file, you can pass your Chameleon credentials as command line options:

.. code-block:: bash

   # using keystone v2
   cc-cloudfuse mount <mount_dir> -o username=<username>,password=<password>,tenant=<project name>,region=<region name>,authurl=<auth url v2.0>
   
   # using keystone v3
   cc-cloudfuse mount <mount_dir> -o username=<username>,password=<password>,projectid=<project id>,region=<region name>,authurl=<auth url v3>

Now you can access your Chameleon Object Store as your local file system.

To unmount, use the following command:

.. code-block:: bash

   cc-cloudfuse unmount <mount_dir>
   
.. Important::
   **Limitations**
   
   The primary usage scenario of the ``cc-cloudfuse`` tool is to allow you to interact with Chameleon Object Store using familiar file system operations. 
   Because the ``cc-cloudfuse`` runs on top of an object store, it is important to understand that not all functionality will behave identically to a regular file system. 
   
   #. Symbolic links, file permissions, and POSIX file locking operations are not supported.
   #. Updating an existing file is an expensive operation as it downloads the entire file to local disk before it can modify the contents.
   #. You can mount from multiple nodes, but there is no synchronization between nodes regarding writes to Object Storage.
   #. The mounting root directory can only contain directories, as they are mapped to Object Store containers.
   #. Renaming directories is not allowed. 
   #. It keeps an in-memory cache of the directory structure, so it may not be usable for large file systems. In addition, files added by other applications will not show up until the cache expires.
   #. The maximum number of listings is 10,000 items.
   
   Please keep these limitations in mind when evaluating ``cc-cloudfuse``.
   
.. note::   
   You may experience persistence issues when using ``cc-cloudfuse``, especially when writing large files or writing many files at the same time. Unmounting and re-mounting usually resolves this.
