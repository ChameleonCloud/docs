CentOS 7 appliance
==================

The CentOS 7 appliance is built from the \ |Link - CentOS 7 Generic
Cloud image| and additionally contains packages for development, system
configuration, and accessing OpenStack services.

The CentOS 7 appliance provides an convenient base image. You can
customize it and |Link - snapshot it| to develop your own appliances. 

Description
-----------

-  Image name: CC-CentOS7
-  Default user account: cc
-  Remote access: Key-Based SSH
-  Root access: passwordless sudo from the cc account
-  Chameleon admin access: enabled on the ccadmin account
-  Cloud-init enabled on boot: yes
-  Repositories (Yum): EPEL, RDO (OpenStack)
-  Installed packages:

   -  Standard development tools such as make, gcc, gfortran, etc.
   -  Config management tools: Puppet, Ansible, Salt
   -  OpenStack command-line clients

Availability
------------

-  |Link - Bare metal (TACC)|
-  |Link - Bare metal (UC)|

Author and Support Contact
--------------------------

Created and maintained by Chameleon staff: \ |Link -
help@chameleoncloud.org|

.. |Link - CentOS 7 Generic Cloud image| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_9521
.. |Link - snapshot it| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_9523
.. |Link - Bare metal (TACC)| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_9525
.. |Link - Bare metal (UC)| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_9527
.. |Link - help@chameleoncloud.org| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_9519
