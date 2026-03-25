.. _cli-cc-login:

cc-login command
================

If you use a CC-* image, a ``cc-login`` command will be available in the
``cc`` user's `PATH`. The command performs device authentication, caches an
application credential for reuse, and can generate OpenStack ``openrc`` files
or entries for ``clouds.yaml`` so the OpenStack CLI and libraries can use the
cached credential.

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

Generate an ``openrc`` file for sourcing:

.. code-block:: bash

    cc-login --output-openrc ~/openrc_chameleon

Add or update a cloud entry in ``clouds.yaml``:

.. code-block:: bash

    cc-login --output-clouds-yaml ~/.config/openstack/clouds.yaml \
      --cloud-name chameleon

Force a fresh device authentication (ignoring cache):

.. code-block:: bash

    cc-login --force-refresh

