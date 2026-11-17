.. _cli-ccauth:

ccauth command
==============

``ccauth`` is a command-line tool that authenticates you with Chameleon via
your browser and generates OpenStack credentials (``clouds.yaml`` or
``openrc``) for use with the OpenStack CLI. It caches and refreshes
credentials automatically, and works with any OpenStack CLI or API command
that understands a ``clouds.yaml`` file.

The ``ccauth`` package must be installed in the same Python environment as the
OpenStack clients using it. On first run, you'll be prompted to visit a URL
to authenticate via your browser. Subsequent runs reuse the cached refresh
token silently, unless it has expired and needs to be refreshed.

.. note::

   ``cc-login`` has been removed, and ``ccauth`` no longer creates
   application credentials. If you used ``cc-login``, see
   :ref:`cli-cc-login` for the equivalent ``ccauth`` commands.

Installation
~~~~~~~~~~~~

``ccauth`` is preinstalled and available in the PATH on all Chameleon
supported images, so no installation is required when using Chameleon images.

To install ``ccauth`` on your local system, install the ``chameleon-ccauth``
package from PyPI:

.. code-block:: console

    pip install chameleon-ccauth

This installs the ``ccauth`` command and the ``v3chameleonoidc`` keystoneauth1
plugin.

Quick start
~~~~~~~~~~~

Setup depends on where you run ``ccauth``:

- **On a Chameleon instance** (a bare-metal node or KVM VM you launched on
  Chameleon), ``ccauth`` reads the site and project from the instance's
  metadata service. One command is enough.
- **Anywhere else** (your laptop, a CI runner, a VM on another cloud), there is
  no Chameleon metadata service, so you have to tell ``ccauth`` which project
  to use.

On a Chameleon instance
+++++++++++++++++++++++

.. code-block:: bash

    # Write a clouds.yaml entry for this instance's site and project.
    # On first run you'll be prompted to visit a URL to authenticate.
    ccauth clouds-yaml --output ~/.config/openstack/clouds.yaml

    export OS_CLOUD=openstack   # the default entry name; change it with --cloud-name
    openstack server list

.. _cli-ccauth-own-machine:

On your own machine
+++++++++++++++++++

.. code-block:: bash

    # 1. List your projects. On first run you'll be prompted to visit a URL to authenticate.
    ccauth discover-projects

    # 2. Run the command it prints for the project you want. It looks like this:
    ccauth clouds-yaml --all-sites --project-id <project-id> --output ~/.config/openstack/clouds.yaml

    # 3. Choose a site by its ID: uc (CHI@UC), tacc (CHI@TACC), kvm (KVM@TACC), edge (CHI@Edge), ...
    export OS_CLOUD=uc
    openstack server list

This writes one ``clouds.yaml`` entry per Chameleon site, named by site ID.

If you run the Chameleon instance command on your own machine, it fails with:

.. code-block:: text

    Could not determine current site. Pass --auth-url or use --all-sites to discover from the reference API.

That just means you're not on a Chameleon instance. Use the steps under
:ref:`cli-ccauth-own-machine` instead.

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
Works on any machine.

.. code-block:: console

    ccauth login
    ccauth login --auth-url https://chi.uc.chameleoncloud.org:5000/v3
    ccauth --debug login

ccauth logout
+++++++++++++

Clears all cached refresh tokens (for every identity provider).

.. code-block:: console

    ccauth logout

ccauth clouds-yaml
+++++++++++++++++++

Writes a ``clouds.yaml`` file. By default the site and project come from the
Chameleon metadata service, which only exists on a Chameleon instance. To run
it anywhere else, use one of the combinations marked "Any machine":

.. list-table::
   :header-rows: 1

   * - Flags
     - Entries written
     - Works on
   * - *(none)*
     - Current site, current project
     - Chameleon instance only
   * - ``--all-projects``
     - Current site, every project
     - Chameleon instance only
   * - ``--all-sites``
     - Every site, current project
     - Chameleon instance only
   * - ``--all-sites --project-id ID``
     - Every site, that project
     - Any machine
   * - ``--all-sites --all-projects``
     - Every site, every project
     - Any machine
   * - ``--auth-url URL --project-id ID``
     - That site, that project
     - Any machine
   * - ``--auth-url URL --all-projects``
     - That site, every project
     - Any machine

.. code-block:: bash

    # On a Chameleon instance: current site + current project
    ccauth clouds-yaml --output ~/.config/openstack/clouds.yaml

    # Anywhere: all sites + one project (get the ID from `ccauth discover-projects`)
    ccauth clouds-yaml --output ~/.config/openstack/clouds.yaml --all-sites --project-id <project-id>

    # Anywhere: all sites + all projects
    ccauth clouds-yaml --output ~/.config/openstack/clouds.yaml --all-sites --all-projects

    # Overwrite existing entries
    ccauth clouds-yaml --output ~/.config/openstack/clouds.yaml --all-sites --project-id <project-id> --force

Single-site entries are named ``openstack`` (change with ``--cloud-name``).
``--all-sites`` names entries by site ID (``uc``, ``tacc``, ...).
``--all-projects`` generates one entry per (site, project) pair, named
``<site>_<project>``.

ccauth openrc
++++++++++++++

Writes an ``openrc`` file for a single site (use ``clouds-yaml`` for
multi-site). On a Chameleon instance it uses the instance's site and project.
Anywhere else, pass ``--auth-url``, ``--region-name``, and ``--project-id``
(the project's ID at that site).

.. code-block:: bash

    # On a Chameleon instance
    ccauth openrc --output ~/openrc
    ccauth openrc --output ~/openrc --force

    # Anywhere
    ccauth openrc --auth-url https://chi.uc.chameleoncloud.org:5000/v3 --region-name CHI@UC \
      --project-id <project-id> --output ~/openrc

ccauth discover-projects
+++++++++++++++++++++++++

Lists all projects you have access to across all sites and prints ready-to-run
``ccauth clouds-yaml`` commands for each one. Works on any machine, and is the
easiest way to get started when you're not on a Chameleon instance. Triggers
the device flow automatically if no cached token is present.

.. code-block:: console

    ccauth discover-projects
    ccauth discover-projects --output ~/my-clouds.yaml   # use a custom path in the printed commands

Example output:

.. code-block:: text

    Found 2 project(s). To add a project to clouds.yaml, run:

      # Project 1
      ccauth clouds-yaml --all-sites --project-id abc123 --output ~/.config/openstack/clouds.yaml

      # Project 2
      ccauth clouds-yaml --all-sites --project-id def456 --output ~/.config/openstack/clouds.yaml

Generated clouds.yaml format
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: yaml

    clouds:
      openstack:
        auth_type: v3chameleonoidc
        auth:
          auth_url: https://chi.uc.chameleoncloud.org:5000/v3
          identity_provider: chameleon
          protocol: openid
          client_id: chi-cli-device-token
          discovery_endpoint: https://auth.chameleoncloud.org/auth/realms/chameleon/.well-known/openid-configuration
          project_id: <your-project-id>
          project_domain_id: <your-project-domain-id>
        region_name: CHI@UC

Site discovery
~~~~~~~~~~~~~~~

Without ``--auth-url``, the current site and project come from the OpenStack
metadata service at ``169.254.169.254`` (vendordata). This is only available on
a Chameleon instance. Anywhere else, ``clouds-yaml`` and ``openrc`` fail with
``Could not determine current site`` unless you pass ``--auth-url`` or
``--all-sites``.

With ``--all-sites``, ``ccauth`` fetches all available sites from the Chameleon
reference API (https://api.chameleoncloud.org/sites) and merges in the current
site from vendordata when available (e.g., to pick up the correct cloud name for
KVM or edge nodes).

Options
~~~~~~~

.. list-table::
   :header-rows: 1

   * - Flag
     - Default
     - Description
   * - ``--auth-url URL``
     - from metadata service (Chameleon instances only)
     - Keystone auth URL (skips discovery)
   * - ``--region-name NAME``
     - from metadata service (Chameleon instances only)
     - OpenStack region
   * - ``--project-id ID``
     - from metadata service (Chameleon instances only)
     - OpenStack project ID
   * - ``--client-id ID``
     - ``chi-cli-device-token``
     - OIDC client ID
   * - ``--discovery-endpoint URL``
     - Chameleon Keycloak
     - OIDC discovery URL
   * - ``--cloud-name NAME``
     - ``openstack``
     - Cloud name in ``clouds.yaml`` (single-site mode only)
   * - ``--debug``
     - false
     - Enable debug logging

Advanced options
++++++++++++++++

These options control site discovery and are rarely needed.

.. list-table::
   :header-rows: 1

   * - Flag
     - Default
     - Description
   * - ``--no-vendordata``
     - false
     - Skip the metadata service lookup. Requires ``--auth-url`` or
       ``--all-sites``.
   * - ``--sites-api-url URL``
     - ``https://api.chameleoncloud.org/sites``
     - Chameleon reference API URL used by ``--all-sites``
   * - ``--metadata-url URL``
     - ``http://169.254.169.254/openstack/latest/vendor_data2.json``
     - Metadata service URL for vendordata

Environment variables
~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1

   * - Variable
     - Default
     - Description
   * - ``CC_LOGIN_STATE``
     - ``~/.cache/ccauth``
     - Directory for cached refresh tokens (one ``refresh_token-<hash>.json``
       per identity provider and client ID)

Library usage
~~~~~~~~~~~~~

``ccauth`` can also be used as a Python library:

.. code-block:: python

    # Core OIDC auth — build a keystoneauth1 session
    from ccauth import AuthConfig, build_session

    config = AuthConfig(auth_url="https://chi.uc.chameleoncloud.org:5000/v3")
    session = build_session(config)  # prompts device flow on first call

    # Site discovery
    from ccauth import from_reference_api, from_vendordata

    sites = from_reference_api()   # all Chameleon sites
    sites = from_vendordata()      # current site (on a Chameleon instance)

For more information, or if you're interested in contributing to its
development, see the `ccauth GitHub repository
<https://github.com/ChameleonCloud/ccauth>`_.
