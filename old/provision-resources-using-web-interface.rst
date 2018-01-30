Provision resources (using the web interface)
=============================================

Unlike virtual resources on a regular on-demand cloud,
physical resources on Chameleon must be reserved before using them
for an experiment. Once a reservation has been accepted, users are
guaranteed that resources will be available at the time they chose
(except in extraordinary circumstances such as hardware or platform
failures), which helps to plan large scale experiments.

Chameleon resources are reserved via Blazar (previously known as
Climate) which provides Reservation as a Service for OpenStack. It is
available in the Horizon web interface (OpenStack Dashboard) via the
Reservation dashboard.

To access it, first log into the Horizon web interface using the same
credentials as the Chameleon user portal.

-  CHI@UC: https://chi.uc.chameleoncloud.org/
-  CHI@TACC: https://chi.tacc.chameleoncloud.org/

|Picture|

You should land on the Compute overview page for your default
project. The pie charts on the page will show you what the current usage
of things like instances and floating IPs is relative to the limit for
your project. The usage summary will show historical usage of your
project for a time period that can be selected. The usage box will show
information about the instances currently running in your project.

|Picture|

You can select the project that you want to use via the list at the
right of the logo. This guide uses the Chameleon project, but any
project will work the same.

|Picture|

Configure your local timezone by clicking on your username in the
top-right corner and choosing **Settings**. This will open a page where
you can select your local timezone. For example, if you are in the North
American Central Time Zone, select \ *UTC -06:00: United States
(Chicago) Time*. Then, click Save.

|Picture|

To access the reservation system, click on Project > Reservations >
Leases.

|Picture|

To discover when resources are available, access the lease calendar.
This will display a Gantt chart of the reservations which allows you to
find when resources are available. The Y axis represents the different
physical nodes in the system and the X axis represents time.

|Picture|

Once you have chosen a time period when you want to reserve resources,
go back to the Leases screen and click on "Create Lease". It should
bring up the window displayed below:

|Picture|

#. Pick a name for the lease. This name needs to be unique across your
   project. This example uses the name my-first-lease.
#. Pick a start time; if you want to create your lease soon pick a start
   time in the near future.
   **Note that if you have not selected a timezone earlier, the date
   must be entered in UTC!** You can get the UTC time by running “date
   -u” in your terminal.
#. Pick an end time.
#. Choose the number of hosts, it is 1 by default.
#. Click on the “Create” button

Once created the lease details will be displayed. At the bottom of the
page are the details about the reservation. Initially the reservation is
in the Pending status, and stays in this state until we reach the start
time.

|Picture|

Once the start time of the lease is reached, the lease will be started
and its reservation will change to "Active"; you may need to refresh the
page to see this.

.. raw:: html

   <div
   style="background: #eee; border: 1px solid #ccc; padding: 5px 10px;">

**Note: **\ To ensure fairness to all users, resource reservations
(leases) are limited to a duration of 7 days. However, an active lease
within 48 hours of its end time can be prolonged by up to 7 days from
the moment of request if resources are available. To prolong a lease,
click on the “Update Lease” button in the Reservations panel of the CHI
OpenStack dashboard, and enter the additional duration requested in the
“Prolong for” box including the unit suffix, e.g. “5d” for 5 days or
“30m” for 30 minutes. If there is an advance reservation blocking your
lease prolongation that could potentially be moved, you can interact
through the users mailing list to coordinate with others users.
Additionally, if you know from the start that your lease will require
longer than a week and can justify it, you can |Link| to request a
one-time exception to create a longer lease.

.. raw:: html

   </div>

Next Step
---------

Now that you have created a lease, it is time to configure some
resources! You will find instructions to the next step by visiting one
of the following links:

-  `Configure and interact with resources (using the web
   interface) <https://www.chameleoncloud.org/configure-and-interact>`__
-  |Link|

.. |Picture| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_12195
.. |Picture| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_12197
.. |Picture| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_12199
.. |Picture| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_14983
.. |Picture| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_12201
.. |Picture| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_12203
.. |Picture| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_12205
.. |Picture| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_12209
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_17133
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16702
