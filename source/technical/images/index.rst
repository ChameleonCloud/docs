.. _images:

====================
Images
====================

All instances in Chameleon, whether KVM or bare metal, are running off disk images. The content of these disk images can be snapshotted at any point in time, which allows you to save your work and launch new instances from updated images later. While OpenStack KVM has built-in support for snapshotting in the Horizon web interface and via the command line, bare metal instances require a more complex process.

To work around this limitation, we provide the ``cc-snapshot`` utility that you can execute from inside your running instance. The ``cc-snapshot`` utility is pre-installed in all Chameleon supported appliances. You can find our appliances on `Trovi <https://trovi.chameleoncloud.org/dashboard/artifacts/>`_ by filtering for the **appliance** tag.

The image service on Chameleon uses `OpenStack Glance <https://docs.openstack.org/glance/latest/>`_. This documentation demonstrates how to accomplish common tasks with *Images* using the GUI and the CLI.

The following matrix shows which Chameleon-supported images are compatible with the hardware available at each site.
For example, CHI@UC does not have nodes with the ARM64 architecture, so the ARM64 image variants are not useful at that site.

Supported images by site:

+---------------------------+----------+--------+----------+----------+
| Image                     | CHI@TACC | CHI@UC | KVM@TACC | CHI@NCAR |
+===========================+==========+========+==========+==========+
| ``CC-CentOS9-Stream``     | Yes      | Yes    | Yes      | Yes      |
+---------------------------+----------+--------+----------+----------+
| ``CC-Ubuntu22.04``        | Yes      | Yes    | Yes      | Yes      |
+---------------------------+----------+--------+----------+----------+
| ``CC-Ubuntu22.04-ARM64``  | Yes      | No     | No       | Yes      |
+---------------------------+----------+--------+----------+----------+
| ``CC-Ubuntu22.04-CUDA``   | Yes      | Yes    | Yes      | No       |
+---------------------------+----------+--------+----------+----------+
| ``CC-Ubuntu24.04``        | Yes      | Yes    | Yes      | Yes      |
+---------------------------+----------+--------+----------+----------+
| ``CC-Ubuntu24.04-ARM64``  | Yes      | No     | No       | Yes      |
+---------------------------+----------+--------+----------+----------+
| ``CC-Ubuntu24.04-CUDA``   | Yes      | Yes    | Yes      | No       |
+---------------------------+----------+--------+----------+----------+
| ``CC-Ubuntu24.04-ROCm``   | Yes      | No     | No       | No       |
+---------------------------+----------+--------+----------+----------+
| ``CC-Ubuntu26.04``        | Yes      | Yes    | Yes      | Yes      |
+---------------------------+----------+--------+----------+----------+

.. toctree::
   :maxdepth: 2
   :caption: Images Topics

   supported_images
   cc_snapshot
   gui_management
   cli_management