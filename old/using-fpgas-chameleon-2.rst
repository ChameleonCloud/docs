Using FPGAs on Chameleon
========================

Chameleon provides access to four FPGA nodes. Each of these nodes is
fitted with a `Nallatech 385A
board <http://www.nallatech.com/store/pcie-accelerator-cards/nallatech-385a-arria10-1150-fpga/>`__
with an Altera Arria 10 1150 GX FPGA (up to 1.5 TFlops), 8 GB DDR3
on-card memory, and dual QSFP 10/40 GbE support. They are configured to
run OpenCL code, but they can be reconfigured (by a request to our `help
desk <https://www.chameleoncloud.org/user/help/>`__) to run compiled
designs prepared with Altera Quartus.

Due to export control limitations, access to the development toolchain
requires verification of your user profile. This guide explains how to
gain access to the development toolchain and execute code on the FPGA
nodes.

Development
-----------

Chameleon provides a build system that includes the necessary `Altera
SDK for
OpenCL <https://www.altera.com/products/design-software/embedded-software-developers/opencl/overview.html>`__
tools for developing kernels for use on the `Nallatech
385A <http://www.nallatech.com/store/pcie-accelerator-cards/nallatech-385a-arria10-1150-fpga/>`__
cards, using the Altera Arria 10 FPGA.

Due to licensing requirements, you must apply for access to the FPGA
build system. Submit a ticket through our `help
system <https://www.chameleoncloud.org/user/help/>`__ to request access.

Due to TACC’s security requirements, multi-factor authentication must be
used to access the FPGA build system. You can either use a smartphone
app (Apple iOS or Android) or SMS messaging: follow this
`documentation <https://portal.tacc.utexas.edu/tutorials/multifactor-authentication>`__
to set it up. Once you have set up multi-factor authentication, you can
SSH to fpga01.tacc.chameleoncloud.org with your Chameleon username and
password; you will also be asked for a TACC security token, which will
be provided to you via the app or SMS.

Each user's home directory will contain an archive file containing a
Hello World OpenCL example:
``exm_opencl_hello_world_x64_linux_16.0.tgz``. Extract the archive with
the following command:

::

    $ tar -zxf exm_opencl_hello_world_x64_linux_16.0.tgz

Two directories will be extracted: ``common`` and ``hello_world``.
Change into the ``hello_world`` directory.

::

    $ cd hello_world

Compiling an OpenCL kernel often takes a very long time, so it is
essential to debug by using the emulation feature of the compiler using
``-march=emulator`` in the compiler command. Note that the
``--board p385a_sch_ax115`` parameter is required, and correctly
identifies the FPGA boards available on Chameleon. Do not alter this
parameter. In this example, the host application requires the output
name to be ``hello_world.aocx``, so this parameter must also be
unchanged.

::

    $ aoc --board p385a_sch_ax115 device/hello_world.cl -o bin/hello_world.aocx -march=emulator

Build the host application, which is used to execute the OpenCL kernel.

::

    $ make

Now run the emulated kernel.

::

    $ env CL_CONTEXT_EMULATOR_DEVICE_ALTERA=1 ./bin/host

When debugging is complete, and the code is ready to be compiled for the
FPGA hardware, remove the emulation flag. This may take several hours to
complete, so we recommend you run it inside a terminal multiplexer, such
as screen or tmux which are both installed on the build node.

::

    $ aoc --board p385a_sch_ax115 device/hello_world.cl -o bin/hello_world.aocx

Execution
---------

| After completing development of an OpenCL kernel on our build node,
  the kernel and host application must be transferred and executed on a
  node with an FPGA accelerator.
| When using the `CHI@TACC
  dashboard <https://chi.tacc.chameleoncloud.org/>`__ to reserve nodes,
  use the “Node Type to Reserve” selector and choose “FPGA”.
  Alternatively, use the `Resource Discovery web
  interface <https://www.chameleoncloud.org/user/discovery/>`__ to
  reserve a node equipped with an FPGA accelerator card by filtering the
  node selection using the “with FPGA” button, and clicking “Reserve” at
  the bottom of the selection. Copy the generated CLI command and use it
  to create your reservation. Details for CLI usage can be found in the
  |Link - Bare Metal User Guide|.

In order to have access to the required runtime environment for using
the FPGAs, use the image “CC-CentOS7-FPGA” when launching your instance.

Log in to the instance, download the application code (both
``common`` and ``hello_world`` directories) from the build system using
scp, and change into the ``hello_world`` directory:

::

    $ scp -r <username>@fpga01.tacc.chameleoncloud.org:~/common .
    $ scp -r <username>@fpga01.tacc.chameleoncloud.org:~/hello_world .
    $ cd hello_world

Compile the host application, if necessary.

::

    $ make

Program FPGA with the OpenCL kernel, using ``aocl0`` as the device name.

::

    $ aocl program acl0 ./bin/hello_world.aocx

Execute the host application to run on FPGA.

::

    $ ./bin/host

You should see an output like the following:

::

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

.. |Link - Bare Metal User Guide| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_17019
