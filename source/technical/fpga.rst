======
FPGAs
======

.. attention::
   **Our previously supported FPGA nodes at CHI@UC and CHI@TACC are in the process of being decommissioned.**
   
   We are working on a new FPGA offering, which will be available soon. Please stay tuned for updates. Users can still access our Xilinx FGPAs on Chameleon by following the documentation below. However, at this time, we are not supporting workflows for compilation or flashing of FPGA images. Users may still reserve Xilinx FPGA hardware and launch instances to run pre-compiled FPGA images.

____________
Introduction
____________

Chameleon provides access to two `Xilinx Alveo U280 <https://docs.amd.com/r/en-US/ug1120-alveo-platforms/U280>`_ FPGA nodes, both of which are available at |CHI@UC|. Each node is equipped with:

- Memory:
   - 32 GB DDR4 memory (two 16 GB channels)
   - 8 GB HBM (High Bandwidth Memory)
   - On-chip PLRAM memory
- Connectivity:
   - PCIe Gen3 x16 interface
   - Two QSFP28 ports supporting up to 100Gbps network access (*Note: These ports are not configured currently but will be available in a future update*)
- Additional Specifications:
   - 300 MHz default clock
   - Three Super Logic Regions (SLRs) with dedicated compute and memory resources

The workflow for using these FPGAs on Chameleon consists of four main steps:

1. Reserve a bare metal node with FPGA hardware
2. Launch an instance using a supported base image
3. Install required Xilinx software tools in your environment
4. Load your pre-compiled bistream onto the FPGA and run your application

.. important::
   Chameleon does not provide FPGA compilation services or development tools. Users need to compile their code elsewhere before running it on Chameleon's FPGAs. If you need compilation services, consider using partner facilities such as the `Open Cloud Testbed (OCT) <https://octestbed.org/>`_, which provides development environments for Xilinx FPGAs.

__________________________
Reserverving FPGA Hardware
__________________________

CHI@UC provides two `compute_cascadelake_r` nodes equipped with Xilinx Alveo U280 FPGAs:

- Node ``P3-CPU-038`` (UUID: ``89e48f7e-d04f-4455-b093-2a4318fb7026``)
- Node ``P3-CPU-042`` (UUID: ``926a9c99-3b27-45a7-818c-e6525b9ce89c``)

To ensure you get the correct hardware, reserve these nodes specifically by UUID, `as explained here in our documentation <https://chameleoncloud.readthedocs.io/en/latest/technical/reservations.html#reserving-a-node-by-uuid>`_.

_________________________
Launching Your Instance
_________________________

After your reservation becomes active:

- Launch an instance using the Chameleon-supported CC-Ubuntu 24.04 base image. Advances users may also choose to upload and use any upstream image that Xilinx supports. Find a list of supported upstream images `here <https://docs.amd.com/r/en-US/ug1742-vitis-release-notes/Installation-Requirements>`_.
- Connect to your instance via SSH

_______________________
Installing Xilinx Tools
_______________________

After you have reserved and provisioned your instance, you will need to install the AMD Vitis™ software platform to work with the FPGA resources on the host. Vitis provides command-line tools for scripted or manual application development.

AMD documentation provides the installation requirements for both Ubuntu and CentOS, which can be found `here <https://docs.amd.com/r/en-US/ug1742-vitis-release-notes/Installation-Requirements>`_.

Once you have satisfied the installation requirements for your image, you can proceed to install the Vitis platform following AMD’s documentation `here <https://docs.amd.com/r/en-US/ug1742-vitis-release-notes/Vitis-Software-Platform-Installation>`_.

___________________________
Loading Your Bitstream
___________________________

After installing the required tools, you can program the Xilinx Alveo U280 FPGA with your pre-compiled bitstream using the `Xilinx Runtime (XRT) tools <https://xilinx.github.io/XRT/master/html/index.html>`_. Generally, you will follow these steps, but we encourage users to review the AMD documentation linked at the bottom of this page as well:

**1. Verify the FPGA Device**
   
First, ensure that the FPGA device is recognized and ready. Use the ``xbmgmt`` tool to examine the device status:

.. code-block:: bash

   sudo xbmgmt examine --verbose

Look for the device BDF (Bus:Device.Function) identifier, which you'll need in the next steps. For example, it might be ``0000:81:00.0``.

**2. Program the FPGA with Your Bitstream**

Use the ``xbmgmt`` tool to program the FPGA with your bitstream. Replace ``<device_BDF>`` with your device's BDF and ``<path_to_your_bitstream>`` with the path to your ``.xclbin`` file:

.. code-block:: bash

   sudo xbmgmt program --device <device_BDF> --base --image <path_to_your_bitstream>

For example:

.. code-block:: bash

   sudo xbmgmt program --device 0000:81:00.0 --base --image /path/to/your_bitstream.xclbin

This command will program the FPGA with your specified bitstream.

**3. Reboot the System**

After programming the FPGA, it's recommended to perform a cold reboot to ensure the new image is properly loaded:

.. code-block:: bash

   sudo reboot

**4. Verify the New Configuration**

Once the system restarts, verify that the new configuration is active:

.. code-block:: bash
   sudo xbmgmt examine --verbose

Ensure that the device is ready and the new platform UUID matches your programmed bitstream.

.. important::
   - Ensure that your bitstream (``.xclbin`` file) is compatible with the Alveo U280 FPGA.
   - The ``xbmgmt`` tool is part of the XRT installation and is used for managing FPGA devices.
   - For detailed instructions and troubleshooting, refer to the `XRT documentation <https://xilinx.github.io/XRT/master/html/xbmgmt.html>`_.
   - Additional AMD instructions for bringing up and validating your card `here <https://docs.amd.com/r/en-US/ug1301-getting-started-guide-alveo-accelerator-cards/Card-Bring-Up-and-Validation>`_.
