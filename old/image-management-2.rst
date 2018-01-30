Image management
================

All instances in Chameleon, whether KVM or bare-metal, are running off
disk images. The content of these disk images can be snapshotted at any
point in time, which allows you to save your work and launch new
instances from updated images later. While OpenStack KVM has built-in
support for snapshotting in the Horizon web interface and via the
command line, bare-metal instances require a more complex process.

To work around this limitation, we provide the \ ``cc-snapshot`` utility
that you can execute from inside your running instance. If you need to
customize the snapshotting process, you can follow the instructions
below reproducing commands executed by \ ``cc-snapshot``.

This guide also explains how we automate the creation new images using a
disk image builder, which simplifies the process and makes it less
error-prone.

Snapshotting a CentOS 7 Instance
--------------------------------

.. raw:: html

   <div
   style="background: #eee; border: 1px solid #ccc; padding: 5px 10px;">

Note that the steps are different depending on whether you want to
create a partition image (with kernel and ramdisk stored as external
files in Glance) or a whole disk image (with kernel and ramdisk bundled
in the disk image). The respectives steps for the two alternatives are
described below.

.. raw:: html

   </div>

As a partition image
~~~~~~~~~~~~~~~~~~~~

Install prerequisite software (only required for XFS file systems, which
is the default on CentOS 7):

``# yum install -y libguestfs-xfs``

Create a tar file of the contents of your instance:

``# tar cf /tmp/snapshot.tar / --selinux --acls --xattrs --numeric-owner --one-file-system --exclude=/tmp/* --exclude=/proc/* --exclude=/boot/extlinux``

This will take 3 to 5 minutes. Next, convert the tar file into a qcow2
image (if you don't want to use the XFS file system, you can replace
``xfs`` by ``ext4``):

``# virt-make-fs --format=qcow2 --type=xfs --label=img-rootfs /tmp/snapshot.tar /tmp/snapshot.qcow2``

This will take 15 to 20 minutes. The label must match the label used in
the image you are snapshotting from. You can find this label in your
CentOS instance by running:

``# ls /dev/disk/by-label``

and looking at the name of the file in that directory.

To remove unwanted configuration information from your image, run:

``# virt-sysprep -a /tmp/snapshot.qcow2``

This command typically runs in less than a minute. To complete the
preparation of your snapshot image, create a compressed version of it:

``# qemu-img convert /tmp/snapshot.qcow2 -O qcow2 /tmp/snapshot_compressed.qcow2 -c``

This will take 4 or 5 minutes to run and will decrease the size of your
image on disk by a factor of 5 or more.

The final steps are to upload your snapshot image to OpenStack Glance.
First, visit the \ `Access &
Security tab <https://chi.tacc.chameleoncloud.org/dashboard/project/access_and_security/>`__ in
the OpenStack web interface and "Download OpenStack RC File". Copy this
file to your instance and source it. Then simply use the glance client
program to upload your image, specifying the UUIDs of the kernel and
ramdisk you want to use.

``# glance image-create --name my-snapshot --disk-format qcow2 --container-format bare --property kernel_id=$VMLINUZ_UUID --property ramdisk_id=$INITRD_UUID < /tmp/snapshot_compressed.qcow2``

This command should run relatively quickly.

As a whole disk image
~~~~~~~~~~~~~~~~~~~~~

Install prerequisite software (only required for XFS file systems, which
is the default on CentOS 7):

``# yum install -y libguestfs-xfs``

Create a tar file of the contents of your instance:

``# tar cf /tmp/snapshot.tar / --selinux --acls --xattrs --numeric-owner --one-file-system --exclude=/tmp/* --exclude=/proc/* --exclude=/boot/extlinux``

This will take 3 to 5 minutes. Next, convert the tar file into a qcow2
image (if you don't want to use the XFS file system, you can
replace \ ``xfs`` by ``ext4``):

``# virt-make-fs --partition --format=qcow2 --type=xfs --label=img-rootfs /tmp/snapshot.tar /tmp/snapshot.qcow2``

This will take 15 to 20 minutes. The label must match the label used in
the image you are snapshotting from. You can find this label in your
CentOS instance by running:

``# ls /dev/disk/by-label``

and looking at the name of the file in that directory. Next ensure that
the GRUB bootloader is present in the image:

``# virt-customize -a /tmp/snapshot.qcow2 --run-command 'grub2-install /dev/sda && grub2-mkconfig -o /boot/grub2/grub.cfg'``

To remove unwanted configuration information from your image, run:

``# virt-sysprep -a /tmp/snapshot.qcow2``

This command typically runs in less than a minute. To complete the
preparation of your snapshot image, create a compressed version of it:

``# qemu-img convert /tmp/snapshot.qcow2 -O qcow2 /tmp/snapshot_compressed.qcow2 -c``

This will take 4 or 5 minutes to run and will decrease the size of your
image on disk by a factor of 5 or more.

The final steps are to upload your snapshot image to OpenStack Glance.
First, visit the \ `Access &
Security tab <https://chi.tacc.chameleoncloud.org/dashboard/project/access_and_security/>`__ in
the OpenStack web interface and "Download OpenStack RC File". Copy this
file to your instance and source it. Then simply use the glance client
program to upload your image.

``# glance image-create --name my-snapshot --disk-format qcow2 --container-format bare < /tmp/snapshot_compressed.qcow2``

This command should run relatively quickly.

Snapshotting an Ubuntu 14.04 Instance
-------------------------------------

As a whole disk image
~~~~~~~~~~~~~~~~~~~~~

If required, install required dependencies. Reply **Yes** when it asks
whether it should generate the guestfs appliance:

``# apt-get install libguestfs-tools``

Create a tar file of the contents of your instance:

``# tar cf /tmp/snapshot.tar / --selinux --acls --xattrs --numeric-owner --one-file-system --exclude=/tmp/* --exclude=/proc/* --exclude=/boot/extlinux``

Next, convert the tar file into a qcow2 image:

``# virt-make-fs --partition --format=qcow2 --type=ext4 --label=`ls /dev/disk/by-label` /tmp/snapshot.tar /tmp/snapshot.qcow2``

Update guestfs appliances (prevent an error with virt-make-fs):

``# update-guestfs-appliance``

Next ensure that the GRUB bootloader is present in the image:

``# guestfish -a /tmp/snapshot.qcow2 -i sh 'grub-install /dev/sda && grub-mkconfig -o /boot/grub/grub.cfg'``

To remove unwanted configuration information from your image, run:

``# virt-sysprep -a /tmp/snapshot.qcow2``

To complete the preparation of your snapshot image, create a compressed
version of it:

``# qemu-img convert /tmp/snapshot.qcow2 -O qcow2 /tmp/snapshot_compressed.qcow2 -c``

This can decrease the size of your image on disk by a factor of 5 or
more.

The final steps are to upload your snapshot image to OpenStack Glance.
First, visit the \ `Access &
Security tab <https://chi.tacc.chameleoncloud.org/dashboard/project/access_and_security/>`__ in
the OpenStack web interface and "Download OpenStack RC File". Copy this
file to your instance and source it. Then simply use the glance client
program to upload your image.

``# glance image-create --name my-snapshot --disk-format qcow2 --container-format bare < /tmp/snapshot_compressed.qcow2``

Creating an Image
-----------------

Building images is slightly different than for normal OpenStack systems.

Here we will build a custom CentOS 7 image. Run these commands as root.

::

    export LIBGUESTFS_BACKEND=direct
    yum install git libguestfs-tools-c 
    cd ~
    git clone https://github.com/openstack/diskimage-builder.git
    wget http://cloud.centos.org/centos/7/images/CentOS-7-x86_64-GenericCloud-20141129_01.qcow2c
    export DIB_LOCAL_IMAGE=~/CentOS-7-x86_64-GenericCloud-20141129_01.qcow2c
    diskimage-builder/bin/disk-image-create centos7 baremetal -o CC-CentOS7
    glance image-create --name my-image-kernel --is-public True --progress --disk-format aki < CC-CentOS7.vmlinuz

Save id as $VMLINUZ\_UUID.

::

    glance image-create --name my-image-initrd --is-public True --progress --disk-format ari < CC-CentOS7.initrd

Save id as $INITRD\_UUID.

::

    glance image-create --name my-image --is-public True --disk-format qcow2 --container-format bare --property kernel_id=$VMLINUZ_UUID --property ramdisk_id=$INITRD_UUID < CC-CentOS7.qcow2

This provides a generic CentOS 7 image. In the next section we will
customize it.

Updating / Altering an Image
----------------------------

::

    glance image-download CC-CentOS7 > CC-CentOS7.custom.qcow2

    mkdir mnt
    guestmount --rw -a CC-CentOS7.custom.qcow2 -i mnt

Configure your cloud.cfg file & make any other changes you like. Here is
a link to the cloud-init documentation:
http://cloudinit.readthedocs.org/en/latest/index.html

::

    vi mnt/etc/cloud/cloud.cfg
    guestunmount mnt

Note we re-use the VMLINUZ\_UUID & INITRD\_UUID from the previous
section.

::

    glance image-create --name CC-CentOS7-custom --disk-format qcow2 --container-format bare --property kernel_id=$VMLINUZ_UUID --property ramdisk_id=$INITRD_UUID < CC-CentOS7.custom.qcow2
