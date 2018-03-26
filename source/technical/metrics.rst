=========================
Metrics
=========================

Chameleon implements resource monitoring and data collection. Bare metal nodes launched using the `CC-CentOS7 <https://www.chameleoncloud.org/appliances/1/>`_ appliance automatically use the `collectd <https://collectd.org>`_ daemon to send metrics to Chameleon. Chameleon stores these metrics using the `Gnocchi <https://gnocchi.xyz>`_ time series database. The type of metrics that are collected can be modified, and metrics may be retrieved using the CLI. Currently, visualization of metrics is not yet supported in the GUI.

.. note:: Gnocchi metrics are currently available only at CHI@UC. Gnocchi will be available at CHI@TACC in the future.

__________________________
Using the Gnocchi CLI
__________________________

Setting up the Gnocchi CLI
__________________________

In addition to :ref:`cli-installing`, you must also install the Gnocchi client plugin. On your local machine, use the command:

.. code-block:: bash

   pip install gnocchiclient

Retrieving Metrics
__________________

Make sure that you have also set environment variables in your terminal session to access your project, using :ref:`cli-rc-script`. Metrics are stored by instance ID. You may retrieve an instance's ID by selecting it in the GUI. Each instance is called a *Resource* in Gnocchi. You may view all Resources by using the command:

.. code-block:: bash

   openstack metric resource list

You may receive a result that looks like this:

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

Each ``id`` corresponds to an instance ID, including instances that have previously existed but are no longer running. You may view a list of measurements being taken on an instance with the command:

.. code-block:: bash

   openstack metric resource show <id>

The ``id`` parameter is a resource or instance Id. This will display results that may look like this:

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

Each metric is also assigned a UUID which is unique to the metric on that particular instance. To retrieve all measurements of a particular metric, use the command:

.. code-block:: bash

   openstack metric measures show <metric_uuid> --refresh

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

However, note that since collectd is configured to collect metrics only every 10 seconds, there is no metric measurement for each second but every 10 seconds.

________________________
Configuring ``collectd``
________________________

While only a few collectd plugins are enabled by default, you can leverage the large collection of `available plugins <https://collectd.org/wiki/index.php/Table_of_Plugins>`_. To enable a plugin on your instance, edit the instance's ``/etc/collectd.conf`` file. Uncomment each ``LoadPlugin <plugin_name>`` line that you wish to enable. Then, restart collectd with the command:

.. code-block:: bash

   sudo systemctl restart collectd

The collectd configured to send measurements by batch to minimize network traffic. However, if you want to avoid any interference during your experiments, you can disable collectd with the command:

.. code-block:: bash

   sudo systemctl stop collectd && sudo systemctl disable collectd

_________________________________________________________
Energy and Power Consumption Measurement with ``etrace2``
_________________________________________________________

The `CC-CentOS 7 <https://www.chameleoncloud.org/appliances/1/>`_ and `CC-Ubuntu16.04 <https://www.chameleoncloud.org/appliances/19/>`_ appliances now include support for reporting energy and power consumption of each CPU socket and of memory DIMMs. It is done with the ``etrace2`` utility which relies on the Intel RAPL (Running Average Power Limit) interface. From within your instance, you may use the terminal command:

.. code-block:: bash

   etrace2 <your_program>

``etrace2`` also supports reporting using set intervals and durations, and can be used for all processes. For example, to print power consumption every second for 10 seconds for the entire system, use the command:

.. code-block:: bash

   etrace2 -i 1.0 -t 10

Your output may appear like this:

.. code::

   # ELAPSED=2.579472
   # ENERGY=365.788208
   # ENERGY_SOCKET0=99.037841
   # ENERGY_DRAM0=78.577698
   # ENERGY_SOCKET1=109.230103
   # ENERGY_DRAM1=80.336548

The energy consumption is reported in joules.

``etrace2`` reports power and energy consumption of CPUs and memory of the node during the entire execution of the program. This will include consumption of other programs running during this period, as well as power and energy consumption of CPUs and memory under idle load.

Note the following caveats:

- This utility is compatible with all our hardware, except for Intel Atom nodes released in December 2016. We are hoping to extend support for them in the future.
- Intel documents that the RAPL is not an analog power meter, but rather uses a software power model. This software power model estimates energy usage by using hardware performance counters and I/O models. Based on their measurements, they match actual power measurements.
- In some situations the total ENERGY value is incorrectly reported as a value equal or close to zero. However, the sum of ENERGY_SOCKET and ENERGY_DRAM values should be accurate.
- Monitoring periods larger than 10-15 minutes may be inaccurate due to RAPL registers overflowing if they're not read regularly.

This `utility <https://github.com/coolr-hpc/intercoolr>`_  was contributed by Chameleon user `Kazutomo Yoshii <http://www.mcs.anl.gov/person/kazutomo-yoshii>`_ of `Argonne National Laboratory <http://www.anl.gov/>`_.
