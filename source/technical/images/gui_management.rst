.. _images-gui-management:

=============================
Managing Images using the GUI
=============================

To manage your images, use the *Images* page at |CHI@TACC| or |CHI@UC|, by clicking on *Project* > *Compute* > *Images*.

.. figure:: imagespagev3.png
   :alt: The Images page

   The Images page

.. note:: The Chameleon logo next to an image's name indicates that this image is an appliance supported by the Chameleon project, and is part of the Appliance Catalog.

.. tip:: Select *Details* from the dropdown menu to the right of any Chameleon supported appliance to view the relevant entry from the `Chameleon Appliance Catalog <https://www.chameleoncloud.org/appliances/>`_.

.. note:: Images at each site are stored independently. An Image made at |CHI@TACC| **will not** be available at |CHI@UC| (or vice versa) unless transferred manually.

Uploading an Image
==================

Use *+ Create Image* button to upload an image.

.. figure:: createimage.png
   :alt: The Create Image dialog

   The Create Image dialog

In the *Create Image* dialog:

#. Enter an *Image Name* and, optionally, a description.
#. Click *Browse* to select a file on your local machine to upload.
#. Select a *Format* of the image. Images created by the ``cc-snapshot`` utility are *QCOW2* images.
#. To add additional metadata for your image, use the *Metadata* section by clicking *Metadata* in the sidebar.
#. Click the *Create Image* button to upload your image.

Launching Instance using an Image
=================================

During the process of :ref:`launching instance <baremetal-gui-launch>` from the *Instance* page, it will ask you to select an image. Alternatively, you can launch instances with a selected image from the *Image* page by simply clicking on the *Launch* button located in the same row of the targeted image.

.. tip:: Other than *Launch*, there are other actions you may perform on the image. Clicking on the dropdown to explore more on what you can do.

Viewing Image Details
=====================

To view image details, click on the name of the Image.

.. figure:: imagedetails.png
   :alt: Image details

   Image details

The dropdown list in the top right corner allows you to perform various actions on the selected image, such as *Launch*, *Edit Image*, and *Update Metadata*.

.. tip:: The *ID* on the image details' page is useful when you work on the image using the CLI.

.. _simple-publish:

Publishing Images to the Appliance Catalog
==========================================

.. figure:: publishappliance.png
   :alt: Publish to Appliance Catalog

The dropdown menu to the right of listed images allows their owners to publish an appliance to the `Appliance Catalog <https://www.chameleoncloud.org/appliances/>`_. Select *Publish to Appliance Catalog*.

The *Create Appliances* web form will open automatically with most fields pre-populated. Complete the form and select *Create an Appliance*.

Entering a descriptive name, author and support contact information, the version, and an informative description can be helpful and is encouraged. **The description is used by others to determine if an appliance contains the tools needed for their research.**

.. tip:: To make your description effective you may want to ask the following questions:

   - What does the appliance contain?

   - What are the specific packages and their versions?

   - What is it useful for?

   - Where can it be deployed and/or what restrictions/limitations does it have?

   - How should users connect to it and what accounts are enabled?