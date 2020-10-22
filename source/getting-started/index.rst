
.. _InCommon: https://incommon.org/federation

.. _getting-started:

================
Getting started
================

This guide will walk you through the initial steps of getting an account,
joining a project and working with your first instance.

.. contents:: :local:

.. _getting-started-user:

Step 1: Log in to Chameleon
===========================

Good news: chances are that you won’t even need to create an account to log into
Chameleon. This is because Chameleon supports federated login: if your
institution is a member of `InCommon`_ (most US research and education
institutions are) or if you have a Google account you can use a federated login.
Otherwise, you will be guided to create an account. Our login pages will guide
you through the process, or you can :ref:`read more about logging into Chameleon
via federated login <federation>`.

On your first Chameleon login you will be asked to accept `terms and conditions
<https://auth.chameleoncloud.org/auth/realms/chameleon/terms>`_ of use. Please,
note that as part of those terms and conditions you are requested to acknowledge
Chameleon in publications you produced using the testbed: see our FAQ for
information on `how to reference Chameleon in your publications
<https://www.chameleoncloud.org/about/frequently-asked-questions/#toc-how-should-i-reference-chameleon->`_
and the suggested `acknowledgement text
<https://www.chameleoncloud.org/about/frequently-asked-questions/#toc-how-should-i-acknowledge-chameleon-in-my-publications->`_.

Once you log in, you will be able to :ref:`edit your Chameleon profile
<profile-page>`, sign up for webinars, and participate in our community.
However, to actually use the testbed you will first need to join or create a
project.

.. _getting-started-project:

Step 2: Create or join a project
================================

To get access to Chameleon resources, you will need to be associated with a
**project** that is assigned a **resource allocation**.

If you want to join an existing Chameleon project, you will need to ask the PI
of the project to add you. You can find your username in `your Chameleon profile
<https://www.chameleoncloud.org/user/profile/>`_--it is also displayed in the
top-right corner when you are logged in.

If you want to create a project, you will first either need to obtain a PI
status or work with somebody who has PI status. To determine if you can obtain
PI status, please see a :ref:`list of PI eligibility criteria <pi-eligibility>`.
If you do not meet these criteria (e.g., students generally do not), you will
need to ask your advisor or other scientist supervising your research to create
the project for you. You can request PI status by checking a box in `your
Chameleon profile <https://www.chameleoncloud.org/user/profile/>`_. Chameleon PI
status requests are typically reviewed within one business day.

Once you have PI status, you may apply for a new project with an initial
allocation. A project application typically consists of a short description of
your intended research and takes one business day to process. Once your project
has been approved, you will be able to utilize the testbed sites.

Step 3: Start using Chameleon!
==============================

Congratulations, you are now ready to launch your first instance! Instances are
much like what you may expect to find in a virtual machine, except here the
instances are on bare metal nodes - the core feature of Chameleon. A bare metal
node is a whole physical server that you have exclusive access to. An instance
is going to be a bare metal node that has been launched with an operating system
image. Follow these steps to make a reservation for a node, launch an instance
and log in to it.

.. note::

   Chameleon also offers a multi-tenant, virtualized cloud, with fewer
   functionalities and a smaller scale. See :ref:`kvm` for more details.

The Chameleon dashboard
-----------------------

Chameleon resources are available at multiple sites, e.g., |CHI@TACC| and
|CHI@UC|. When you access one of the sites, you are first taken to a dashboard,
which shows a summary of your project's current resource usage and get quick
access to each of the sites. The dashboard looks something like this:

.. figure:: dashboard.png
   :alt: The Chameleon Dashboard's resource usage summary
   :figclass: screenshot

   An overview of your project's current resource usage

Reserving a node
----------------

First, we need to reserve a node for our use. Chameleon provides bare metal
access to nodes. When you create a reservation for one or more nodes, only you
and other users on your project will be able to use those nodes for the time
specified. We will create a single day reservation for a compute node, which are
the most common types of nodes available on Chameleon.

#. In the sidebar, click *Reservations*, then click *Leases*
#. Click on the *+ Create Lease* button in the toolbar
#. Type *my_first_lease* for the lease name
#. Find the *Resource Properties* section. In the dropdown below *node_type*, select *compute_haswell*
#. Click the *Create* button

.. figure:: create_lease.png
  :alt: The Create Lease dialog
  :figclass: screenshot

  The Create Lease dialog - be sure to select compute_haswell in the dropdown below node_type

The reservation will start shortly, at which point you can launch an instance on
a bare metal node.

.. note::

   You have created an "on demand" reservation. When you do not specify a start
   date or time in the future, the reservation will start as soon as possible
   and will last one day.

.. important::

   Do not attempt to stack reservations to circumvent the 7-day lease
   limitation. Your leases may be deleted. Please refer to our `best practices
   <https://www.chameleoncloud.org/about/frequently-asked-questions/#toc-what-are-the-best-practices-of-chameleon-usage->`_
   if you require a longer reservation.

Launching an instance
---------------------

Once the reservation starts, you can launch a bare metal instance on the node
that has been leased to you.

#. In the sidebar, click *Compute*, then click *Instances*

#. Click on the *Launch Instance* button in the toolbar and the *Launch
   Instance* wizard will load

#. Type *my_first_instance* for the instance name and select your
   *my_first_lease* reservation

   .. figure:: launch_details.png
      :alt: Launch details
      :figclass: screenshot

      Enter an instance name and select your reservation

#. Click *Source* in sidebar. Then, find *CC-CentOS8* in the image list and
   click the *Up* arrow to select it.

   .. figure:: launch_source.png
      :alt: Selecting an image
      :figclass: screenshot

      Select the CC-CentOS8 image

#. Click *Keypair* in sidebar. Click the *+ Create Key Pair* button and enter
   ``mychameleonkey`` for the key name. This will automatically start a download
   for a file named ``mychameleonkey.pem``. This is your private key pair that
   you will use to access your instance.

   .. figure:: launch_keypair.png
      :alt: Create a keypair to secure your instance
      :figclass: screenshot

      You can create or import a public/private keypair for accessing your
      instance.

#. Click the *Launch Instance* button.

Congratulations, you have launched an instance on a bare metal node!

Associating an IP address
-------------------------

Your instance may take approximately ten minutes to launch. The launch process
includes powering up, loading the operating system over the network, and booting
up for the first time on a rack located either at the University of Chicago or
the Texas Advanced Computing Center, depending on where you chose to launch your
instance. Before you can access your instance, you need to first assign a
floating IP address - an IP address that is accessible over the public Internet.

#. Go to the *Floating IP* dashboard by clicking on *Network* and *Floating IPs*
   in the sidebar.

    .. figure:: floating_ip_overview.png
       :alt: The Floating IP dashboard
       :figclass: screenshot

#. If you have a Floating IP not currently associated to an instance, click the
   *Associate* button for the IP. A dialog will load that allows you to assign a
   publicly accessible IP to your instance. Click the *Associate* button in the
   dialog to complete the process of associating the public IP to your instance.

   .. figure:: associate_ip.png
      :alt: The Manage Floating IP Associations dialog
      :figclass: screenshot

      Here you can assign a floating IP address

#. If you didn't already have a Floating IP available, you may allocate one to
   your project by clicking on the *Allocate IP to Project* button along the top
   row in the Floating IP dashboard. A new dialog will open for allocating the
   floating IP.

   .. figure:: associate_pool.png
      :alt: The Allocate Floating IP dialog
      :figclass: screenshot

      This dialog allows you to allocate an IP address from Chameleon's public
      IP pool

   Click the *Allocate IP* button. The Floating IP dashboard will reload and you
   should see your new Floating IP appear in the list. You can now go back to
   step 2.

Accessing Your Instance
-----------------------

Once your instance has launched with an associated floating IP address, it can
be accessed via SSH using the private key that you downloaded during the
`Launching an Instance`_ step.

.. note::

   The following instructions assume that you are using a macOS or Linux
   terminal equivalent. You may view our `YouTube video on how to login via SSH
   on Windows <https://youtu.be/MDK5D2ptJiQ>`_.

To log in to your instance, follow these steps:

#. Open a terminal window and navigate to where you downloaded the
   ``mychameleonkey.pem`` file. Change the permissions on the file to user
   read/write only:

   .. code-block:: bash

      chmod 600 mychameleonkey.pem

#. Add the key to your current SSH identity:

   .. code-block:: bash

      ssh-add mychameleonkey.pem

#. Log in to your Chameleon instance via SSH using the ``cc`` user account and
   your floating IP address. If your floating IP address was
   ``129.114.108.102``, you would use the command:

   .. code-block:: bash

      ssh cc@129.114.108.102

   .. note::

      Change the IP address in this command to match your instance's floating IP
      address!
