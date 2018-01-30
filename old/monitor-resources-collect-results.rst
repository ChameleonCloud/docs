Monitor resources and collect results
=====================================

System metrics
--------------

The default Chameleon image is configured to send a selection of system
metrics to the OpenStack Ceilometer service. \ **Visualizing these
metrics is not yet supported in the web interface**. To collect metrics,
use the ``ceilometer`` command line tool. First, install it on our own
machine (laptop or workstation) by \ `following the instructions of the
OpenStack
documentation <http://docs.openstack.org/user-guide/common/cli_install_openstack_command_line_clients.html>`__.

Then, set up your environment for OpenStack command line usage, as
described in the |Link|.

Now, you can run the Ceilometer command line utility. To show the
different kinds of metrics collected by Ceilometer,
run: \ ``ceilometer meter-list -q 'resource_id=<instance_id>'``

To get all the samples of a particular metric,
run: \ ``ceilometer sample-list -m <meter_name> -q 'resource_id=<instance_id>'``

The following metrics are collected by Ceilometer:

-  hardware.cpu.load.15min
-  hardware.cpu.load.1min
-  hardware.cpu.load.5min
-  hardware.disk.size.total
-  hardware.disk.size.used
-  hardware.memory.avail
-  hardware.memory.swap
-  hardware.memory.total
-  hardware.memory.used
-  hardware.network.incoming.bytes
-  hardware.network.ip.incoming.datagrams
-  hardware.network.ip.outgoing.datagrams
-  hardware.network.outgoing.bytes
-  hardware.network.outgoing.errors
-  hardware.system\_stats.cpu.idle
-  hardware.system\_stats.io.incoming.blocks
-  hardware.system\_stats.io.outgoing.blocks

Energy and power consumption
----------------------------

Our \ |Link| and |Link| appliances now include support for reporting
energy and power consumption of each CPU socket and of memory DIMMs. It
is done with the ``etrace2`` utility which relies on the Intel RAPL
(Running Average Power Limit) interface:

``# spawn your program and print energy consumption  $ etrace2 your_program``

``# also print power consumption every 0.5 sec $ etrace2 -i 0.5 your_program``

``# just print power consumption every 1sec for 10sec $ etrace2 -i 1.0 -t 10``

For example, to report energy consumption during the generation of
a large RSA private key:

``$ etrace2 openssl genrsa -out private.pem 4096 # ETRACE2_VERSION=0.1 Generating RSA private key, 4096 bit long modulus ..............................................................................................................................................................................................................................................................................................................++ .............................................................................................................................................................++ e is 65537 (0x10001) # ELAPSED=2.579472 # ENERGY=365.788208 # ENERGY_SOCKET0=99.037841 # ENERGY_DRAM0=78.577698 # ENERGY_SOCKET1=109.230103 # ENERGY_DRAM1=80.336548``

The energy consumption is reported in joules.

etrace2 reports power and energy consumption of CPUs and memory of the
node during the entire execution of the program. This will include
consumption of other programs running during this period, as well as
power and energy consumption of CPUs and memory under idle load.

Note the following caveats:

-  This utility is compatible with all our hardware, except for Intel
   Atom nodes released in December 2016. We are hoping to extend support
   for them in the future.
-  |Link| documents that the RAPL is not an analog power meter, but
   rather uses a software power model. This software power model
   estimates energy usage by using hardware performance counters and I/O
   models. Based on their measurements, they match actual power
   measurements.
-  In some situations the total ENERGY value is incorrectly reported as
   a value equal or close to zero. However, the sum of ENERGY\_SOCKET
   and ENERGY\_DRAM values should be accurate.
-  Monitoring periods larger than 10-15 minutes may be inaccurate due to
   RAPL registers overflowing if they're not read regularly.

This |Link| was contributed by Chameleon user |Link| of |Link|.

.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16753
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16992
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16993
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_17000
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16994
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16996
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16997
