.. _experiment-precis:

==============================
Experiment Precis
==============================

.. _ep-introduction:

Introduction
____________

Chameleon records experiment setup (OpenStack) events that users performed on the testbed, such as creating leases, creating instances, and setting up networks. 
Users can request their experiment records from Chameleon using their Chameleon credentials. A report on those experiment records is known as the *Experiment Precis*. 
An *Experiment Precis* is bounded to a lease. Chameleon defines an *experiment* as a series of testbed setup (OpenStack) events a user performed under a lease of a project. 
Using *Experiment Precis*, users will be able to analyze, understand and even replay their experiments. 

Currently, *Experiment Precis* is provided in JSON format. The following contents are included:

.. code-block:: json

   {
       "experiment_precis_name": "The name of the experiment precis",
       "experiment_precis_id":  "The id of the experiment precis",
       "site": "Which Chameleon site the experiment was performed",
       "testbed_version": "The testbed version at the time the experiment started",
       "report_time_in_utc": "The datetime when the experiment precis was requested (in UTC)",
       "report_time_in_ct": "The datetime when the experiment precis was requested (in CT)",
       "events": "A list of events performed",
       "event_page": "The page number of the events",
       "event_page_size": "The page size of the events",
       "hardware": "Hardwares that were used during the experiment",
       "hardware_page": "The page number of the hardwares",
       "hardware_page_size": "The page size of the harwareds",
       "metric": "Metrics saved in Gnocchi",
       "metric_page": "The page number of the metrics",
       "metric_page_size": "The page size of the metrics"
   }
   
.. _ep-install:

Installation
_____________

To request your experiment precis from Chameleon, you need to install the *Chameleon Experiment Precis (cep) Client*. 
To install ``cepclient`` on your local machine, run the following command:

.. code-block:: bash

   pip install cepclient
   
To test if ``cepclient`` is properly installed, run:

.. code-block:: bash

   cep --help
   
.. _ep-setup:

Setting up cep client
___________________________________________

Before using the *cep client*, you must configure the authentication-related environment variables via ``source`` :ref:`the OpenStack RC script <cli-rc-script>` 
or provide the authentication values as command parameters. If you choose to pass command parameters, use ``cep --help`` and look for ``Authentication Options`` for more information.

.. note::
   When using *rc script* for setting up *cep client*, please download and use the **v3** file.
   
.. _ep-list:

List experiment precis
_______________________

You can use ``list`` command to find all the experiments you have run. 

.. code-block:: bash

   cep list
   
The output looks like the following:

.. code::

   +---------------------+---------------------+--------------------------------------+--------------------------------------+--------------------------------------+
   | created_at          | updated_at          | id                                   | name                                 | lease_id                             |
   +---------------------+---------------------+--------------------------------------+--------------------------------------+--------------------------------------+
   | 2018-10-18 09:21:02 | 2018-10-18 09:21:02 | 0fa88391-6b14-465d-a62c-91ad8f6eb920 | 0fa88391-6b14-465d-a62c-91ad8f6eb920 | 972b70aa-33ca-42fc-9d4e-e07b2b9df3c3 |
   | 2018-10-18 10:05:50 | 2018-10-18 10:05:50 | 93ffbb79-e732-4046-a49d-b223ff8f1bd5 | 93ffbb79-e732-4046-a49d-b223ff8f1bd5 | 9f91c7ac-212b-4d46-8f88-1e9db341f41a |
   +---------------------+---------------------+--------------------------------------+--------------------------------------+--------------------------------------+
   
The *Experiment Precis* will be listed in the reverse order of *creation datetime*, i.e. the latest *Experiment Precis* is listed the first.

For more information, run:

.. code-block:: bash

   cep list --help

.. _ep-rename:

Rename experiment precis
_________________________

Initially, Chameleon sets the name of an *Experiment Precis* the same as its id. However, you can rename it for the convenience of future retrieving.
To rename an *Experiment Precis*, run the following command:

.. code-block:: bash

   cep rename --name <new_name> <ep_id or ep_name>
   
.. tip::
   Renaming your experiment precis to a meaningful name will help you 1) mark your *special* experiment; 2) understand what the experiment is about; 3) retrieve your experiment precis.

For more information, run:

.. code-block:: bash

   cep rename --help
     
.. _ep-print:

Print experiment precis
________________________

Finally, you can retrieve all the details about your experiment by using the ``print`` command.

.. code-block:: bash
   
   cep print <ep_id or ep_name>
   
The above command will print the requested experiment precis on your terminal in a compact format. To pretty-print the experiment precis, add ``--pretty`` to the command.
To print the experiment precis to a file, add ``--output <path/to/file>`` to the command.

The following is an example of ``cep print`` output:

.. code-block:: javascript
	
	{
	    "event_page": 0, 
	    "event_page_size": -1, 
	    "events": [
	        {
	            "event_time": "2018-10-18 15:05:50", 
	            "event_type": "lease.create", 
	            "metadata": {
	                "end_date": "2018-10-19T15:05:00.000000", 
	                "start_date": "2018-10-18T15:06:00.000000"
	            }, 
	            "resource_id": "9f91c7ac-212b-4d46-8f88-1e9db341f41a", 
	            "service": "blazar"
	        }, 
	        {
	            "event_time": "2018-10-18 15:06:05", 
	            "event_type": "lease.event.start_lease", 
	            "metadata": {
	                "end_date": "2018-10-19T15:05:00.000000", 
	                "start_date": "2018-10-18T15:06:00.000000"
	            }, 
	            "resource_id": "9f91c7ac-212b-4d46-8f88-1e9db341f41a", 
	            "service": "blazar"
	        }, 
	        
	        ...
	        
	        {
	            "event_time": "2018-10-19 15:05:11", 
	            "event_type": "lease.event.end_lease", 
	            "metadata": {
	                "end_date": "2018-10-19T15:05:00.000000", 
	                "start_date": "2018-10-18T15:06:00.000000"
	            }, 
	            "resource_id": "9f91c7ac-212b-4d46-8f88-1e9db341f41a", 
	            "service": "blazar"
	        }
	    ], 
	    "experiment_precis_id": "93ffbb79-e732-4046-a49d-b223ff8f1bd5", 
	    "experiment_precis_name": "zhenz-test-2", 
	    "hardware": [
	        {
	            "architecture": {
	                "platform_type": "x86_64", 
	                "smp_size": 2, 
	                "smt_size": 48
	            }, 
	            "bios": {
	                "release_date": "03/09/2015", 
	                "vendor": "Dell Inc.", 
	                "version": 1.2
	            }, 
	            "chassis": {
	                "manufacturer": "Dell Inc.", 
	                "name": "PowerEdge R630", 
	                "serial": "8Q28C42"
	            }, 
	            "gpu": {
	                "gpu": false
	            }, 
	            "links": [
	                {
	                    "href": "/sites/uc/clusters/chameleon/nodes/b0525159-5c95-4b71-83f2-b8d6bdd2acd2", 
	                    "rel": "self", 
	                    "type": "application/vnd.grid5000.item+json"
	                }, 
	                {
	                    "href": "/sites/uc/clusters/chameleon", 
	                    "rel": "parent", 
	                    "type": "application/vnd.grid5000.item+json"
	                }, 
	                {
	                    "href": "/sites/uc/clusters/chameleon/nodes/b0525159-5c95-4b71-83f2-b8d6bdd2acd2/versions/53c90ef0512d5013ee30d431cd62e68bfd34d4ca", 
	                    "rel": "version", 
	                    "type": "application/vnd.grid5000.item+json"
	                }, 
	                {
	                    "href": "/sites/uc/clusters/chameleon/nodes/b0525159-5c95-4b71-83f2-b8d6bdd2acd2/versions", 
	                    "rel": "versions", 
	                    "type": "application/vnd.grid5000.collection+json"
	                }
	            ], 
	            "main_memory": {
	                "humanized_ram_size": "128 GiB", 
	                "ram_size": 134956859392
	            }, 
	            "monitoring": {
	                "wattmeter": false
	            }, 
	            "network_adapters": [
	                {
	                    "bridged": false, 
	                    "device": "eno1", 
	                    "driver": "bnx2x", 
	                    "interface": "Ethernet", 
	                    "mac": "44:a8:42:15:c4:dd", 
	                    "management": false, 
	                    "model": "NetXtreme II BCM57800 1/10 Gigabit Ethernet", 
	                    "mounted": true, 
	                    "rate": 10000000000, 
	                    "vendor": "Broadcom Corporation"
	                }, 
	                {
	                    "bridged": false, 
	                    "device": "eno2", 
	                    "driver": "bnx2x", 
	                    "interface": "Ethernet", 
	                    "mac": "44:a8:42:15:c4:df", 
	                    "management": false, 
	                    "model": "NetXtreme II BCM57800 1/10 Gigabit Ethernet", 
	                    "mounted": false, 
	                    "rate": 10000000000, 
	                    "vendor": "Broadcom Corporation"
	                }, 
	                {
	                    "bridged": false, 
	                    "device": "eno3", 
	                    "driver": "bnx2x", 
	                    "interface": "Ethernet", 
	                    "mac": "44:a8:42:15:c4:e1", 
	                    "management": false, 
	                    "model": "NetXtreme II BCM57800 1/10 Gigabit Ethernet", 
	                    "mounted": false, 
	                    "rate": 1000000000, 
	                    "vendor": "Broadcom Corporation"
	                }, 
	                {
	                    "bridged": false, 
	                    "device": "eno4", 
	                    "driver": "bnx2x", 
	                    "interface": "Ethernet", 
	                    "mac": "44:a8:42:15:c4:e3", 
	                    "management": false, 
	                    "model": "NetXtreme II BCM57800 1/10 Gigabit Ethernet", 
	                    "mounted": false, 
	                    "rate": 1000000000, 
	                    "vendor": "Broadcom Corporation"
	                }
	            ], 
	            "node_type": "compute_skylake", 
	            "placement": {
	                "node": 14, 
	                "rack": 1
	            }, 
	            "processor": {
	                "cache_l1": null, 
	                "cache_l1d": 32768, 
	                "cache_l1i": 32768, 
	                "cache_l2": 262144, 
	                "cache_l3": 31457280, 
	                "clock_speed": 3100000000, 
	                "instruction_set": "x86-64", 
	                "model": "Intel Xeon", 
	                "other_description": "Intel(R) Xeon(R) CPU E5-2670 v3 @ 2.30GHz", 
	                "vendor": "Intel", 
	                "version": "E5-2670 v3"
	            }, 
	            "storage_devices": [
	                {
	                    "device": "sda", 
	                    "driver": "megaraid_sas", 
	                    "humanized_size": "250 GB", 
	                    "interface": "SATA", 
	                    "model": "ST9250610NS", 
	                    "rev": "AA63", 
	                    "size": 250059350016, 
	                    "vendor": "Seagate"
	                }
	            ], 
	            "supported_job_types": {
	                "besteffort": false, 
	                "deploy": true, 
	                "virtual": "ivt"
	            }, 
	            "type": "node", 
	            "uid": "b0525159-5c95-4b71-83f2-b8d6bdd2acd2", 
	            "version": "53c90ef0512d5013ee30d431cd62e68bfd34d4ca"
	        }
	    ], 
	    "hardware_page": 0, 
	    "hardware_page_size": 25, 
	    "metric_page": 0, 
	    "metric_page_size": 25, 
	    "metrics": [
	        {
	            "instance_id": "44ad06ee-41d7-48f9-a52a-179030754707", 
	            "metric_id": "dd22e02386714516a913d966659617eb", 
	            "metric_name": "interface-eno1@if_dropped"
	        }, 
	        {
	            "instance_id": "44ad06ee-41d7-48f9-a52a-179030754707", 
	            "metric_id": "512ac94754b64906a12960d1f0a929c9", 
	            "metric_name": "interface-eno1@if_errors"
	        },
	         
	        ...
            
	        {
	            "instance_id": "44ad06ee-41d7-48f9-a52a-179030754707", 
	            "metric_id": "89cec271c0fb477b9e7bb37ad3df1331", 
	            "metric_name": "memory@memory.slab_recl"
	        }
	    ],  
	    "report_time_in_ct": "2018-10-19 11:06:51", 
	    "report_time_in_utc": "2018-10-19 16:06:51", 
	    "site": "CHI_DEV_UC", 
	    "testbed_version": "702d4d47ab21c890c0bb146f4e0256f618264487"
	}
	
The ``events`` section is a list of testbed events ordered by event timestamp. The ``hardware`` section contains information of all the nodes that were used in the experiment. 
The hardware information is retrieved by using the same method as :ref:`the Resource Discovery <resource-discovery>`. The ``metrics`` section is a list of the metrics captured during the experiment. 
The *Experiment Precis* only contains the ``instance_id``, ``metric_id``, and ``metric_name`` in the ``metrics`` list. You can use :ref:`the openstack metric command line <retrieve-metric>` 
to get all the measurements of a particular metric over time for an instance. 
	
For more information, run:

.. code-block:: bash

   cep print --help
   
.. important::
   Chameleon only keeps an experiment precis for **180 days**. 
   Please make sure to save your experiment precis you'd like to keep for a longer time by using ``cep print`` command.
   You can output it to a file and keep it as a record. 
   
__________________
Pagination
__________________

In the case of "large" experiment with large number of nodes and metrics, ``events``, ``hardwares``, and ``metrics`` are printed in pages. By default, the page number is set to 0 and the page size is set to 25. 
However, you can tune the pagination by specifying the following parameters:

.. code-block:: bash

   --event-page-size EVENT_PAGE_SIZE
                        Page size for event; ignored if event is excluded; set
                        to negative value to show all
  --event-page EVENT_PAGE
                        Page number for event; ignored if event is excluded
  --metric-page-size METRIC_PAGE_SIZE
                        Page size for metric; ignored if metric is excluded;
                        set to negative value to show all
  --metric-page METRIC_PAGE
                        Page number for metric; ignored if metric is excluded
  --hardware-page-size HARDWARE_PAGE_SIZE
                        Page size for hardware; ignored if hardware is
                        excluded; set to negative value to show all
  --hardware-page HARDWARE_PAGE
                        Page number for hardware; ignored if hardware is
                        excluded
                        
.. tip::

   To show all, set page size to a negative value. If page size is negative, ``page`` parameter will be ignored. Negative value for ``page`` is not allowed. 

.. _ep-filters:

_____________________
Filters
_____________________

The ``cep`` tool provides multiple filters to help you focus on the contents you care. 

**Event Filters**

- To exclude all the events from the *Experiment Precis*, use ``--exclude-event``.
- To include or exclude services, use ``--include-services`` and/or ``--exclude-services``. 
  For example, if you only want to print ``blazar`` (reservation) and ``nova`` (instance) related events, run the following command:
  
  .. code-block:: bash
     
     cep print --pretty --include-services blazar,nova <ep_id or ep_name>
- You can exclude event metadata by passing ``--exclude-event-metadata``.
- You can apply datetime filters to your events. For example, to print events up to ``2018-10-05 00:00:00``, run:

  .. code-block:: bash
  
     cep print --pretty --end-datetime "2018-10-05 00:00:00" <ep_id or ep_name>
     
  Or to print events from ``2018-10-05 09:00:00`` to ``2018-10-05 17:00:00``, run:
  
  .. code-block:: bash
  
     cep print --pretty -start-datetime "2018-10-05 09:00:00" --end-datetime "2018-10-05 17:00:00" <ep_id or ep_name>
     
.. note::
   
   When using datetime filters, use datetime in **UTC**.
   
**Metric Filters**

- To exclude metrics from the *Experiment Precis*, use ``--exclude-metric``.

**Hardware Filters**

- To exclude hardware information from the *Experiment Precis*, use ``--exclude-hardware``.
