.. _images-cli-management:

=============================
Managing Images using the CLI
=============================

.. tip:: Reading :ref:`cli` is highly recommended before continuing on the following sections.

Uploading an Image
==================

After configuring the environment variables using :ref:`cli-rc-script`, run the following command:

.. code-block:: bash

   openstack image create --file <file> --disk-format <format> <image-name>

Provide the path to and the name of your image file in your local file system as the value of the ``file`` parameter. Also, indicate the image format using the ``format`` switch, such as ``QCOW2``. Finally, name your image via the ``image-name`` switch.

Downloading an Image
====================

Downloading an image file to your local machine is **only** available via the CLI. You may find it useful when transferring images from one Chameleon site to  another. To download an image file, run the following command:

.. code-block:: bash

   openstack image save --file <filename> <image>

Use ``filename`` to indicate where you would like to save the image in your local file system. Also, replace ``image`` with either the name or the *ID* of the image on Chameleon.

.. important::
   If you do not provide the ``--file`` parameter, it will print out the binary image data in your terminal.

Retrieving Images
=================

You may list all images of your project by typing:

.. code-block:: bash

   openstack image list

Optionally, you may add filters to the list, such as ``--shared`` to only display the images shared within your project. Use ``openstack image list --help`` to see all the available filters.

Viewing Image Details
=====================

You may view details of an image with the command:

.. code-block:: bash

   openstack image show <image>

Replace ``image`` with either an image name or it's *UUID*.

Sharing an Image
================

You may share images several ways.  If you wish to share an image with everyone, use:

.. code-block:: bash

   openstack image set --public <image>

Replace ``image`` with the image *UUID*.

If you would like to share an image with another project, first set the image visibility to shared:

.. code-block:: bash

   openstack image set --shared <image>

Next add the project you wish to share the image with:

.. code-block:: bash

   openstack image add project <image> <project>

Replace ``image`` and ``project`` with the corresponding *UUIDs*

Finally the project that the image is shared to must accept the shared image.  Run this command with a user in the second project:

.. code-block:: bash

   openstack image set --accept <image>

Replace ``image`` with the image *UUID* and the second project should now be able to use the image!

.. important::
   Only the owner of the image can modify it or any properties.  However a project who has an image shared to it can remove themselves from the list of image members.

Editing an Image
================

You may edit an image using the command:

.. code-block:: bash

   openstack image set <image> ...

Replace ``image`` with either an image name or it's *UUID*. You must provide additional flags to update an image. Use ``openstack image set --help`` to see all the options.