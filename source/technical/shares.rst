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
	is suitable for storing large objects at scale, but isn’t suitable for transactional data, as objects are immutable and updated in their
	entirety. Chameleon shared file system instead provides a NFS mount to the bare metal instances, with the NFS protocol managing locking
	and data integrity processes required to provide multiple concurrent access to data. 

The shared file system service is available at `CHI@UC <https://chi.uc.chameleoncloud.org/>`_ and `CHI@TACC <https://chi.tacc.chameleoncloud.org/>`_.
Each region has its own service and the shares created at one region are not available to the other. As all other Chameleon services, you can create
and manage your shares using both GUI and CLI.

.. _storage_network:

Storage Networks
================================

To provide isolation among shares created by different projects, accessing a share requires a storage network, which are special networks you can
reserve to use. When reserving a storage network, add `usage_type=storage` to the resource properties. To learn more about reserving networks, read
the :ref:`reservations documentation <reservations>`. All bare metal instances that are created on the storage network have access to all the project
shares.

  .. tip::
  
    To attach floating IP to your instance created on a storage network, you need to create a router with `public` external network. Then connect
    the storage subnet to the router. You must specify an unused IP address which belongs to the selected subnet. To learn more about creating
    router and connecting subnet, please read :ref:`isolated network VLANs <network-isolation>`.

Shares
================================

Visibility
--------------------------------

Shares are owned by the project. By default, all shares have `private` visibility and can only be listed and accessed within your project.
All bare metal instances owned by the project have read and write permissions to the project’s shares. You can also make your shares `public`.
All Chameleon users and projects can list public shares, and with a storage network, all projects have read-only access to a public share.

Accessibility
--------------------------------

A share is a pre-allocated storage space at a CephFS. You can :ref:`mount your shares to your bare metal instances via NFS protocol <mount-share>`.
The accessibility of the shares are controlled internally by the reservation service. You are not allowed to edit the access rules of a share.

Quotas
--------------------------------

We do not charge SUs for the storage spaces of your shares. However, we do limit the total size and the number of shares you can create within
your project. The maximum number of shares is 10 and the maximum size allowed for all shares in a project is 2000 GiB. If you need to increase
the default quota, please submit a ticket via the `Help Desk <https://chameleoncloud.org/user/help/>`_.

Managing Shares using GUI
================================

To manage your share, use the `Shares` page at `CHI@UC <https://chi.uc.chameleoncloud.org/>`_ or `CHI@TACC <https://chi.tacc.chameleoncloud.org/>`_
by navigating to `Project > Share > Shares`.

  .. figure:: shares/sharespage.png
      :alt: The Shares page

      The Shares page

Create Share
--------------------------------

Click the `Create Share` button. In the `Create Share` dialog, provide a name and the size of your share, and then click the `Create` button to
create a share.

  .. figure:: shares/createshare.png
      :alt: The Create Share dialog

      The Create Share dialog

  .. note::
  
    A storage network is not required for creating shares. It’s only required to access the shares.

.. _view-share-gui:

View Share
--------------------------------

You can look at the details of a share by clicking the share name in the `Shares` page. Note that the paths of the `export locations` are important
as you will use this path to mount your share to your bare metal instances. You can also see the other properties, such as visibility and size.
The access rules are listed in the `share details` page, though you can not edit the rules, as they are controlled by the reservation service.

  .. figure:: shares/sharedetails.png
      :alt: The Share details

      The Share details
      
Edit Share
--------------------------------
You can manage the properties and extend the size of a share by clicking the `Action` dropdown in the `Shares` page. 

  .. figure:: shares/manageshare.png
      :alt: The Action dropdown

      The Action dropdown

Delete Share
--------------------------------
You can use the `Action` dropdown to delete a single share, or select multiple shares and click the `Delete Shares` button. 

  .. important::
  
    Be careful when deleting shares, as the action is irreversible. However, the termination of your storage network reservation **DOES NOT** delete your share.
    Your shares persist until you manually delete them.


Managing Shares using CLI
================================

As all other Chameleon services, you can manage your shares via CLI as well. 

  .. tip::
  
    Reading :ref:`Command Line Interface (CLI) <cli>` is highly recommended before continuing on the following sections.

In addition to installing the CLI, you must also install `python-manilaclient` package:

  .. code-block:: bash

    pip install python-manilaclient

Then, you must set environment variables for your account and project using :ref:`The OpenStack RC Script <cli-rc-script>`.

  .. tip::

    If you get HTTP 406 error of ``version is not supported by the API``, please add ``--os-share-api-version 2.65`` to
    the command to specify manila minor version.

List Shares
--------------------------------

To list all shares of your project, run the following command:

  .. code-block:: bash

    openstack share list
    
You can filter the results by the share name via adding a ``--name`` argument to the list command.

Create Share
--------------------------------

To create a share, using the following command:

  .. code-block:: bash

    openstack share create --name <name of your share> NFS <size in GiB>

For example, for creating a 1 GiB share with name of ``my-first-share``, run:

  .. code-block:: bash
  
    openstack share create --name my-first-share NFS 1

  .. note::
 
    Only the NFS protocol is supported. 

You can add the ``--public true`` to make your share public.

Edit Share
--------------------------------

To change the visibility of a share, run:

  .. code-block:: bash

    openstack share set --public <true/false> <name/id of the share>

To update the name or the description of a share, run:

  .. code-block:: bash

    openstack share set --name <new name> --description <description> <name/id of the share>

To extend/shrink the size of a share, run:

  .. code-block:: bash

    openstack share resize <name/id of the share> <new size in GiB>

.. _view-share-cli:

View Share
--------------------------------

To view the details of a share, run:

  .. code-block:: bash

    openstack share show <name/id of the share>

Delete Share
--------------------------------

To delete a share, run the following command:

  .. code-block:: bash

    openstack share delete <name/id of the share>

.. _mount-share:

Mounting Shares to Instances
================================

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
