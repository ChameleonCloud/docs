.. _images:

====================
Images
====================

All instances in Chameleon, whether KVM or bare-metal, are running off disk images. The content of these disk images can be snapshotted at any point in time, which allows you to save your work and launch new instances from updated images later. While OpenStack KVM has built-in support for snapshotting in the Horizon web interface and via the command line, bare-metal instances require a more complex process.

To work around this limitation, we provide the ``cc-snapshot`` utility that you can execute from inside your running instance. The ``cc-snapshot`` utility is pre-installed in all Chameleon supported appliances. You can find our appliances from the `Appliance Catalog <https://www.chameleoncloud.org/appliances/>`_.

The image service on Chameleon uses `OpenStack Glance <https://docs.openstack.org/glance/latest/>`_. This documentation demonstrates how to accomplish common tasks with *Images* using the GUI and the CLI.

.. _cc-snapshot-utility:

_________________________________________________
The ``cc-snapshot`` Utility
_________________________________________________

The ``cc-snapshot`` utility implements snapshotting a bare-metal instance from command line and uploads it to `Glance <https://docs.openstack.org/glance/latest/>`_, so that it can be immediately used to boot a new bare-metal instance. The snapshot images created with this tool are whole disk images.

For ease of use, ``cc-snapshot`` has been installed in all the appliances supported by the Chameleon project. If you would like to use it in a different setting, it can be downloaded and installed from the `github repository <https://github.com/ChameleonCloud/cc-snapshot>`_.

To make a snapshot of a bare-metal instance, run the following command from inside the instance:

.. code-block:: bash

   sudo cc-snapshot <image_name>

You will be prompted to enter your username and password. 

.. note:: When using the ``cc-snapshot``, it will create an image within your project with the ``shared`` visibility. Anyone with access to your project can access this image.

.. note:: If you choose an *Image* name that already exists, the previous one **will not** be overwritten. A new *Image* with the same name but a different *UUID* will be generated.

.. _updating-snapshot:

.. error::
   If you receive the following error:
   
   .. code:: 

      public endpoint for image service in regionOne not found Unable to contact Glance, check username and password
      
   it means that you have an outdated copy of ``cc-snapshot`` and you will need to update ``cc-snapshot``.
   This usually happens when you use an older images that contains an outdated version of ``cc-snapshot``.

   You may also want to get new functionalities added to the latest version of ``cc-snapshot``.
   
   Run the following commands from your instance:

   .. code::

      curl -O https://raw.githubusercontent.com/ChameleonCloud/cc-snapshot/master/cc-snapshot
      sudo mv cc-snapshot /usr/bin/
      sudo chmod +x /usr/bin/cc-snapshot

__________________________________
Managing Images using the GUI
__________________________________

To manage your images, use the *Images* page at `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ or `CHI@UC <https://chi.uc.chameleoncloud.org>`_, by clicking on *Project* > *Compute* > *Images*.

.. figure:: images/imagespage.png
   :alt: The Images page

   The Images page

.. note:: Images at each site are stored independently. An Image made at `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ **will not** be available at `CHI@UC <https://chi.uc.chameleoncloud.org>`_ (or vice versa) unless transferred manually.

Uploading an Image
__________________

Use *+ Create Image* button to upload an image.

.. figure:: images/createimage.png
   :alt: THe Create Image dialog

   The Create Image dialog

In the *Create Image* dialog:

#. Enter an *Image Name* and, optionally, a description.
#. Click *Browse* to select a file on your local machine to upload. 
#. Select a *Format* of the image. Images created by the ``cc-snapshot`` utility are *QCOW2* images.
#. For *Image Requirements*, choose *pxe_deploy_kernel* in the *Kernel* dropdown and *pxe_deploy_ramdisk* in the *Ramdisk* dropdown.
#. To add additional metadata for your image, use the *Metadata* section by clicking *Metadata* in the sidebar.
#. Click the *Create Image* button to upload your image.

Launching Instance using an Image
__________________

During the process of :ref:`launching instance <baremetal-gui-launch>` from the *Instance* page, it will ask you to select an image. Alternatively, you can launch instances with a selected image from the *Image* page by simply clicking on the *Launch* button located in the same row of the targeted image.

.. tip:: Other than *Launch*, there are other actions you may perfom on the image. Clicking on the dropdown to explore more on what you can do. 

Viewing Image Details
_____________________

To view image details, click on the name of the Image.

.. figure:: images/imagedetails.png
   :alt: Image details

   Image details

The dropdown list in the top right corner allows you to perform various actions on the selected image, such as *Launch*, *Edit Image*, and *Update Metadata*. 

.. tip:: The *ID* on the image details' page is useful when you work on the image using the CLI.

________________________________________________
Managing Images using the CLI
________________________________________________

.. tip:: Reading :doc:`cli` is highly recommanded before continuing on the following sections.

Uploading an Image
__________________

After configuring the environment variables using :ref:`cli-rc-script`, run the following command:

.. code-block:: bash

   openstack image create --file <file> --disk-format <format> <image-name>

Provide the path to and the name of your image file in your local file system as the value of the ``file`` parameter. Also, indicate the image format using the ``format`` switch, such as ``QCOW2``. Finally, name your image via the ``image-name`` switch.

Downloading an Image
____________________

Downloading an image file to your local machine is **only** available via the CLI. You may find it useful when transferring images from one Chameleon site to  another. To download an image file, run the following command:

.. code-block:: bash

   openstack image save --file <filename> <image>

Use ``filename`` to indicate where you would like to save the image in your local file system. Also, replace ``image`` with either the name or the *ID* of the image on Chameleon.

.. important:: 
   If you do not provide the ``--file`` parameter, it will print out the binary image data in your terminal.

Retrieving Images
___________________________

You may list all images of your project by typing:

.. code-block:: bash

   openstack image list

Optionally, you may add filters to the list, such as ``--shared`` to only display the images shared within your project. Use ``openstack image list --help`` to see all the available filters.

Viewing Image Details
_____________________

You may view details of an image with the command:

.. code-block:: bash

   openstack image show <image>

Replace ``image`` with either an image name or it's *UUID*.

Editing an Image
________________

You may edit an image using the command:

.. code-block:: bash

   openstack image set <image> ...

Replace ``image`` with either an image name or it's *UUID*. You must provide additional flags to update an image. Use ``openstack image set --help`` to see all the options.
