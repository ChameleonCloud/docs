.. _metrics:

=========================
Monitoring
=========================

Chameleon collects monitoring information, representing qualities such as CPU load or power consumption data, from various sources into an *aggregation service*. Data is kept in this service with resolution that decreases over time. Users can retrieve those metrics via a *command line interface (CLI)*.

In Chameleon, the aggregation service is implemented using the `Gnocchi time series database <https://gnocchi.xyz>`_. All Chameleon supported images, from which most of our user’s images are derived, are configured to send a selection of system metrics using the `collectd system statistics collection daemon <https://collectd.org>`_. There is a wide range of qualities this daemon can gather; by default only selected metrics are sent but users can configure the daemon (see `Configuring collectd`_) to adapt this set anytime to monitor their experiments better. Another source of metrics is the infrastructure itself, for example the energy and power consumption metrics.

.. tip:: Reading :ref:`cli` is highly recommended before continuing on the following sections.

Setting up the Gnocchi CLI
__________________________

In addition to :ref:`cli-installing`, you must also install the Gnocchi client plugin. To install on your local machine, run the following command:

.. code-block:: bash

   pip install gnocchiclient

Then, set up your environment for OpenStack command line usage, as described in :ref:`cli-rc-script`.

.. _retrieve-metric:

Retrieving Metrics
__________________

Now, you can run the ``gnocchi`` command line utility. To show the different kinds of metrics collected for a specific instance, run:

.. code-block:: bash

   gnocchi resource show <instance_id>

.. tip::
   You can get the instance' *ID* from the GUI.

   You can get your list of instances by running:

   .. code-block:: bash

      gnocchi resource list

   It will print out a chart similar to below:

   .. code::

      +--------------------------------------+---------+------------+
      | id                                   | type    | project_id |
      +--------------------------------------+---------+------------+
      | 8d643431-9a90-4100-8e00-f43d56a68d1e | generic | None       |
      | 39ff85e4-cf4e-4969-9408-af47a372ad06 | generic | None       |
      | 3c6c81ba-0566-4cde-a8c5-7ae4d4644293 | generic | None       |
      | 219f2fec-0e90-4e04-a5d7-1a78c9fde93b | generic | None       |
      | 57f2ba05-e57c-4241-bd27-bf95cca9c027 | generic | None       |
      | a0cc7bb7-0169-4973-8d4a-08151c52dec6 | generic | None       |
      | afb1d1e2-85db-463c-9769-2a2752eb447e | generic | None       |
      | 87e52c8d-c66e-43f5-b9fc-da376eccdf2d | generic | None       |
      | bf383c17-d76a-4e50-b347-426c96020d3b | generic | None       |
      | 9f25dffd-79f5-4c34-86b6-79767b8db086 | generic | None       |
      | 4b8ee1ce-9733-4808-921f-6d8ca92a6752 | generic | None       |
      | 5887a427-286f-47ad-bd4a-d7b9278bbc0f | generic | None       |
      | f5856741-89d5-462f-a0a2-f2423d9bfc38 | generic | None       |
      | fea54e18-9668-4df0-a511-5b2af4c76945 | generic | None       |
      | 304dc702-c57a-471c-81df-6e711d793e50 | generic | None       |
      +--------------------------------------+---------+------------+

You will get a result like the following:

.. code::

   +-----------------------+-------------------------------------------------------------------+
   | Field                 | Value                                                             |
   +-----------------------+-------------------------------------------------------------------+
   | created_by_project_id | 2c8f25efb722467eb9fc25f38996b7c4                                  |
   | created_by_user_id    | 7961a8c338ba4cb8a4ac6dfe0ab333f5                                  |
   | creator               | 7961a8c338ba4cb8a4ac6dfe0ab333f5:2c8f25efb722467eb9fc25f38996b7c4 |
   | ended_at              | None                                                              |
   | id                    | 304dc702-c57a-471c-81df-6e711d793e50                              |
   | metrics               | interface-eno1@if_dropped: 511abf80-d9e9-4e37-bde6-b34de19a7a87   |
   |                       | interface-eno1@if_errors: 7bf316e3-ce63-424c-955c-1654541dafea    |
   |                       | interface-eno1@if_octets: 0b9a204b-38fd-4b4f-a5a1-c25b9b739c5c    |
   |                       | interface-eno1@if_packets: a62006be-d45a-4b2c-a201-4f1b4770f43c   |
   |                       | interface-eno2@if_dropped: 56bd5603-ed8c-401c-891e-05170e3b40a7   |
   |                       | interface-eno2@if_errors: 5d2d1a60-1ca8-4256-a395-0125428cf395    |
   |                       | interface-eno2@if_octets: 3f3daf4b-2ef8-4383-b031-294e51487ae9    |
   |                       | interface-eno2@if_packets: 0aa3fb64-764f-402b-b9eb-6fb47e3d0efc   |
   |                       | interface-eno3@if_dropped: 23c59f0f-d018-4538-a387-90bd5809a0f0   |
   |                       | interface-eno3@if_errors: c8ab32bb-02e7-48f7-8a67-92cf96aa6974    |
   |                       | interface-eno3@if_octets: be37ef63-9ed5-4547-851e-46f1aa2e91d6    |
   |                       | interface-eno3@if_packets: 149ae533-2f03-4a87-91a6-6aa0f8a541b3   |
   |                       | interface-eno4@if_dropped: 6b8285d5-7e87-4f10-8abc-1ac848bf8240   |
   |                       | interface-eno4@if_errors: 0dcd9925-c6e6-480d-88cb-6eb099cd4650    |
   |                       | interface-eno4@if_octets: 4ff866fd-d5ef-4a55-aeab-7cfbe1ac1f28    |
   |                       | interface-eno4@if_packets: 0fe10bf7-79ab-4bfb-aa6b-64efd3b925c1   |
   |                       | interface-lo@if_dropped: 39318dc7-f008-4258-8832-457c90193924     |
   |                       | interface-lo@if_errors: f3998907-786f-4ffd-a47b-bea1f4b9ad97      |
   |                       | interface-lo@if_octets: f01791f8-8939-4bf3-aae7-abb1e4bffc2e      |
   |                       | interface-lo@if_packets: 6aaf06ee-5a8d-49f2-b7b9-c1d27841a89b     |
   |                       | load@load: 8d6132f8-6e60-409b-8d64-7092491aa9db                   |
   |                       | memory@memory.buffered: a6ad6e20-f951-4152-aac3-d6d081c33c09      |
   |                       | memory@memory.cached: ca0e3b30-b450-484b-ac41-a03424da279b        |
   |                       | memory@memory.free: 7aee53a8-93f9-4bac-92e3-7694b219c698          |
   |                       | memory@memory.slab_recl: 074897b8-c40e-4538-9ef6-69338764bed3     |
   |                       | memory@memory.slab_unrecl: 1bb6c19d-e788-40cd-98f0-0c5820e03563   |
   |                       | memory@memory.used: 8b56e1ea-0aaa-4c1b-9462-f3698bad2ca7          |
   | original_resource_id  | 304dc702-c57a-471c-81df-6e711d793e50                              |
   | project_id            | None                                                              |
   | revision_end          | None                                                              |
   | revision_start        | 2018-02-15T15:42:18.495824+00:00                                  |
   | started_at            | 2018-02-15T15:42:18.495781+00:00                                  |
   | type                  | generic                                                           |
   | user_id               | None                                                              |
   +-----------------------+-------------------------------------------------------------------+

To get all the measurements of a particular metric, run:

.. code-block:: bash

   gnocchi measures show <metric_name> --resource-id <instance_id> --refresh

For example, to get measurements of used memory over time for instance ``d17d5191-af60-4407-9ed2-e3d48e86ac6d``, run:

.. code-block:: bash

   gnocchi measures show memory@memory.used --resource-id d17d5191-af60-4407-9ed2-e3d48e86ac6d --refresh

.. tip:: You may notice that each metric has been assigned a *UUID* to it. Therefore, instead of providing ``metric name``, you can provide ``metric uuid``.

This will show the latest measurements of that metric with granularity set to 1.0, as well as aggregate values (by default, the mean) over one minute and one hour. Other aggregation methods can be used with the ``--aggregation`` option, such as ``std``, ``count``, ``min``, ``max`` and ``sum``. Your results may appear like this:

.. code::

   +---------------------------+-------------+---------------+
   | timestamp                 | granularity |         value |
   +---------------------------+-------------+---------------+
   | 2017-12-22T18:00:00+01:00 |      3600.0 |  1222193280.0 |
   | 2017-12-22T18:01:00+01:00 |        60.0 |  1222684672.0 |
   | 2017-12-22T18:02:00+01:00 |        60.0 | 1222394538.67 |
   | 2017-12-22T18:03:00+01:00 |        60.0 | 1222147413.33 |
   | 2017-12-22T18:01:20+01:00 |         1.0 |  1222684672.0 |
   | 2017-12-22T18:01:30+01:00 |         1.0 |  1222684672.0 |
   | 2017-12-22T18:01:40+01:00 |         1.0 |  1222684672.0 |
   | 2017-12-22T18:01:50+01:00 |         1.0 |  1222684672.0 |
   | 2017-12-22T18:02:00+01:00 |         1.0 |  1222684672.0 |
   | 2017-12-22T18:02:10+01:00 |         1.0 |  1222684672.0 |
   | 2017-12-22T18:02:20+01:00 |         1.0 |  1222684672.0 |
   | 2017-12-22T18:02:30+01:00 |         1.0 |  1221943296.0 |
   | 2017-12-22T18:02:40+01:00 |         1.0 |  1222438912.0 |
   | 2017-12-22T18:02:50+01:00 |         1.0 |  1221931008.0 |
   | 2017-12-22T18:03:00+01:00 |         1.0 |  1221931008.0 |
   | 2017-12-22T18:03:10+01:00 |         1.0 |  1221931008.0 |
   | 2017-12-22T18:03:20+01:00 |         1.0 |  1221931008.0 |
   | 2017-12-22T18:03:30+01:00 |         1.0 |  1222373376.0 |
   | 2017-12-22T18:03:40+01:00 |         1.0 |  1222369280.0 |
   | 2017-12-22T18:03:50+01:00 |         1.0 |  1222348800.0 |
   +---------------------------+-------------+---------------+

By default, metrics are stored with an archive policy set to "high", which is defined to keep data as:

- Per second granularity for the last hour
- Per minute granularity for the last week
- Per hour granularity for a year

However, note that since ``collectd`` is configured to collect metrics only every 10 seconds, there is no metric measurement for each second but every 10 seconds.

.. _configure-collectd:

________________________
Configuring ``collectd``
________________________

While only a few ``collectd`` plugins are enabled by default, you can leverage the large collection of `available plugins <https://collectd.org/wiki/index.php/Table_of_Plugins>`_. To enable a plugin on your instance, edit the instance's ``/etc/collectd.conf`` file. Uncomment each ``LoadPlugin <plugin_name>`` line that you wish to enable. Then, restart collectd with the command:

.. code-block:: bash

   sudo systemctl restart collectd

The ``collectd`` configured to send measurements by batch to minimize network traffic. However, if you want to avoid any interference during your experiments, you can disable ``collectd`` with the command:

.. code-block:: bash

   sudo systemctl stop collectd && sudo systemctl disable collectd

_____________________________________________
Metrics for bare metal nodes
_____________________________________________

Chameleon automatically collects power usage and temperature data on all nodes in the system. Instantaneous power usage data (in watts) and temperature readings (in Celsius) are collected through the IPMI interface on the chassis controller for the nodes. This “out-of-band” approach does not consume additional power on the node itself and runs even when the node is powered off.

.. attention::
    Temperature metrics are currently collected from the CPU sensor on each node. These temperature readings are only reported while the node is powered on.

As with the system metrics, retrieving these automatically collected metrics for a node requires the OpenStack CLI and Gnocchi client plugin (see installation instructions `Setting up the Gnocchi CLI`_ above). To get a list of metrics available for a node, use this command:

.. code-block:: bash

   $ gnocchi resource show <node_uuid>

To retrieve a specifc reading:

.. code-block:: bash

   $ gnocchi measures show <reading-name> --resource-id=<node_uuid> --refresh

.. tip::
   The node UUID and the instance UUID are different. You can get a node's UUID for a reservation from the Horizon GUI (https://chi.tacc.chameleoncloud.org for TACC reservations, https://chi.uc.chameleoncloud.org for UC reservations).  Click on your lease name from within the list of leases on the Leases subtab within the Reservations tab. The node UUID is at the very bottom under the ``Nodes`` section.  You can also find an individual instance node UUID on the instance details page.  Click on your instance name on the Instances tab and see ``Physical Host Name``

For example, issuing the following command:

.. code-block:: bash

   $ gnocchi measures show power --resource-id=05dd5e25-440f-4492-b3b8-9d39af83b8bc --refresh

returns the following power results for node with id ``05dd5e25-440f-4492-b3b8-9d39af83b8bc``. The output below has been truncated:

.. code::

    +---------------------------+-------------+--------------------+
    | timestamp                 | granularity |              value |
    +---------------------------+-------------+--------------------+
    | 2018-03-21T07:00:00-05:00 |      3600.0 | 3.6990394736842047 |
    | 2018-03-21T08:00:00-05:00 |      3600.0 | 3.6944069767441814 |
    | 2018-03-21T09:00:00-05:00 |      3600.0 | 3.7072767295597435 |
    | 2018-03-21T10:00:00-05:00 |      3600.0 |  3.674499999999995 |
    | 2018-03-21T11:00:00-05:00 |      3600.0 |  3.708236024844716 |
    | 2018-03-21T12:00:00-05:00 |      3600.0 | 3.6747818181818137 |
    | 2018-03-21T13:00:00-05:00 |      3600.0 |  3.706847058823526 |

    . . . . . .

    | 2018-05-07T08:17:43-05:00 |         1.0 |              3.537 |
    | 2018-05-07T08:18:03-05:00 |         1.0 |              3.996 |
    | 2018-05-07T08:18:23-05:00 |         1.0 |              3.847 |
    | 2018-05-07T08:19:03-05:00 |         1.0 |              4.145 |
    | 2018-05-07T08:19:23-05:00 |         1.0 |              4.145 |
    | 2018-05-07T08:19:43-05:00 |         1.0 |              3.686 |
    | 2018-05-07T08:20:03-05:00 |         1.0 |              3.847 |
    | 2018-05-07T08:20:23-05:00 |         1.0 |              3.686 |
    | 2018-05-07T08:20:43-05:00 |         1.0 |              3.847 |
    +---------------------------+-------------+--------------------+

To retrieve a metric for a specific time interval, pass the ``start`` and ``stop`` parameters; for example:

.. code::

    $ gnocchi measures show temperature_cpu --start 2018-11-27T02:00:00 --stop 2018-11-27T03:00:00 --resource-id=f3f47a67-d805-48d4-9584-f0143ae976cf --refresh

returns:

.. code::

    +---------------------------+-------------+---------------+
    | timestamp                 | granularity |         value |
    +---------------------------+-------------+---------------+
    | 2018-11-27T02:00:00-06:00 |       300.0 |          61.0 |
    | 2018-11-27T02:05:00-06:00 |       300.0 |          61.0 |
    | 2018-11-27T02:10:00-06:00 |       300.0 |          61.0 |
    | 2018-11-27T02:15:00-06:00 |       300.0 |          61.0 |
    | 2018-11-27T02:20:00-06:00 |       300.0 |          58.6 |
    | 2018-11-27T02:25:00-06:00 |       300.0 | 56.5333333333 |
    | 2018-11-27T02:30:00-06:00 |       300.0 |          56.0 |
    | 2018-11-27T02:35:00-06:00 |       300.0 |          56.0 |
    | 2018-11-27T02:40:00-06:00 |       300.0 |          56.0 |
    | 2018-11-27T02:45:00-06:00 |       300.0 |          56.0 |
    | 2018-11-27T02:50:00-06:00 |       300.0 |          56.0 |
    | 2018-11-27T02:55:00-06:00 |       300.0 |          56.0 |
    +---------------------------+-------------+---------------+

_________________________________________________________
Energy and Power Consumption Measurement with ``etrace2``
_________________________________________________________

The `CC-CentOS7 <https://www.chameleoncloud.org/appliances/1/>`_, `CC-CentOS8 <https://www.chameleoncloud.org/appliances/83/>`_, `CC-Ubuntu16.04 <https://www.chameleoncloud.org/appliances/19/>`_ and `CC-Ubuntu18.04 <https://www.chameleoncloud.org/appliances/69/>`_ appliances,
as well as all Chameleon supported images dervied from them, now include support for reporting energy and power consumption of each CPU socket and of memory DIMMs.
It is done with the ``etrace2`` utility which relies on the `Intel RAPL (Running Average Power Limit) <https://01.org/blogs/2014/running-average-power-limit-%E2%80%93-rapl>`_ interface.

.. attention::
   Currenly, ``etrace2`` requires a kernel feature that is not supported on our ARM nodes.

To spawn your program and print energy consumption:

.. code-block:: bash

   etrace2 <your_program>

To print power consumption every 0.5 second:

.. code-block:: bash

   etrace2 -i 0.5 <your_program>

To print power consumption every 1 second for 10 seconds:

.. code-block:: bash

   etrace2 -i 1.0 -t 10

For example, to report energy consumption during the generation of a large RSA private key:

.. code::

   $ etrace2 openssl genrsa -out private.pem 4096
   # ETRACE2_VERSION=0.1
   Generating RSA private key, 4096 bit long modulus
   ..............................................................................................................................................................................................................................................................................................................++
   .............................................................................................................................................................++
   e is 65537 (0x10001)
   # ELAPSED=2.579472
   # ENERGY=365.788208
   # ENERGY_SOCKET0=99.037841
   # ENERGY_DRAM0=78.577698
   # ENERGY_SOCKET1=109.230103
   # ENERGY_DRAM1=80.336548

The energy consumption is reported in joules.

``etrace2`` reports power and energy consumption of CPUs and memory of the node during the entire execution of the program. This will include consumption of other programs running during this period, as well as power and energy consumption of CPUs and memory under idle load.

Note the following caveats:

- `Intel <https://01.org/blogs/2014/running-average-power-limit-%E2%80%93-rapl>`_ documents that the RAPL is not an analog power meter, but rather uses a software power model. This software power model estimates energy usage by using hardware performance counters and I/O models. Based on their measurements, they match actual power measurements.
- In some situations the total *ENERGY* value is incorrectly reported as a value equal or close to zero. However, the sum of *ENERGY_SOCKET* and *ENERGY_DRAM* values should be accurate.
- Monitoring periods larger than 10-15 minutes may be inaccurate due to RAPL registers overflowing if they're not read regularly.

This `utility <https://github.com/coolr-hpc/intercoolr>`_  was contributed by Chameleon user `Kazutomo Yoshii <http://www.mcs.anl.gov/person/kazutomo-yoshii>`_ of `Argonne National Laboratory <http://www.anl.gov/>`_.

.. note::
   The Linux kernel version of `CC-Ubuntu16.04 <https://www.chameleoncloud.org/appliances/19/>`_ is too old to use ``etrace2`` on Chameleon **Skylake** nodes.
   To solve the problem, simply upgrade the Linux kernel.
