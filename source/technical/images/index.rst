.. _images:

====================
Images
====================

All instances in Chameleon, whether KVM or bare metal, are running off disk images. The content of these disk images can be snapshotted at any point in time, which allows you to save your work and launch new instances from updated images later. While OpenStack KVM has built-in support for snapshotting in the Horizon web interface and via the command line, bare metal instances require a more complex process.

To work around this limitation, we provide the ``cc-snapshot`` utility that you can execute from inside your running instance. The ``cc-snapshot`` utility is pre-installed in all Chameleon supported appliances. You can find our appliances from the `Appliance Catalog <https://www.chameleoncloud.org/appliances/>`_.

The image service on Chameleon uses `OpenStack Glance <https://docs.openstack.org/glance/latest/>`_. This documentation demonstrates how to accomplish common tasks with *Images* using the GUI and the CLI.

.. toctree::
   :maxdepth: 2
   :caption: Images Topics

   supported_images
   cc_snapshot
   gui_management
   cli_management