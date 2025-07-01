======
FPGAs
======

.. attention::
   **Our previously supported Altera FPGA nodes at CHI@UC and CHI@TACC are in the process of being decommissioned.**

   We are actively enhancing our FPGA capabilities with new offerings in development. **Altera nodes** previously supported on Chameleon **will be unavailable after Feb. 7, 2025**.
   
   While these updates are in progress, users can **continue accessing** our existing **Xilinx FPGA resources** **using documentation below**. Our team is working on implementing improved workflows to streamline current FPGA development and deployment processes. These enhancements will provide more efficient ways to utilize this hardware.

   **If you have ideas or suggestions regarding the use of FPGAs on Chameleon, please reach out to us at**
   contact@chameleoncloud.org.
   
   We will provide additional updates as new features and hardware become available. Stay connected with our platform for the latest announcements.

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
4. Load your pre-compiled bitstream onto the FPGA and run your application

.. important::
   Chameleon does not provide FPGA compilation services or development tools. Users need to compile their code elsewhere before running it on Chameleon's FPGAs. We are currently exploring new ways to provide FPGA development tools and workflows in the future.

_________________________
Reserving FPGA Hardware
_________________________

CHI@UC provides two `compute_cascadelake_r` nodes equipped with Xilinx Alveo U280 FPGAs:

- Node ``P3-CPU-038`` (UUID: ``89e48f7e-d04f-4455-b093-2a4318fb7026``)
- Node ``P3-CPU-042`` (UUID: ``926a9c99-3b27-45a7-818c-e6525b9ce89c``)

To ensure you get the correct hardware, reserve these nodes specifically by UUID, `as explained here in our documentation <https://chameleoncloud.readthedocs.io/en/latest/technical/reservations.html#reserving-a-node-by-uuid>`_.

_________________________
Launching Your Instance
_________________________

After your reservation becomes active:

- Launch an instance using a supported upstream image for the Xilinx Runtime. Chameleon suggests using our supported CC-Ubuntu 24.04 as a base image. Advanced users may choose to use any upstream image that Xilinx supports. Find a list of supported upstream images `here <https://docs.amd.com/r/en-US/ug1742-vitis-release-notes/Installation-Requirements>`__
- Connect to your instance via SSH

_______________________
Installing Xilinx Tools
_______________________

Compiling code for FPGAs requires the Xilinx Vitis™ software platform, which provides a comprehensive development environment for creating FPGA-accelerated applications. The Vitis platform includes the Vitis Unified Software Platform, Vitis Core Development Kit, and Vitis AI Development Kit.

Flashing the FPGA with your bitstream requires the Xilinx Runtime (XRT) tools, which are part of the Vitis platform. The XRT tools provide a command-line interface for managing FPGA devices, including programming the FPGA with your bitstream. You can also install the XRT environment separately from the Vitis platform, although functionality may be limited.

Guidelines for installing the Vitis platform can be found in the `AMD documentation <https://docs.amd.com/r/en-US/ug1742-vitis-release-notes/Vitis-Software-Platform-Installation>`_. The installation requirements for Ubuntu are also provided in the documentation `here <https://docs.amd.com/r/en-US/ug1742-vitis-release-notes/Installation-Requirements>`__.

Guidelines for installing the Xilinx Runtime (XRT) tools can be found in the `XRT documentation <https://xilinx.github.io/XRT/master/html/index.html>`__.

___________________________
Loading Your Bitstream
___________________________

After installing the required tools, you can program the Xilinx Alveo U280 FPGA with your pre-compiled bitstream using the `Xilinx Runtime (XRT) tools <https://xilinx.github.io/XRT/master/html/index.html>`_. The steps below are the basic workflow for flashing, but we encourage users to review the AMD documentation for more detailed instructions.

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
   - For detailed instructions and troubleshooting, refer to the `XRT documentation <https://xilinx.github.io/XRT/master/html/xbmgmt.html>`__.
   - Additional AMD instructions for bringing up and validating your card `here <https://docs.amd.com/r/en-US/ug1301-getting-started-guide-alveo-accelerator-cards/Card-Bring-Up-and-Validation>`__.
