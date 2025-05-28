.. _cli:

=============================
Command Line Interface (CLI)
=============================

The Command Line Interface (CLI) provides a way to interact with Chameleon
resources using shell and scripting tools. Chameleon uses the `OpenStack Client
<https://docs.openstack.org/python-openstackclient/latest/>`_ to provide CLI
functionality. This documentation section provides an overview on how to install
the client and configure your shell environment to access Chameleon features.

.. attention::

   Some of the Chameleon features are **only** accessible via the CLI, such as
   power monitoring tools and the advanced networking features.

.. note::

   Chameleon Cloud is primarily designed to support Unix-like environments.
   Therefore, it is highly recommended using CLI in a Unix-like system. For
   Windows 10 users, you may want to enable `Windows Subsystem for Linux
   <https://docs.microsoft.com/en-us/windows/wsl/install-win10>`_ to get better
   experience with the Chameleon CLI.

.. toctree::
   :maxdepth: 1
   :caption: CLI Topics

   installation
   authentication
   rc_script
   usage