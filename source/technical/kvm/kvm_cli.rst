Work with KVM using the CLI
===========================

For general information on CLI authentication and use, see the
`command-line-interface section
<https://chameleoncloud.readthedocs.io/en/latest/technical/cli.html#the-command-line-interface>`_.

**Uploading qcow2 images to raw format for better instance launch performance**

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