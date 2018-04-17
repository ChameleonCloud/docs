===========================
Object Store
===========================

____________
Introduction
____________

Chameleon provides an object store service through the OpenStack Swift interface. It is intended to be used for storing and retrieving data used during experiments, such as input files needed for your applications, or results produced by your experiments. The object store can be accessed from `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ and `CHI@UC <https://chi.uc.chameleoncloud.org>`_ using the CLI. In addition, the object store CLI is installed on all Appliances supported by Chameleon.

Availability
____________

You can access the Object Store from instances running on `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_, `CHI@UC <https://chi.uc.chameleoncloud.org>`_ and `KVM@TACC <https://openstack.tacc.chameleoncloud.org>`_ by using your `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ OpenStack RC file (UC users will see more latency impact since the Object Store is located at TACC). To make it easier for you to use the Object Store client, we installed it in all appliances supported by Chameleon. Additionally, you can also access the Object Store from the `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ web interface under the Object Store panel.

Objects and Containers
______________________

*Objects* are equivalent to individual files. They are stored in *Containers*, which are data structures that can contain multiple Objects. They are analogous to folders in file systems, and may contain subfolders. When uploading Objects, they must be stored inside of Containers. You may perform operations on individual Objects inside Containers, such as downloading or deleting them. You may also work with entire Containers and perform operations such as downloading an entire Container.

__________________________________
Working with Objects using the GUI
__________________________________

.. note:: The Object Store is implemented at TACC. Only `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ implements a GUI interface for the Object Store. However, the CLI works for both CHI@TACC and `CHI@UC <https://chi.uc.chameleoncloud.org>`_.

To access the Object Store using the GUI for `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_, use the navigation sidebar to go to *Project* > *Object Store* > *Containers*.

.. figure:: swift/containerspage.png
   :alt: The Containers page

   The Containers page

Creating a Container
____________________

To create a container, click the *+Container* button. This will open the *Create Container* dialog.

.. figure:: swift/createcontainer.png
   :alt: The Create Container dialog

   The Create Container dialog

Choose a unique name on the Container and set the visibility to either *Public* or *Not Public*. When you are finished, click the *Submit* button. You will see your new Container appear in the list on the *Containers* page.

.. figure:: swift/containerlist.png
   :alt: The Container list

   The Container list

You may click on a Container to see details of the Container and work with Objects inside it.

.. figure:: swift/containerdetail.png
   :alt: Container details

   Container details

Downloading a Container
_______________________

It is not possible to download a Container from the GUI. You must use the CLI to download a Container.

Deleting a Container
____________________

You may delete a Container by clicking the *Delete* icon in the upper right of the *Container Detail Pane*. 

.. figure:: swift/containerdelete.png
   :alt: The Delete Container button

   The Delete Container button

Uploading Objects
_________________

To upload a local file to a Container, click the button with the *Upload* symbol next to the Search bar.

.. figure:: swift/uploadobject.png
   :alt: The Upload button

   The Upload button

This will open the *Upload File To* dialog.

.. figure:: swift/uploaddialog.png
   :alt: The Upload File dialog

   The Upload File dialog

You may browse for a file on your local machine. You may specify a *File Name* with the "/" delimiter to place the Object within a subfolder of the Container. For example, specifying a File Name of ``MyFolder/MySubfolder/MyObject`` will upload your Object to the ``MyFolder/MySubfolder`` path within the Container.

Creating a Folder
_________________

If you wish to create a Folder within your Container, click the *+Folder* button and specify a Folder name in the *Create Folder In* dialog that appears.

.. figure:: swift/createfolder.png
   :alt: The Create Folder dialog

   The Create Folder dialog

Your new Folder will appear in the Container details.

.. figure:: swift/containerwithfolder.png
   :alt: A Container with a Folder

   A Container with a Folder

You may browse this Folder by clicking on it.

.. figure:: swift/containerfolder.png
   :alt: A Folder within the Container

   A Folder within the Container

If you click the *Upload* button, new Objects will be sent to the Folder you are browsing.

__________________________________
Working with Objects using the CLI
__________________________________

To work with the Object Store using the CLI, you must make sure that you have the ``python-swiftclient`` package. You may install it using:

.. code-block:: bash

   pip install python-swiftclient

In addition, you must set environment variables for your account and project using :ref:`cli-rc-script`.

Creating a Container
____________________

You may create a Container using the CLI by using the command:

.. code-block:: bash

   openstack container create <container_name>

By default, this Container will not be visible to the public. You may retrieve a list of your Containers by using the command:

.. code-block:: bash

   openstack container list 

You may optionally specify a ``--prefix <prefix>`` if you wish to filter for Containers with names beginning with the specified ``<prefix>``. To see details of a Container, use the command:

.. code-block:: bash

   openstack container show <container_name>

To view a list of Objects within a Container, use the command:

.. code-block:: bash

   openstack object list <container_name>

Downloading a Container
_______________________

You may download a Container in its entirety using the following command:

.. code-block:: bash

   openstack container save <container_name>

Deleting a Container
____________________

You may delete a Container in its entirety using the following command:

.. code-block:: bash

   openstack container delete <container_name>

Uploading Objects
_________________

You may upload a file from your local machine to a Container using the following command:

.. code-block:: bash

   openstack object create <container_name> <local_filename>

Optionally, you may specify an Object name that differs from the filename by adding the ``--name <object_name>`` parameter. You may also delete objects from a Container using the command:

.. code-block:: bash

   openstack object delete <container_name> <object_name>

If you wish to download an individual Object directly from a container, use the command:

.. code-block:: bash

   openstack object save <container_name> <object_name>

Creating a Folder
_________________

There is no CLI command for creating a Folder within a Container. However, you may specify Object names with the "/" delimiter to implicitly create Folders. For example, you may use the command:

.. code-block:: bash

   openstack object create --name "MyFolder/MyObject.txt" MyContainer MyObject.txt

__________________________________
Mounting Object Store as a File System
__________________________________

When logged into an instance using Chameleon supported images, such as ``CC-CentOS7`` and ``CC-Ubuntu16.04``, you may use the pre-installed ``cloudfuse`` (Source: `Github <https://github.com/redbo/cloudfuse>`_) to mount your Chameleon Object Store as a directory on your Linux environment.

Before mount, create a ``~/.cloudfuse`` file with the following content:

.. code-block:: bash

   username=<username>
   password=<password>
   tenant=<projectname>
   authurl=https://chi.tacc.chameleoncloud.org:5000/v2.0
   
Replace ``username`` and ``password`` with your Chameleon username and password, and replace ``projectname`` with your Chameleon project name.

Then mount with the following command:

.. code-block:: bash

   cloudfuse <mount_dir>
   
Or you can specify your username and password as mount options:

.. code-block:: bash

   cloudfuse -o username=<username>,password=<password> <mount_dir>
   
Now you can access your Chameleon Object Store as your local file system.

To unmount:

.. code-block:: bash

   fusermount -u <mount_dir>

