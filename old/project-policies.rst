Project Policies
================

How do I apply for a Chameleon project? 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| 
| Project applications may be filled out |Link|. If you want to apply
  for a project you have to be \ |Link|; if you fulfill the PI
  eligibility criteria but did not request PI eligibility when you
  applied for a Chameleon account you can request it by modifying
  options in your profile. An application for a project has to include a
  description of the research or education project to be performed using
  the testbed and the type of resources needed (see below). Each
  Chameleon project is awarded an allocation of service units for a
  specific amount of time. 

What are the units of an allocation, and how am I charged? 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| 
| Chameleon allocations can consist of several components of the system.
  Users can request allocation of individual compute nodes, storage
  servers, or complete Scalable Compute Units (SCUs) which contain
  compute servers, storage nodes, and an open flow switch. 

Compute servers are allocated in Service Units (SUs), which equates to
one hour of wall clock time on a single server (for virtual machines, an
SU is 24 cores with up to 128GB of RAM). Note this unit differs from
traditional HPC or cloud service units that are charged in core-hours; a
Chameleon SU is a full server, as the type of experiments and
performance measurements users may wish to do may be contaminated by
sharing nodes. 

Storage servers are also charged in SUs, at 2x the rate of compute
servers (i.e., 1 hour allocation of 1 storage server == 2 SUs).  SCUs
are charged at the rate of 50 SUs per wall clock hour (42 compute
servers, 4 storage nodes, plus one OpenFlow switch).     

An allocation may make use of multiple SCUs, up to the size of the full
testbed.     

For example, a user wishing to provision a 10 node cluster +1 storage
server for a 1 week experiment should budget  [(10+2) SU/s per hour] \*
[7 days \*24 hours/day] = 2,016 SUs for that experiment. 

SUs are charged the same regardless of use case.  Hence, whether asking
for bare metal access, virtual machine access, or use of default images,
the charge is the same —  you are charged for the fraction of the
resource your experiment occupies, regardless of the type of the
experiment. 

The basic principle for charging service units for Chameleon resources
is to evaluate the amount of time a fraction of the resource is
unavailable to other users. If a reservation is made through the portal
for a particular date/time in the future, the user will be charged for
this time regardless of whether the reservation is actually used, as the
Chameleon scheduling system will have to drain the appropriate part of
the system to satisfy the reservation, even if the nodes requested are
not actually used.  A reservation request may be cancelled in which case
no charges will apply. 

What are the project allocation sizes and limits?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| 
| In the initial phase Chameleon is operating on a “soft allocation
  model” where each project, if approved, will receive a startup
  allocation of 20,000 SUs for six months that can be both recharged
  (i.e., more SUs can be added) and renewed (i.e., the duration can be
  extended) via submitting a renew/recharge request. This startup
  allocation value has been designed to respond to both PI needs (i.e.,
  cover an amount of experimentation needed to obtain a significant
  result) and balance fairness to other users (it represents roughly 1%
  of testbed six months’ capacity). Requests for these startup projects
  will receive a fast track internal review (i.e., users can expect them
  to be approved within a few days). 

A PI can apply for multiple projects/allocations; however, the number of
held allocations will be taken into account during review. 

As our understanding of user need grows we expect the Chameleon
allocation model to evolve towards closer reflection of those needs in
the form of more differentiated allocations that will allow us to give
larger allocations to users for longer time. 

What is the format of an allocation proposal?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| 
| A  Chameleon Allocation request consists of the following components: 

-  Project Title
-  Project abstract describing the proposed experiments including the
   type of resources needed; this part is required and may be published
   on Chameleon website (~200 words)
-  Supplemental details; this is an optional extension of the project
   abstract, potentially including details that the PI does not wish
   to publish such as e.g., sources of funding that support the proposed
   research (500 words maximum)

According to what criteria are project proposals reviewed?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| 
| Requests for projects and allocations are currently reviewed for merit
  by project operators with a future move towards review by independent
  review board composed of Chameleon Science Advisory Board members. The
  following criteria are used: 

-  PI eligibility
-  Relevance of the proposed experiment to cloud computing research;
   scientific merit and significance of the proposed experiments
-  Demonstrated need for Chameleon resources, methodology appropriate to
   the use of the Chameleon resource, justification of the requested
   allocation
-  Success of prior or other existing allocations (for renewals) in
   terms of published research results and new funding.
-  Technical feasibility (i.e, can the project succeed in the Chameleon
   environment?) 
-  Any funded support for the project (optional, but we want to make
   certain that we give allocations to NSF CISE-supported cloud
   computing research!).  

How should I acknowledge Chameleon in my publications?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| 
| An acknowledgement of support from the Chameleon project and the
  National Science Foundation should appear in any publication of
  material, whether copyrighted or not, that describes work which
  benefited from access to Chameleon cyberinfrastructure resources. The
  suggested acknowledgement is as follows: “Results presented in this
  paper were obtained using the Chameleon testbed supported by the
  National Science Foundation”. 

.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_6982
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_6973
