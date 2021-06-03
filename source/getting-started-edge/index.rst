
.. _InCommon: https://incommon.org/federation

.. _getting-started:

=============================
Getting started with CHI@EDGE
=============================

This guide will walk you through the initial steps of getting an account,
joining a project and working with your first container.

.. contents:: :local:

.. _getting-started-user:

Step 1: Log in to Chameleon
===========================

Just click the “Log in” button situated in the top right corner of `our main page
<https://www.chameleoncloud.org>`_ -- you probably won’t even need to create an account! 

If your institution is a member of `InCommon`_ (most US research and education
institutions are) -- or if you have a Google account -- you can log in with your
institutional/Google credentials via the federated login. Otherwise, the log in process 
will guide you to create an account (:ref:`read more about logging into Chameleon
via federated login <federation>`).

On your first Chameleon login you will be asked to accept `terms and conditions
<https://auth.chameleoncloud.org/auth/realms/chameleon/terms>`_ of use. Please,
note that as part of those terms and conditions you are requested to acknowledge
Chameleon in publications produced using the testbed: see our FAQ for
information on `how to reference Chameleon in your publications
<https://www.chameleoncloud.org/learn/frequently-asked-questions/#toc-how-should-i-reference-chameleon->`_
and the suggested `acknowledgement text
<https://www.chameleoncloud.org/learn/frequently-asked-questions/#toc-how-should-i-acknowledge-chameleon-in-my-publications->`_.

Once you log in, you will be able to :ref:`edit your Chameleon profile
<profile-page>`, sign up for webinars, and participate in our community.
However, to actually use the testbed you will first need to **join or create a
project** (see below).

.. _getting-started-project:

Step 2: Create or join a project
================================

To get access to Chameleon resources, you will need to be associated with a
**project** that is assigned a **resource allocation**.

If you want to **join an existing Chameleon project**, you will need to ask the PI
of the project to add your username. You can find your username in `your Chameleon profile
<https://www.chameleoncloud.org/user/profile/>`_--it is also displayed in the
top-right corner when you are logged in.

If you want to **create a project**, you will first either need to obtain a PI
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

Congratulations, you are now ready to launch your first container! Containers
are a simple way to deploy applications. Learn more about what containers are 
with `this guide from docker <https://www.docker.com/resources/what-container>`_.
Follow these steps to launch a container and manage it.

The CHI\@EDGE dashboard
----------------------

Chameleon edge resources are available through 
`CHI@EDGE <https://chi.edge.chameleoncloud.org>`_. When you access this site, you are 
first taken to a dashboard, which shows a summary of your project's current 
resource usage. The dashboard looks  something like this:

.. figure:: dashboard.png
   :alt: The Chameleon Dashboard's resource usage summary
   :figclass: screenshot

   An overview of your project's current resource usage

Setting up networking
---------------------
Your container will need to run a network security group. Below is a brief
introduction to security groups in Chameleon, or you can find a more in depth 
explanation `here <../technical/kvm.html#security-groups>`_.

#. First, in the sidebar click *Network*, then click *Security Groups*. You can 
   examine an existing group's rules by clicking *Manage Rules* next to it. If 
   you already have a security group here that meets your needs, you can skip 
   the next step. Otherwise, you will need to create a new security group.

#. To create a new security group, click *+ Create Security Group*, enter a name 
   for your new group in the wizard, and then click *Create Security Group*. 
   You will be redirected to the screen to manage your new group's rules. Select 
   *Add Rule* to open the add rule wizard. Under *Rule*, you can select from 
   common rules, or if your needs are not met by one of these options, select 
   one of the custom rules. For example, if your container runs a web
   server, you may want to add the rules HTTP and HTTPS, allowing for traffic
   on ports 80 and 443.

  .. figure:: create_security_group.png
     :alt: Create Security Group Wizard
     :figclass: screenshot

     Enter a name for the security group.

Launching a container
---------------------

To start launching a container, follow the following steps:

1. In the sidebar, click *Container*, then click *Containers*.

2. Click on the *Create Container* button in the toolbar and the *Create
   Container* wizard will load

3. Type *my_first_container* for the container name. Then, enter the name of an 
   image you want to launch from Docker Hub. You must use the full name of the 
   image.

  .. note::
    You may also use a Glance ID for your image, by selecting *Glance* under the
    *Image Driver* field.

  .. note::
    Only the ARM architecture is currently supported. Make sure the image used 
    is compatible with ARM.

  .. figure:: create_container.png
    :alt: Create Container wizard
    :figclass: screenshot

     Enter a name and image name.

4. Click *Networks* in sidebar. Then, find *containernet1* in the image list and
   click the *Up* arrow to select it.

   .. figure:: create_container_networks.png
      :alt: Selecting a network
      :figclass: screenshot

      Select the containernet1 network

5. Click *Security Groups* in sidebar. Select the security group you wish to use
   by clicking the *Up* arrow to select it.

   .. figure:: create_container_security_groups.png
      :alt: Select security groups to use
      :figclass: screenshot

      You select your desired security group.

6. Click the *Create* button.

Congratulations, you have launched an container! It may take a few minutes for
your container to become active, while the image downloads.

Associating an IP address
-------------------------

For your container to be accessible over the Internet, you need to 
first assign a floating IP address.

#. First, select your container name in the *Containers* page, which will
   bring you to an overview for the container. Under *Spec*, you will see a
   field titled *Addresses* and within this, you should see an IP address next
   to the text *addr*. Note this address.

#. Go to the *Floating IP* dashboard by clicking on *Network* and *Floating IPs*
   in the sidebar.

    .. figure:: floating_ip_overview.png
       :alt: The Floating IP dashboard
       :figclass: screenshot

#. If you have a Floating IP not currently associated to a container, click the
   *Associate* button for the IP. A dialog will load that allows you to assign a
   publicly accessible IP to your container. Under *Port to be associated*, use
   the IP address from the container overview from step 1. Click the *Associate*
   button in the dialog to complete the process of associating the public IP to
   your container.

   .. figure:: associate_ip_edge.png
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
   step 3.

Access to your container
------------------------

Once your container has launched, there are a few ways to interact with it. 

By selecting your container name from the list of containers, you will be taken
to an overview page for your container. Here, you can select the logs tab to
see the output from your container. In the top right of this page, next to the
button labeled *Refresh*, you can select the drop-down arrow. One of the options
in this drop-down menu is *Execute Command*. Clicking this will open a window,
allowing you to enter a command to execute on your container. The output from
this command will then be displayed, after the command runs.

   .. figure:: execute_command.png
      :alt: The Execute Command window
      :figclass: screenshot

      This dialog allows you to execute a command on your container.

If your container communicates over the network, you can use the assigned
floating IP to access it. For example, if your container is running a web server
on port ``8888``, with floating IP ``129.114.108.102``, you canconnect to it by
going to ``http://129.114.108.102:8888`` in your browser.

