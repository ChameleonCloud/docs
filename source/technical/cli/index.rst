.. _cli:

=============================
Command Line Interface (CLI)
=============================

The Command Line Interface (CLI) provides a way to interact with Chameleon
resources using shell and scripting tools. Chameleon uses the `OpenStack Client
<https://docs.openstack.org/python-openstackclient/latest/>`_ to provide CLI
functionality. This documentation section provides an overview on how to install
the client and configure your shell environment to access Chameleon features.

.. _cli-which-auth-method:

**Which authentication method should I use?** We recommend
:ref:`ccauth <cli-ccauth>` for most users: it authenticates via a
browser-based device flow and can generate credentials for multiple
projects and sites at once, so you don't need to manually download and
manage separate credential files. If you're working with a single project
and site and want a tool with nothing to install, :ref:`cc-login
<cli-cc-login>` is a lighter-weight option preinstalled on CC-\* images.
The :ref:`password and application credential methods
<cli-authentication>` still work but require manually creating and
downloading credential files for each project — only reach for them if
neither ccauth nor cc-login fits your workflow.

Looking to script or orchestrate experiments in Python instead of shell?
`python-chi <https://python-chi.readthedocs.io/en/latest/>`_ is Chameleon's
Python library and offers a programmatic alternative to the CLI — see our
:doc:`Jupyter and python-chi guide
<../../getting-started/jupyter-python-chi>` for an introduction.

.. attention::

   Some of the Chameleon features are **only** accessible via the CLI, such as
   power monitoring tools and the advanced networking features.


   Chameleon Cloud is primarily designed to support Unix-like environments.
   Therefore, it is highly recommended using CLI in a Unix-like system. For
   Windows 10 users, you may want to enable `Windows Subsystem for Linux
   <https://docs.microsoft.com/en-us/windows/wsl/install-win10>`_ to get better
   experience with the Chameleon CLI.

.. toctree::
   :maxdepth: 1
   :caption: CLI Topics

   installation
   ccauth
   cc_login
   authentication
   rc_script
   vendordata_auth_removal
   usage