CentOS 7 Docker appliance
=========================

The CentOS 7 Docker appliance is built from the \ |Link| and customized
with Docker. Docker is an open-source project that automated the
deployment of applications inside software containers. Docker is
conceptually similar to virtual machines but has much less resource
overhead because it doesn't run a full guest OS. Docker containers start
in seconds instead of minutes, take up less space, and are less hardware
demanding because they share resources with the host OS.

Description
-----------

-  Image name: CentOS7-Docker
-  Default user account: cc
-  Remote access: Key-Based SSH
-  Root access: passwordless sudo from the cc account
-  Chameleon admin access: enabled on the ccadmin account
-  Cloud-init enabled on boot: yes
-  Repositories (Yum): EPEL, RDO (OpenStack)
-  Installed packages:

   -  Docker 1.9.1
   -  Standard development tools such as make, gcc, gfortran, etc.
   -  Config management tools: Puppet, Ansible, Salt
   -  OpenStack command-line clients

Availability
------------

-  |Link|
-  |Link|

Documentation
-------------

Please refer to the \ |Link| for documentation on how to reserve and
provision resources. Use the image name CentOS7-Docker.

The instructions below describe how to deploy a container with an Ubuntu
image. For more documentation on how to use Docker, \ |Link|.

After boot, start the Docker service
with: \ ``sudo systemctl start docker``

To list all the available docker images: \ ``sudo docker images``

To list all running containers: \ ``sudo docker ps -a``

Search for a docker image; as an example, let’s search for
Ubuntu: \ ``sudo docker search ubuntu``

Pull an Ubuntu 14.04 Docker image: \ ``sudo docker pull ubuntu:14.04``

Check your updated image list: \ ``sudo docker images``

| Create a container using the image you just
  pulled: \ ``sudo docker run -i -t <image id> /bin/bash``
| The above command should attach you to the container as root user.
  Exit the container by typing exit.

Check the list of containers on your system: \ ``sudo docker ps -a``

Start and attach to the container
again: \ ``sudo docker start <container id>; sudo docker attach <container id>``

Author and Support Contact
--------------------------

Created and maintained by UTSA. For support
email: \ `appliances@chameleoncloud.org <mailto:appliances@chameleoncloud.org?subject=%5BCC-CentOS7-SRIOV%5D%20Help%20needed%20(please%20customize%20subject)>`__

.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_9223
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_9485
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_9483
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_9309
.. |Link| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_9481
