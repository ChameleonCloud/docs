.. _kvm-cli:

Work with KVM using the CLI
===========================

.. note::

   For general information on CLI authentication and use, see :ref:`cli`.

Creating a lease and launching an instance
-------------------------------------------

KVM@TACC reservations use the same flavor-based lease pattern as the rest of
the CLI reservation workflow. See :ref:`reservation-cli-flavor` for creating
a lease for a flavor and launching an instance against it.

Security groups
----------------

Unlike the bare metal sites, KVM@TACC enforces *Security Groups* on every
instance, and blocks **all** inbound traffic — including SSH — by default.
Before you can reach an instance over SSH, you must create a Security Group
that allows inbound TCP port 22 and apply it to the instance.

Create a Security Group and add a rule allowing SSH:

.. code-block:: bash

   openstack security group create allow-ssh
   openstack security group rule create --protocol tcp --dst-port 22:22 allow-ssh

Apply it to a running instance:

.. code-block:: bash

   openstack server add security group <server> allow-ssh

To remove a Security Group from an instance:

.. code-block:: bash

   openstack server remove security group <server> allow-ssh

.. tip::
   You can also apply Security Groups at launch time with the ``--security-group``
   flag on ``openstack server create``.

Creating an instance snapshot
-------------------------------

Bare metal instances require the :ref:`cc-snapshot-utility` to create a
snapshot, since Ironic-managed bare metal has no hypervisor-level snapshot
support. KVM@TACC instances are virtualized, so you can snapshot them
directly through Nova instead — no additional tooling required:

.. code-block:: bash

   openstack server image create --name <snapshot-name> <server>

Once the snapshot completes, the new image appears in ``openstack image
list`` and can be used to launch new instances the same way as any other
image.

Uploading qcow2 images to raw format for better instance launch performance
------------------------------------------------------------------------------

KVM images are stored on our Ceph cluster, which is able to serve raw images
much faster than qcow2 for instance launches. Openstack includes the
experimental command Glance image-create-via-import, which allows uploading of
images in various standard formats including qcow2 to then be automatically
converted to raw in the backend.

In order to use this method, authenticate to KVM using the OpenStack RC script
downloaded from the `KVM\@TACC <https://kvm.tacc.chameleoncloud.org>`_ site as
described in :ref:`cli-rc-script`.

Next, issue the following command:

   .. code-block:: shell

       glance image-create-via-import --container-format bare --disk-format qcow2 --file </path/to/image> --name <image name>

Details and other options for this command are available via the Glance
`image-create-via-import documentation
<https://docs.openstack.org/python-glanceclient/xena/cli/details.html#glance-image-create-via-import>`_.

.. attention::
   Glance image-create-via-import is currently unable to handle conversion of
   iso images to raw.

Alternatively, you may convert qcow2 images to raw format before upload.
qemu-img is one tool that is able to this with the following command:

   .. code-block:: shell

       qemu-img convert -f qcow2 -O raw <original.qcow2> <converted.img>

Once converted, use glance to upload the image:

   .. code-block:: shell

       openstack image create --file </path/to/converted.img> --disk-format raw <image-name>

Details and other options for this command are available within `Openstack
documentation <https://docs.openstack.org/image-guide/convert-images.html>`_.