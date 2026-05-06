.. _cli-ccauth:

ccauth command
==============

The ``ccauth`` package must be installed in the same Python environment as the
OpenStack clients using it. On first run, you'll be prompted to visit a URL
to authenticate via your browser. Subsequent runs reuse the cached refresh
token silently, unless it has expired and needs to be refreshed.

.. note::

   ``ccauth`` is available as a library for developers who wish to use it in their
   own projects, or for those interested in contributing to its development.
   For more information, see the `ccauth GitHub repository
   <https://github.com/ChameleonCloud/ccauth>`_.

Installation
~~~~~~~~~~~~

``ccauth`` is preinstalled and available in the PATH on all Chameleon
supported images, so no installation is required when using Chameleon images.

If you are installing ``ccauth`` on your local system or from the source
repository, install it using pip from the GitHub repository:

.. code-block:: console

    pip install git+https://github.com/ChameleonCloud/ccauth.git

Quick start
~~~~~~~~~~~

Generate a ``clouds.yaml`` file for the current site and project:

.. code-block:: console

    # On first run you'll be prompted to visit a URL to authenticate.
    ccauth clouds-yaml --output ~/.config/openstack/clouds.yaml

    # Use the cloud entry
    export OS_CLOUD=openstack
    openstack server list

Subsequent runs reuse the cached refresh token silently. The ``ccauth login``
command is available as a convenience to pre-authenticate or verify credentials,
but it is not required — the ``clouds-yaml`` and ``discover-projects`` commands
will trigger the device flow automatically if no cached token is present.

Usage
~~~~~

.. code-block:: console

    ccauth [OPTIONS] COMMAND

Commands
~~~~~~~~

ccauth login
++++++++++++

Optional. Runs the OIDC device flow and caches a refresh token. Useful for
pre-authenticating or verifying credentials before running other commands.
Discovers the current site from the OpenStack metadata service when on a
Chameleon instance.

.. code-block:: console

    ccauth login
    ccauth login --auth-url https://chi.uc.chameleoncloud.org:5000/v3
    ccauth --debug login

ccauth logout
+++++++++++++

Clears the cached refresh token.

.. code-block:: console

    ccauth logout

ccauth clouds-yaml
+++++++++++++++++++

Writes a ``clouds.yaml`` file. By default, generates a single entry for the
current site and project (discovered from the OpenStack metadata service).
Use ``--all-sites`` to cover all Chameleon sites.

.. code-block:: console

    # Current site + current project (default)
    ccauth clouds-yaml --output ~/.config/openstack/clouds.yaml

    # All sites + current project, one entry per site
    ccauth clouds-yaml --output ~/.config/openstack/clouds.yaml --all-sites

    # Current site + all projects, one entry per project
    ccauth clouds-yaml --output ~/.config/openstack/clouds.yaml --all-projects

    # All sites + all projects
    ccauth clouds-yaml --output ~/.config/openstack/clouds.yaml --all-sites --all-projects

    # Overwrite existing entries
    ccauth clouds-yaml --output ~/.config/openstack/clouds.yaml --force

The ``--all-projects`` flag generates one entry per (site, project) pair, named
``<site>_<project>``. The ``--no-vendordata`` flag skips the metadata service
lookup; it requires ``--auth-url`` or ``--all-sites``.

ccauth openrc
++++++++++++++

Writes an ``openrc`` file for a single site (use ``clouds-yaml`` for multi-site).

.. code-block:: console

    ccauth openrc --output ~/openrc
    ccauth openrc --auth-url https://chi.uc.chameleoncloud.org:5000/v3 --output ~/openrc
    ccauth openrc --output ~/openrc --force

ccauth discover-projects
+++++++++++++++++++++++++

Lists all projects you have access to across all sites and prints ready-to-run
``ccauth clouds-yaml`` commands for each one. Triggers the device flow
automatically if no cached token is present.

.. code-block:: console

    ccauth discover-projects
    ccauth discover-projects --output ~/my-clouds.yaml   # use a custom path

Example output:

.. code-block:: text

    Found 2 project(s). To add a project to clouds.yaml, run:

      # Project 1
      ccauth clouds-yaml --all-sites --project-id abc123 --output ~/.config/openstack/clouds.yaml

      # Project 2
      ccauth clouds-yaml --all-sites --project-id def456 --output ~/.config/openstack/clouds.yaml

Examples
~~~~~~~~

Complete workflow: Authenticating and running OpenStack commands
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

To authenticate and run commands like ``openstack image list``, use the
``clouds.yaml`` approach:

.. code-block:: bash

    ccauth clouds-yaml --output ~/.config/openstack/clouds.yaml
    export OS_CLOUD=openstack
    openstack image list

Other examples
+++++++++++++++

List all your projects and available authentication options:

.. code-block:: bash

    ccauth discover-projects

Pre-authenticate or verify credentials:

.. code-block:: bash

    ccauth login

Generate credentials for all Chameleon sites:

.. code-block:: bash

    ccauth clouds-yaml --output ~/.config/openstack/clouds.yaml --all-sites

Site discovery
~~~~~~~~~~~~~~~

Without ``--auth-url``, the current site comes from the OpenStack metadata service
at ``169.254.169.254`` (vendordata). This works automatically when running on a
Chameleon instance.

With ``--all-sites``, ``ccauth`` fetches all available sites from the Chameleon
reference API (https://api.chameleoncloud.org/sites) and merges in the current
site from vendordata when available (e.g., to pick up the correct cloud name for
KVM).

Use ``--no-vendordata`` to skip the metadata service entirely; this requires
``--auth-url`` or ``--all-sites``.

Override the discovery endpoints with ``--sites-api-url`` and ``--metadata-url``.
