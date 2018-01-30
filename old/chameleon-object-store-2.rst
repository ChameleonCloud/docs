Chameleon Object Store
======================

Chameleon provides an object store service through the OpenStack Swift
interface. It is intended to be used for storing and retrieving data
used during experiments, such as input files needed for your
applications, or results produced by your experiments.

The object store can be accessed from anywhere using OpenStack Swift
command line client. In particular, you can access the object store from
instances running on CHI@TACC, CHI@UC and KVM@TACC by using your |Link -
CHI@TACC OpenStack RC file| (UC users will see more latency impact since
the object store is located at TACC). To make it easier for you to use
use the object store client we installed it in all appliances supported
by Chameleon. Additionally, you can also access the object store from
the `CHI@TACC web
interface <http://docs.openstack.org/user-guide/dashboard_manage_containers.html>`__
under the Object Store panel.

Please, follow the Chameleon `Swift QuickStart
Guide <https://www.chameleoncloud.org/docs/user-guides/openstack-object-storage-quickstart/>`__
to use Swift from command line. You can also consult the more extensive
OpenStack Documentation to learn more about managing objects and
containers from both
`dashboard <http://docs.openstack.org/user-guide/dashboard_manage_containers.html>`__
and `command
line <http://docs.openstack.org/user-guide/managing-openstack-object-storage-with-swift-cli.html>`__.

This object store service is currently backed by a
`Ceph <http://ceph.com>`__ cluster with more than 1.6 PB of capacity.
The data is replicated, keeping two copies of each object, effectively
providing over 800 TB of storage available to users. This storage
capacity will increase as the project goes on. The replication should
provide good availability in case of hardware failures. However, all
copies are kept within the same data center and are not backed up on a
separate system; if you feel that this does not provide sufficient
reliability in your case, you should consider backing up really critical
data externally.

.. |Link - CHI@TACC OpenStack RC file| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_16884
