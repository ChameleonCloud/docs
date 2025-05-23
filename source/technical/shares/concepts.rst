.. _storage_network:

Storage Networks
================

To provide isolation among shares created by different projects, accessing a share requires a storage network, which are special networks you can
reserve to use. When reserving a storage network, add `usage_type=storage` to the resource properties. To learn more about reserving networks, read
the :ref:`reservations documentation <reservations>`. All bare metal instances that are created on the storage network have access to all the project
shares.

.. tip::

  To attach floating IP to your instance created on a storage network, you need to create a router with `public` external network. Then connect
  the storage subnet to the router. You must specify an unused IP address which belongs to the selected subnet. To learn more about creating
  router and connecting subnet, read :ref:`isolated network VLANs <network-isolation>`.

Shares
======

Visibility
----------

Shares are owned by the project. By default, all shares have `private` visibility and can only be listed and accessed within your project.
All bare metal instances owned by the project have read and write permissions to the project's shares. You can also make your shares `public`.
All Chameleon users and projects can list public shares, and with a storage network, all projects have read-only access to a public share.

Accessibility
-------------

A share is a pre-allocated storage space at a CephFS. You can :ref:`mount your shares to your bare metal instances via NFS protocol <mount-share>`.
The accessibility of the shares are controlled internally by the reservation service. You are not allowed to edit the access rules of a share.

Quotas
------

We do not charge SUs for the storage spaces of your shares. However, we do limit the total size and the number of shares you can create within
your project. The maximum number of shares is 10 and the maximum size allowed for all shares in a project is 2000 GiB. If you need to increase
the default quota, submit a ticket via the |Help Desk|.