.. _python-chi: https://python-chi.readthedocs.io/en/latest/

.. _Chameleon: https://chameleoncloud.org/

.. _`Bare Metal Experiment Pattern`: https://trovi.chameleoncloud.org/dashboard/artifacts/370ce99a-3e03-43e9-83e3-b61fd9692dc0

.. _`Appliances Catalog`: https://trovi.chameleoncloud.org/dashboard/artifacts?tags=appliance

.. _remix:

=============================================
Next Steps: JupyterHub and ``python-chi``
=============================================

In the :doc:`getting started guide <index>`, we walked through how to find
hardware, reserve resources, and launch an instance using the Chameleon web
interface. In this guide, we'll accomplish the same thing programmatically
using a Jupyter Notebook connected to the testbed.

.. figure:: ../_static/imgs/getting_started/jupyter-interface-button.png
   :figwidth: 20 %
   :width: 100 %
   :align: left

Jupyter on Chameleon
--------------------

Chameleon is integrated with :ref:`JupyterHub <jupyter>`, so you can launch a
Jupyter server (on KVM) with an environment pre-configured with python-chi_ and
authentication to the testbed. JupyterHub on Chameleon allows you to create
Jupyter Notebooks with your experiment and analysis code, collaborate with
other project members in a common testbed workspace, and share files as Trovi
artifacts with the Chameleon community.

To read more about the Jupyter interface, see :ref:`our docs <jupyter>` on the
interface.

To launch the Jupyter interface on Chameleon, go to the Chameleon_ home page,
click on the "Experiment" tab, and select the "Jupyter Interface" item. This
will launch a new window which will begin loading the Jupyter server. It will
then launch the JupyterHub interface. This interface should be familiar if
you've ever worked with Jupyter tools before. From the launch page, we can
create new notebooks, open consoles, and even open a terminal.

The work that you do in this space is persistent, so if you create a new
notebook and then exit the interface and relaunch it, the notebook will still
appear in your file system.

.. figure:: ../_static/imgs/getting_started/jupyter-hub-start.png
   :figwidth: 80 %
   :align: center

   Jupyter Interface will start a server.

You can also download and import files from Jupyter as well as integrate with
git.

.. figure:: ../_static/imgs/getting_started/trovi-button.png
   :figwidth: 20 %
   :width: 100 %
   :align: left

Trovi
-----

One benefit of having an interface like Jupyter available is that users can use
it to package their project materials, scripts, code, and datasets as artifacts
that others can replicate and extend. So, how does Chameleon facilitate this
sharing?

Chameleon provides the :ref:`Trovi <trovi>` service as a repository to share and access
artifacts from other users on the testbed. Trovi is integrated with the Jupyter
Interface, so you can launch Trovi artifacts directly onto the Jupyter Interface
and start using them. You can also take your Jupyter artifacts and upload them
to Trovi from Jupyter, allowing others to see and use them.

To get to the Trovi repository from the Chameleon_ home page, go to the
"Experiment" tab and click the "Trovi" menu item. Here, you can see all the
public artifacts available on the testbed.

.. image:: ../_static/imgs/getting_started/trovi-main.png

Chameleon offers tutorials and experimental pattern notebooks on Trovi. We'll
use one now to see how we can accomplish the same basic set up on Chameleon
that we achieved in our previous section.

Go to the Trovi repository (after logging in to the site if you aren't
already). The artifact we will use today is called the `Bare Metal Experiment
Pattern`_. You can type "Bare Metal" in the search bar to filter the results.
You can also filter for this artifact by selecting the Chameleon badge icon
(|chameleon badge|) on the side bar to view all of the Chameleon-supported
artifacts. We can also filter by tag, for example the "experiment pattern" tag.

.. |chameleon badge| image:: ../_static/imgs/getting_started/chameleon-badge.png

.. note::
   There are additional artifacts to check out that will help you with more
   advanced topics. And the best part about these templates is that we can easily
   reuse the code to start our own artifacts.

To launch the artifact, click on the title. On the next page, you will see the following:

.. image:: ../_static/imgs/getting_started/bare-metal-pattern.png

Click on the "**Launch on Chameleon**" button to start Jupyter. This loading page
should look familiar to the loading page when we launched the Jupyter Interface
above.

Once Jupyter has loaded, we will have the artifact directory available in our
workspace. Your directory should include the following files:

.. code-block:: bash

   $ ls
   Analysis.ipynb             Experiment.ipynb   out            run_experiment.sh
   latest.tar.gz      README.ipynb   setup.sh

We can click on the directory and open the ``README.ipynb`` file, which
provides some documentation on this artifact, including approximately how long
it takes to run and any additional requirements.

Let's now open the ``Experiment.ipynb`` file.

Getting Started with ``python-chi``: Bare Metal Experiment Pattern
------------------------------------------------------------------

.. image:: ../_static/imgs/getting_started/bare-metal-notebook.png

Jupyter Notebook allows developers to mix text (rendered as Markdown) and code
in one file. This mixture of content enhances the experience of running code,
because documentation can be provided to clarify the code blocks that run. We
can see at the start of the notebook a few blocks of text. If we scroll down to
the "Configuration" section, we will see our first block of code. Let's dive
in!

**Setting the Site and Project**

As required when working through the Chameleon GUI, we need to set our active
project and pick a testbed site to use before we can continue. This requires a
Chameleon account and membership to an active project.

Once we have our project and site, we can use python-chi_ to set these parameters.

.. code-block:: python

   import chi

   chi.use_site("CHI@UC")

   # Change to your project (CHI-XXXXXX)
   chi.set("project_name", "Chameleon")

This code imports the python-chi_ module, calls the ``use_site`` method with
the desired site (|CHI@UC|) inputted as a string, and calls the ``set`` method
to update the configuration to use our project code. (Note: this is necessary
so that the system knows which project to reference when creating leases and
launching instances.) Replace ``Chameleon`` with your project code.

**Create a Reservation**

.. note::
   python-chi_ does not currently support hardware discovery, but we are
   working to fix that soon. Stay tuned!

After we set our site and project code, we can now create a lease. The code
below uses the ``lease`` utility to create a reservation for one floating IP
and one bare metal host with the node type ``compute_cascadelake_r``. Notice
that we are setting the same parameters that we had to include in the form we
used to create a lease on the GUI.

.. code-block:: python

   import os
   from chi import lease

   reservations = []
   lease_node_type = "compute_cascadelake_r"

   try:
      print("Creating lease...")
      lease.add_fip_reservation(reservations, count=1)
      lease.add_node_reservation(reservations, node_type=lease_node_type, count=1)

      start_date, end_date = lease.lease_duration(hours=3)

      l = lease.create_lease(
         f"{os.getenv('USER')}-power-management",
         reservations,
         start_date=start_date,
         end_date=end_date
      )

We can use the ``wait_for_active`` method to pause until our lease is active
before running further code cells in the notebook.

.. code-block:: python

   lease_id = l["id"]
   print("Waiting for lease to start ...")
   lease.wait_for_active(lease_id)
   print("Lease is now active!")

**Create an Instance**

We can now configure and launch our instance on the node that we reserved.

.. code-block:: python

   from chi import server

   image = "CC-Ubuntu22.04"

   s = server.create_server(
      f"{os.getenv('USER')}-power-management",
      image_name=image,
      reservation_id=lease.get_node_reservation(lease_id)
   )

   print("Waiting for server to start ...")
   server.wait_for_active(s.id)
   print("Done")

This code uses the ``server`` utility to spin up an instance. We can specify
which image we want to use by referring to its name (in this case
``CC-Ubuntu22.04``). (To see the name of an image, you can look it up in the
`Appliances Catalog`_ on Trovi by filtering for the **appliance** tag.) We also need to provide the reservation ID from our
lease, which we can grab using the ``get_node_reservation`` method.

.. note::
   We are *not* specifying a key pair here, because when you use Chameleon through
   the Jupyter Interface, a key pair is automatically generated in the Jupyter
   environment and associated with your Chameleon account. By default, the
   ``create_server`` method will include this key pair in any instance you create
   from the Jupyter Interface and will use it in other methods that allow you to
   SSH to the instance. You can specify a different key pair using the ``key_name
   (str)`` parameter.

**SSHing and Running Scripts on the Instance**

After our server is running (remember, this can take up to 20 minutes in some
cases; now is a good time to take a coffee break), we can use the ``ssh``
utility to connect to the instance.

.. code-block:: python

   floating_ip = lease.get_reserved_floating_ips(lease_id)[0]
   server.associate_floating_ip(s.id, floating_ip_address=floating_ip)

   print(f"Waiting for SSH connectivity on {floating_ip} ...")
   timeout = 60*2
   import socket
   import time
   # Repeatedly try to connect via SSH.
   start_time = time.perf_counter()
   while True:
      try:
         with socket.create_connection((floating_ip, 22), timeout=timeout):
               print("Connection successful")
               break
      except OSError as ex:
         time.sleep(10)
         if time.perf_counter() - start_time >= timeout:
               print(f"After {timeout} seconds, could not connect via SSH. Please try again.")

   from chi import ssh

   with ssh.Remote(floating_ip) as conn:
      # Upload the script
      conn.put("setup.sh")
      # Run the script
      conn.run("bash setup.sh")

We have now associated our floating IP and verified our connection to the
instance via the floating IP. We can then use our SSH connection to upload
scripts to set up our experiment, run it, and transfer the results back to our
local environment for processing and analysis. (See the ``Analysis.ipynb``
notebook to see the results of this experiment! Better yet, see if you can
replicate the experiment in this tutorial on a different Node Type.)

Congratulations! You just created your first lease and instance on Chameleon
without ever leaving the comforts of your Jupyter Notebook!

Be sure to `check out our additional tutorials on Trovi
<https://trovi.chameleoncloud.org/dashboard/artifacts?tags=experiment+pattern>`_
to continue your learning!
