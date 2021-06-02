.. _project-management:

==================
Project management
==================

Project management tasks, such as adding users to your project or requesting a
renewal, is performed through the portal at https://chameleoncloud.org. After
you have `registered <https://www.chameleoncloud.org/user/register/>`_ and
verified your email address, you may `login to the portal
<https://www.chameleoncloud.org/login/>`_. Once logged in, you should be at
*Dashboard* page automatically. If not, you can access your *Dashboard* via the
dropdown list on top right of the screen.

.. _dashboard-page:

Dashboard
=========

The Dashboard's main page consists of two control panels - the *Active Projects*
control panel and the *Open Tickets* panel.

.. figure:: project/dashboard.png
  :alt: The project dashboard

  The project dashboard

The *Active Projects* control panel allows you to view all your active projects
and their current usage. You may click on a project to view details.

The *Open Tickets* panel lists all your active help desk tickets. In addition,
you can `Open a Ticket <https://www.chameleoncloud.org/user/help/ticket/new/>`_
via the *Open Tickets* panel.

.. _projects-page:

Projects
========

The Dashboard's `Projects Page <https://www.chameleoncloud.org/user/projects/>`_
allows you to manage your current projects.

.. figure:: project/projects.png
  :alt: Project list

  Project list

Each individual *Project* has its own:

- Service Unit allocations
- Users that have access to the project
- System resources such as *Security Groups*, *Floating IP Addresses* and
  *Instances*
- Assets such as snapshots, object containers, metrics and network configuration

Creating a Project
------------------

To create a project, click the *+Create a Project* button. After filling out and
submit the request form, a system administrator will review your request and
notify you once your project get approved. Project durations are six months with
a default allocation of 20,000 :ref:`service-units`.

.. figure:: project/createproject.png
  :alt: The Create a New Project form

  The Create a New Project form

.. _service-units:

Service Units
-------------

One Service Unit (SU) is equivalent to one hour of usage of one allocatable
resource (physical hosts, network segments, or floating IPs). For example, a
reservation for 5 Skylake compute nodes for 8 hours would use 40 SUs. However,
for certain types of resources, more SUs will be charged. For more details about
allocation charges, please see `here
<https://www.chameleoncloud.org/learn/frequently-asked-questions/#toc-what-are-the-units-of-an-allocation-and-how-am-i-charged->`_.

.. _project-details:

Project Details
---------------

Clicking on a project from either the :ref:`dashboard-page` main page or the
:ref:`projects-page` page will allow you to manage one of your approved
*Projects*.

.. figure:: project/projectdetails.png
  :alt: Project details

  Project details

In the details page of your project, you may :ref:`recharge or extend your
allocation <recharge-extend-allocation>` and :ref:`manage users <manage-users>`
of your project.

.. _recharge-extend-allocation:

Recharge or Extend Your Allocation
----------------------------------

In the *Allocations* section of your :ref:`project-details`, you may view your
project start and end dates, current *Service Unit* usage and request a *Service
Unit* recharge or project extension. To request a *Service Unit* recharge or
*Project* extension, click the link next to your project in the *Actions* column
of this section.

.. _manage-users:

Manage Users
------------

To manage users of a *Project*, use the *Project Users* section in the
:ref:`project-details`. While each user has their own Chameleon User account
independent of your project, they may be added to one or more projects. Being a
user of a *Project* **does not** require a :ref:`PI eligibility
<pi-eligibility>`.

.. important::

   For *Project* PIs, it is highly recommended that your *Project* users should
   have their own non-PI Chameleon accounts and should be added to your project.

You may add a user to your account by filling out their user name or email
address and clicking the *Add user* button. You may remove a user from your
project by locating their user name in the user list and clicking the *-* button
next to their user name.
