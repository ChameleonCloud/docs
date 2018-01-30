Ironic User Guide
=================

Overview
--------

Ironic is bare metal provisioning system that is integrated into the
OpenStack cloud platform.

Chameleon Default Environment
-----------------------------

We provide an initial CentOS 7 image (called CC-CentOS7 in Nova/Glance).
It has the following characteristics:

-  A *cc* user for users to access to the system. It has passwordless
   sudo access.
-  Auto-login from the console.
-  Standard development tools such as make, gcc, gfortran, etc.
-  A few config management apps such as Puppet, Ansible, etc.
-  The EPEL & OpenStack-Juno yum repositories.
-  A *ccadmin* user for Chameleon administrative staff access. Please do
   not disable this account; it allows us to login to your instance for
   troubleshooting and security purposes.

Images
------

Creating an Image
~~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

Snapshotting an Instance
------------------------

OpenStack does not currently support snapshotting Ironic instances.
While we investigate how to implement this, the following procedure will
let you manually create a snapshot image from inside your running
instance. After you ssh to your instance and "sudo su -" to become root,
the steps are:

Create a tar file of the contents of your instance:

::

    # tar cf /tmp/snapshot.tar / --selinux --acls --xattrs --numeric-owner --one-file-system --exclude=/tmp/* --exclude=/proc/* --exclude=/boot/extlinux

This will take 3 to 5 minutes. Next, convert the tar file into a qcow2
image:

::

    # virt-make-fs --format=qcow2 --type=ext4 --label=img-rootfs /tmp/snapshot.tar /tmp/snapshot.qcow2

This will take 15 to 20 minutes. The label must match the label used in
the image you are snapshotting from. You can find this label in your
CentOS instance by running:

::

    # ls /dev/disk/by-label

and looking at the name of the file in that directory. To remove
unwanted configuration information from your image, run:

::

    # virt-sysprep -a /tmp/snapshot.qcow2

This command typically runs in less than a minute. To complete the
preparation of your snapshot image, create a compressed version of it:

::

    # qemu-img convert /tmp/snapshot.qcow2 -O qcow2 /tmp/snapshot_compressed.qcow2 -c

This will take 4 or 5 minutes to run and will decrease the size of your
image on disk by a factor of 5 or more.

The final steps are to upload your snapshot image to OpenStack Glance.
First, visit the \ `Access &
Security tab <https://ironic.chameleon.tacc.utexas.edu/dashboard/project/access_and_security/>`__ in
the OpenStack web interface and "Download OpenStack RC File". Copy this
file to your instance and source it. Then simply use the glance client
program to upload your image. First, find the uuids of the kernel and
ramdisk by:

.. code:: p1

    # glance image-list
    +--------------------------------------+--------------------+-------------+------------------+-----------+--------+
    | ID                                   | Name               | Disk Format | Container Format | Size      | Status |
    +--------------------------------------+--------------------+-------------+------------------+-----------+--------+
    | daf8865e-8031-4119-bdba-b1a48866223b | CC-CentOS7         | qcow2       | bare             | 676737536 | active |
    | b39feeff-63f5-44ad-b1ff-7cf70d1a4309 | CC-CentOS7.initrd  | ari         | ari              | 30696161  | active |
    | a0aa7bde-c5a3-4180-b64d-0032e2da168e | CC-CentOS7.kernel  | aki         | aki              | 4906464   | active |
    | ...                                  | ...                | ...         | ...              | ...       | ...    |
    +--------------------------------------+--------------------+-------------+------------------+-----------+--------+

Then upload your image. Aassuming you are snapshotting an instance
derived from CC-CentOS7, execute:

::

    # glance image-create --name my-snapshot --disk-format qcow2 --container-format bare --property kernel_id=a0aa7bde-c5a3-4180-b64d-0032e2da168e --property ramdisk_id=b39feeff-63f5-44ad-b1ff-7cf70d1a4309 < /tmp/snapshot_compressed.qcow2

This command should run relatively quickly.
