.. _complex-advanced:

Advanced Topics
===============

.. _all-to-all-info-exchange:

All-to-All Information Exchange
-------------------------------

The previous examples have all used ``user_data`` scripts to provide instances with contextualization information. While it is easy to use, this contextualization method has a major drawback: because it is given to the instance as part of its launch request, it cannot use any context information that is not yet known at this time. In practice, this means that in a client-server deployment, only one of these pattern will be possible:

- The server has to be deployed first, and once it is deployed, the clients can be launched and contextualized with information from the server. The server won't know about the clients unless there is a mechanism (not managed by *Heat*) for the client to contact the server.
- The clients have to be deployed first, and once they are deployed, the server can be launched and contextualized with information from the clients. The clients won't know about the server unless there is a mechanism (not managed by *Heat*) for the server to contact the clients.

This limitation was already apparent in our `NFS share <https://www.chameleoncloud.org/appliances/25/>`_ appliance: this is why the server instance exports the file system to all bare metal instances on Chameleon, because it doesn't know which specific IP addresses are allocated to the clients.

This limitation is even more important if the deployment is not hierarchical, i.e. all instances need to know about all others. For example, a cluster with IP and hostnames populated in ``/etc/hosts`` required each instance to be known by every other instance.

To solve this problem we recommend performing contextualization after
the instances have booted. Rather than passing all necessary context
information at launch time, which may be incomplete or not yet availaable,
you can use configuration management tools such as Ansible, to orchestrate
all-to-all information exchange between the nodes.

Once all instances have booted and are online, the general flow is:

- Gather required information from all instances (IP addresses,
  hostnames, etc.)
- Generate configuration files (e.g., /etc/hosts) and secrets (e.g.,
  SSH keys), etc.
- Push configuration files and secrets to all instances.

A tool like Ansible can be run directly from your laptop, or from
another environment like a dedicated server or Jupyter notebook.
By separating the deployment of instances (using Heat, or python-chi)
from their contextualization (using Ansible or another tool),
any necessary all-to-all information exchange can be performed.

One specific example of this approach is our `MPI Trovi artifact <https://chameleoncloud.org/experiment/share/bee0e61d-b272-487f-b2c6-e7455f4b4474>`_.

This artifact contains the necessary python-chi and Ansible scripts to deploy
a cluster of instances capable of running an MPI application.
