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

.. tip:: Reading :doc:`cli` is highly recommanded before continuing on the following sections.

In addition to :ref:`cli-installing`, you must also install ``python-swiftclient`` package:

.. code-block:: bash

   pip install python-swiftclient

Then, you must set environment variables for your account and project using :ref:`cli-rc-script`.

Working with Containers
_________________________

To create a *Container*, use the following command:

.. code-block:: bash

   openstack container create <container_name>

.. tip:: By default, the *Container* created using the above command will not be visible to the public.

To view all containers that belong to your project, run:

.. code-block:: bash

   openstack container list

.. tip:: You may use ``--prefix <prefix>`` as a filter to list the containers whose name starts with ``<prefix>``.

To see details of a container, use the command:

.. code-block:: bash

   openstack container show <container_name>

To view a list of objects within a container, use the command:

.. code-block:: bash

   openstack object list <container_name>

To download a container with all the objects belong to it, use the following command:

.. code-block:: bash

   openstack container save <container_name>

To delete a container and wipe out all the objects belong to it, use the following command:

.. code-block:: bash

   openstack container delete <container_name>

Working with Objects
______________________

You may upload a file from your local machine to a container using the following command:

.. code-block:: bash

   openstack object create <container_name> <local_filename>

.. tip:: Optionally, you may name the object differently from it's original name in your local machine by using the ``--name <object_name>`` parameter.

To delete an object from a container, run:

.. code-block:: bash

   openstack object delete <container_name> <object_name>

If you wish to download an individual object directly from a container, use the command:

.. code-block:: bash

   openstack object save <container_name> <object_name>

Working with Folders
_______________________

There isn't "folders" when you managing the *Object Store* with the CLI. However, when you create an object, you may use the delimiter ``/`` to specify the path.

________________________________________
Mounting Object Store as a File System
________________________________________

When logged into an instance using Chameleon supported images, such as ``CC-CentOS7`` and ``CC-Ubuntu16.04``, you may use the pre-installed ``cloudfuse`` (Source: `Github <https://github.com/redbo/cloudfuse>`_) to mount your Chameleon Object Store as a directory on your Linux environment.

Before mount, create a ``~/.cloudfuse`` file with the following content:

.. code-block:: bash

   username=<username>
   password=<password>
   tenant=<projectname>
   region=<regionname> # CHI@TACC or CHI@UC
   authurl=https://chi.tacc.chameleoncloud.org:5000/v2.0

Replace ``username`` and ``password`` with your Chameleon username and password; replace ``projectname`` with your Chameleon project name; and replace ``regionname`` with the regional endpoint to use. 

Then mount with the following command:

.. code-block:: bash

   cloudfuse <mount_dir>

Or you can specify ``username``, ``password``, ``tenant``, ``region`` or ``authurl`` as mount options:

.. code-block:: bash

   cloudfuse -o username=<username>,password=<password> <mount_dir>

Now you can access your Chameleon Object Store as your local file system.

To unmount:

.. code-block:: bash

   fusermount -u <mount_dir>
