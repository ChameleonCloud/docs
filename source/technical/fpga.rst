======
FPGAs
======

____________
Introduction
____________

Chameleon provides access to five FPGA nodes.
Four nodes are located at |CHI@TACC|. Each of these nodes is fitted with a `Nallatech 385A board <http://www.nallatech.com/store/pcie-accelerator-cards/nallatech-385a-arria10-1150-fpga/>`_ with an Altera Arria 10 1150 GX FPGA (up to 1.5 TFlops), 8 GB DDR3 on-card memory, and dual QSFP 10/40 GbE support.
One node is located at |CHI@UC|. The node is fitted with a `Terasic DE5a-Net board <https://www.intel.com/content/www/us/en/programmable/solutions/partners/partner-profile/terasic-inc-/board/arria-10-device-family---de5a-net--fpga-development-kit.html>`_ with an `Altera Arria 10 GX 1150 FPGA <https://www.terasic.com.tw/cgi-bin/page/archive.pl?Language=English&CategoryNo=231&No=970>`_ (up to 1.5 TFlops), 4 GB DDR3 on-card memory, and four QSFP 10/40 GbE support.
All FPGA nodes are configured to run OpenCL code, but they can be reconfigured (by a request to our |Help Desk|) to run compiled designs prepared with Altera Quartus.

Due to export control limitations, access to the development toolchain requires verification of your user profile. This guide explains how to gain access to the development toolchain and execute code on the FPGA nodes. Briefly, the steps for building an FPGA application are:

- Create a TACC account at the `TACC Portal <https://portal.tacc.utexas.edu/>`_
- Setup Multi-Factor Authentication for TACC Resources by following `this documentation <https://portal.tacc.utexas.edu/tutorials/multifactor-authentication>`_
- Request access to the FPGA Build Node project at the |Help Desk|
- SSH to the ``fpga01.tacc.chameleoncloud.org`` host to build your FPGA application
- Use ``scp`` to copy your FPGA application from ``fpga01.tacc.chameleoncloud.org`` to the FPGA node you wish to run it on

____________
Development
____________

Chameleon provides a build system that includes the necessary `Altera SDK for OpenCL <https://www.altera.com/products/design-software/embedded-software-developers/opencl/overview.html>`_ tools for developing kernels for use on the `Nallatech 385A cards <http://www.nallatech.com/store/pcie-accelerator-cards/nallatech-385a-arria10-1150-fpga/>`_ and the `Terasic DE5a-Net card <https://www.intel.com/content/www/us/en/programmable/solutions/partners/partner-profile/terasic-inc-/board/arria-10-device-family---de5a-net--fpga-development-kit.html>`_, both using the Altera Arria 10 FPGA.

Due to licensing requirements, you must apply for access to the FPGA build system. Submit a ticket through our help system to request access.

FPGA resources are only available at |CHI@TACC|. Due to TACC’s security requirements, multi-factor authentication must be used to access the FPGA build system. You can either use a smartphone app (Apple iOS or Android) or SMS messaging: follow `this documentation <https://portal.tacc.utexas.edu/tutorials/multifactor-authentication>`_ to set it up. Once you have set up multi-factor authentication, you can SSH to fpga01.tacc.chameleoncloud.org with your Chameleon username and password; you will also be asked for a TACC security token, which will be provided to you via the app or SMS.

Each user's home directory will contain an archive file containing a Hello World OpenCL example: ``exm_opencl_hello_world_x64_linux_16.0.tgz``. Extract the archive with the following command:

.. code-block:: bash

   tar -zxf exm_opencl_hello_world_x64_linux_16.0.tgz

Two directories will be extracted: ``common`` and ``hello_world``. Change into the ``hello_world`` directory.

.. code-block:: bash

   cd hello_world

Prior to compiling, load the Quartus environment configuration for either the Nallatech or Terasic board.

Nallatech:

.. code-block:: bash

   module load nallatech

Terasic:

.. code-block:: bash

   module load terasic

.. important::
   The host code contains the function ``findPlatform(Altera)``, which searches for the "Altera" platform name. It should instead be instructed to search for "Intel(R) FPGA". `This change <https://www.intel.com/content/www/us/en/programmable/support/support-resources/knowledge-base/solutions/fb409015.html>`_ can be made by editing ``../hello_world/host/src/main.cpp``:
    ``findPlatform("Intel(R) FPGA")``

Compiling an OpenCL kernel often takes a very long time, so it is essential to debug by using the emulation feature of the compiler using ``-march=emulator`` in the compiler command. Note that the ``--board p385a_sch_ax115`` parameter is required for the Nallatech board, and the ``-board=de5a_net_e1`` parameter is required for the Terasic board. These correctly identify the FPGA boards available on Chameleon. Do not alter these parameters or their syntax. In this example, the host application requires the output name to be ``hello_world.aocx``, so this parameter must also be unchanged.

Nallatech:

.. code-block:: bash

   aoc --board p385a_sch_ax115 device/hello_world.cl -o bin/hello_world.aocx -march=emulator

Terasic:

.. code-block:: bash

   aoc -board=de5a_net_e1 device/hello_world.cl -o bin/hello_world.aocx -march=emulator

Build the host application, which is used to execute the OpenCL kernel.

.. code-block:: bash

   make

Now run the emulated kernel.

.. code-block:: bash

   env CL_CONTEXT_EMULATOR_DEVICE_INTELFPGA=1 ./bin/host

When debugging is complete and the code is ready to be compiled for the FPGA hardware, remove the emulation flag. This may take several hours to complete, so we recommend you run it inside a terminal multiplexer, such as screen or tmux which are both installed on the build node.

Nallatech:

.. code-block:: bash

   aoc --board p385a_sch_ax115 device/hello_world.cl -o bin/hello_world.aocx

Terasic:

.. code-block:: bash

   aoc -board=de5a_net_e1 device/hello_world.cl -o bin/hello_world.aocx

_________
Execution
_________

After completing development of an OpenCL kernel on our build node, the kernel and host application must be transferred and executed on a node with an FPGA accelerator.

When using |CHI@TACC| GUI to reserve nodes, use the *Node Type to Reserve* selector and choose *FPGA*. Alternatively, use the `Resource Discovery web interface <https://www.chameleoncloud.org/user/discovery/>`_ to reserve a node equipped with an FPGA accelerator card by filtering the node selection using the *with FPGA* button, and clicking *Reserve* at the bottom of the selection. Copy the generated CLI command and use it to create your reservation.

In order to have access to the required runtime environment for using the FPGAs, use the image **CC-CentOS7-FPGA** when launching your instance.

Log in to the instance, download the application code (both ``common`` and ``hello_world`` directories) from the build system using ``scp``, and change into the ``hello_world`` directory:

.. code-block:: bash

   scp -r <username>@fpga01.tacc.chameleoncloud.org:~/common .
   scp -r <username>@fpga01.tacc.chameleoncloud.org:~/hello_world .
   cd hello_world

Compile the host application, if necessary.

.. code-block:: bash

   make

Program FPGA with the OpenCL kernel, using ``acl0`` as the device name.

.. code-block:: bash

   aocl program acl0 ./bin/hello_world.aocx

.. attention::
   If you are at |CHI@UC|, please run the following commands (program FPGA as ``root``).

   .. code-block:: bash

      sudo -i
      source /etc/profile.d/altera.sh
      cd /home/cc/hello_world
      aocl program acl0 ./bin/hello_world.aocx

Execute the host application to run on FPGA.

.. code-block:: bash

   ./bin/host

You should see an output like the following:

.. code::

   Querying platform for info:
   ==========================
   CL_PLATFORM_NAME                         = Altera SDK for OpenCL
   CL_PLATFORM_VENDOR                       = Altera Corporation
   CL_PLATFORM_VERSION                      = OpenCL 1.0 Altera SDK for OpenCL, Version 16.0

   Querying device for info:
   ========================
   CL_DEVICE_NAME                           = p385a_sch_ax115 : nalla_pcie (aclnalla_pcie0)
   CL_DEVICE_VENDOR                         = Nallatech ltd
   CL_DEVICE_VENDOR_ID                      = 4466
   CL_DEVICE_VERSION                        = OpenCL 1.0 Altera SDK for OpenCL, Version 16.0
   CL_DRIVER_VERSION                        = 16.0
   CL_DEVICE_ADDRESS_BITS                   = 64
   CL_DEVICE_AVAILABLE                      = true
   CL_DEVICE_ENDIAN_LITTLE                  = true
   CL_DEVICE_GLOBAL_MEM_CACHE_SIZE          = 32768
   CL_DEVICE_GLOBAL_MEM_CACHELINE_SIZE      = 0
   CL_DEVICE_GLOBAL_MEM_SIZE                = 8589934592
   CL_DEVICE_IMAGE_SUPPORT                  = true
   CL_DEVICE_LOCAL_MEM_SIZE                 = 16384
   CL_DEVICE_MAX_CLOCK_FREQUENCY            = 1000
   CL_DEVICE_MAX_COMPUTE_UNITS              = 1
   CL_DEVICE_MAX_CONSTANT_ARGS              = 8
   CL_DEVICE_MAX_CONSTANT_BUFFER_SIZE       = 2147483648
   CL_DEVICE_MAX_WORK_ITEM_DIMENSIONS       = 3
   CL_DEVICE_MEM_BASE_ADDR_ALIGN            = 8192
   CL_DEVICE_MIN_DATA_TYPE_ALIGN_SIZE       = 1024
   CL_DEVICE_PREFERRED_VECTOR_WIDTH_CHAR    = 4
   CL_DEVICE_PREFERRED_VECTOR_WIDTH_SHORT   = 2
   CL_DEVICE_PREFERRED_VECTOR_WIDTH_INT     = 1
   CL_DEVICE_PREFERRED_VECTOR_WIDTH_LONG    = 1
   CL_DEVICE_PREFERRED_VECTOR_WIDTH_FLOAT   = 1
   CL_DEVICE_PREFERRED_VECTOR_WIDTH_DOUBLE  = 0
   Command queue out of order?              = false
   Command queue profiling enabled?         = true
   Using AOCX: hello_world.aocx
   Reprogramming device with handle 1

   Kernel initialization is complete.
   Launching the kernel...

   Thread #2: Hello from Altera's OpenCL Compiler!

   Kernel execution is complete.
