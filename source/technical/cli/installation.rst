.. _cli-installing:

Installing the CLI
==================

Prerequisites
-------------

#. **Python** - Check if you have Python installed.

#. **pip** - If you're using Python 3.4 (or greater), then pip comes installed
   with Python by default.

OpenStack Client Installation
-----------------------------

#. Install the CLI by typing ``pip install python-openstackclient`` in the
   terminal.

#. Verify that it has installed correctly by typing ``openstack``. You will
   enter the OpenStack Client in interactive mode and your prompt should change
   to ``(openstack)``.

#. Exit the client by typing ``exit``.

#. There are some clients with new features or bugfixes not yet in the upstream
   release branches, notably the Blazar CLI client. If you want to make
   reservations via the CLI, you should install that here:

   .. code-block:: shell

      pip install git+https://github.com/chameleoncloud/python-blazarclient@chameleoncloud/2023.1