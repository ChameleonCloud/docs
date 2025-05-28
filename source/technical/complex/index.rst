.. _complex:

==================
Complex Appliances
==================

Deploying an MPI cluster, an OpenStack installation, or any other type of cluster in which nodes can take on multiple roles can be complex: you have to provision potentially hundreds of nodes, configure them to take on various roles, and make them share information that is generated or assigned only at deployment time, such as hostnames, IP addresses, or security keys. When you want to run a different experiment later you have to redo all this work. When you want to reproduce the experiment, or allow somebody else to reproduce it, you have to take very precise notes and pay great attention to their execution.

To help solve this problem and facilitate reproducibility and sharing, the Chameleon team configured a tool that allows you to deploy complex clusters with "one click". This tool requires not just a simple *image* (i.e., appliance) but also a document, called a *template*, that contains the information needed to orchestrate the deployment and configuration of such clusters. We call this *image + template* combination **Complex Appliances** because it consists of more than just the image (i.e., appliance).

In a nutshell, *Complex Appliances* allow you to specify not only what image you want to deploy but also on how many nodes you want to deploy that image, what roles the deployed instances should boot into (such as e.g., head node and worker node in a cluster), what information from a specific instance should be passed to another instance in that *Complex Appliance*, and what scripts should be executed on boot so that this information is properly used for configuring the "one click" cluster.

This guide will tell you all you need to know in order to use and configure *Complex Appliances* on Chameleon.

.. hint::
   Since *Complex Appliances* in Chameleon are currently implemented using the `OpenStack Heat <https://docs.openstack.org/heat/latest/>`_ orchestration service, we will be using OpenStack terminology and features to work with them. The templates described above are YAML files using the `Heat Orchestration Template (HOT) <https://docs.openstack.org/heat/latest/template_guide/hot_spec.html>`_ format (Heat also supports the AWS CloudFormation template format, but this is not covered here). A deployed complex appliance is referred to as a "stack" – just as a deployed single appliance is typically referred to as an "instance".

.. toctree::
   :maxdepth: 2
   :caption: Complex Appliances Topics

   catalog
   gui_management
   cli_management
   heat_templates
   sharing
   advanced_topics