.. _cli-cc-login:

cc-login command
================

If you use a CC-* image, a ``cc-login`` command will be available in the
``cc`` user's `PATH`. The command performs device authentication, caches an
application credential for reuse, and can generate OpenStack ``openrc`` files
or entries for ``clouds.yaml`` so the OpenStack CLI and libraries can use the
cached credential.

The device authentication flow directs you to a URL in your browser where you
log in with your Chameleon credentials and approve the device request. Once
approved, ``cc-login`` creates an application credential on your behalf and
caches it for reuse, so subsequent OpenStack operations do not require
authentication.

.. warning::

   Authentication information provided through instance vendor-data is
   being deprecated. Use ``cc-login`` to obtain fresh application credentials
   instead.

Usage
~~~~~

.. code-block:: console

    cc-login [OPTIONS]

Options
~~~~~~~

The command accepts various options to configure authentication, credential caching,
and output format. Some of the most commonly used ones are:

- ``--app-cred-name``, ``--app-cred-expires-hours``: Name and lifetime (in hours)
  for the application credential (default: 24 hours).
- ``--ttl-seconds``: Local cache validity period in seconds before cc-login will
  refresh the credential (default: 24 hours).
- ``--force-refresh``: Bypass the local cache and perform fresh device
  authentication + app-credential creation.
- ``--output-openrc``, ``--force-openrc``: Write an ``openrc``-style file with
  the app-credential (useful for sourcing in shell sessions).
  Use ``--force-openrc`` to overwrite an existing file.
- ``--output-clouds-yaml``, ``--cloud-name``, ``--force-clouds-yaml``:
  Add or update a cloud entry in ``clouds.yaml`` (default cloud name: ``chameleon``).
  Use ``--force-clouds-yaml`` to overwrite an existing entry.

Examples
~~~~~~~~

Complete workflow: Authenticating and running OpenStack commands
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

To authenticate and run commands like ``openstack image list``, you have two options
to use credentials obtained via ``cc-login``:

**Option 1: Source an openrc file**

Generate an ``openrc`` file and source it in your shell session:

.. code-block:: bash

    cc-login --output-openrc ~/openrc_chameleon
    source ~/openrc_chameleon
    openstack image list

**Option 2: Use clouds.yaml**

Alternatively, generate or update an entry in ``clouds.yaml`` and use the
``OS_CLOUD`` environment variable:

.. code-block:: bash

    cc-login --output-clouds-yaml ~/.config/openstack/clouds.yaml \
      --cloud-name chameleon
    export OS_CLOUD=chameleon
    openstack image list

Other examples
+++++++++++++++

Force a fresh device authentication (ignoring the local cache):

.. code-block:: bash

    cc-login --force-refresh

