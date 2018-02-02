=========================
Metrics
=========================

Gnocchi is the primary mechanism for collecting system metrics. Chameleon base images are configured to collect system metrics via the ``collectd`` service and send them to Chameleon's Gnocchi implementation

Content from https://www.chameleoncloud.org/monitor-and-collect/

_________________________
Using the Gnocchi Client
_________________________

Retrieving your instances
=========================

openstack metric resource list

Retrieving a list of metrics on an instance
===========================================

openstack metric resource show

Retrieving measurements
=======================

openstack metric measures show


____________________________________
Configuring the ``collectd`` service
____________________________________


____________________________________
Using ``etrace2``
____________________________________
