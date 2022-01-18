.. _jupyter-dedicated:

Dedicated Jupyter Servers
=========================

The :ref:`default Jupyter environment <jupyter>` available to all Chameleon users is a bit limited: you are working within a shared environment and as such there are some practical limitations around the amount of CPU cores and memory you can utilize. More intensive analytical workflows may function better from within a dedicated Jupyter server for use by you and/or other members of your project.

Using the Appliance Catalog
---------------------------

The Chameleon :ref:`Appliance Catalog <complex>` provides a `JupyterHub appliance <https://www.chameleoncloud.org/appliances/72/>`_ that is functionally equivalent to the shared Jupyter environment. The appliance will allow you to reserve a Chameleon bare metal node and provision it with the JupyterHub application, along with a :ref:`Floating IP Address <basic-networking>` that allows access over the public Internet. Any Jupyter Notebook servers managed by this multi-user environment will have access to the underlying resources on whatever node you have reserved, removing the limits around CPU and memory usage.

Using Trovi
-----------

:ref:`Trovi <trovi>` also has a `JupyterHub artifact <https://www.chameleoncloud.org/share/1>`_ you can instantiate on Chameleon. There is no material difference between this method and the Appliance Catalog method and it can serve as a nice introduction to the Sharing Portal if you are not already familiar with it. With this method, you actually provision your own JupyterHub server *via the shared default Chameleon JupyterHub*; it's `JupyterHub all the way down <https://en.wikipedia.org/wiki/Turtles_all_the_way_down>`_!
