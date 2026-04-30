.. _jupyter-dedicated:

Dedicated Jupyter Servers
=========================

The :ref:`default Jupyter environment <jupyter>` available to all Chameleon
users is a bit limited: you are working within a shared environment and as such
there are some practical limitations around the amount of CPU cores and memory
you can utilize. More intensive analytical workflows may function better from
within a dedicated Jupyter server for use by you and/or other members of your
project.

:ref:`Trovi <trovi>` provides a `JupyterHub appliance
<https://trovi.chameleoncloud.org/dashboard/artifacts/6a30d3fb-8c8a-49b1-a415-cd9c7fc0a6e3>`_
you can instantiate on Chameleon. Filter Trovi artifacts by the **appliance**
tag to find it. The appliance will allow you to reserve a Chameleon bare metal
node and provision it with the JupyterHub application, along with a
:ref:`Floating IP Address <basic-networking>` that allows access over the
public Internet. Any Jupyter Notebook servers managed by this multi-user
environment will have access to the underlying resources on whatever node you
have reserved, removing the limits around CPU and memory usage.

With this method, you actually provision your own JupyterHub server *via the
shared default Chameleon JupyterHub*; it's `JupyterHub all the way down
<https://en.wikipedia.org/wiki/Turtles_all_the_way_down>`_!
