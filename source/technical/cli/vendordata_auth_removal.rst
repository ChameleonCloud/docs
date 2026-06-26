.. _cli-vendordata-auth-removal:

Changes to automatic credential setup on instances
====================================================

Chameleon's vendordata service previously (June 2026 and earlier) provided
authentication information to instances at boot, which Chameleon-supported
(CC-\*) images used to automatically populate ``~/openrc`` and mount the
object store. This authentication information has been removed from vendordata.

.. important::

   Instances no longer come with OpenStack credentials or an object store
   mount configured automatically. You must now authenticate with
   :ref:`ccauth <cli-ccauth>` yourself after the instance boots.

Authenticating with the CLI
----------------------------

``~/openrc`` is no longer pre-populated. Generate it yourself with
``ccauth``, which authenticates via OIDC device flow instead of vendordata:

.. code-block:: bash

    ccauth openrc --output ~/openrc
    source ~/openrc
    openstack image list

See :ref:`ccauth <cli-ccauth>` for the full set of commands, including
``clouds-yaml`` for multi-site or multi-project credentials.

.. note::

   The ``cc-generate-openrc`` command, which previously read credentials from
   vendordata to populate ``~/openrc``, has been removed. Use ``ccauth
   openrc`` instead.

Mounting the object store
--------------------------

The object store is no longer auto-mounted at boot. To set it up, authenticate
with ``ccauth`` and then run ``setup-cc-mount-object-store`` once:

.. code-block:: bash

    ccauth openrc --output ~/openrc
    setup-cc-mount-object-store

Changes to ``cc-snapshot``
---------------------------

``cc-snapshot`` no longer looks up credentials from vendordata. It now
always uses OpenStack credentials from the environment (``clouds.yaml``/
``OS_CLOUD`` or ``OS_AUTH_URL``/``OS_TOKEN``), and must be run with
``sudo -E`` so root inherits them:

.. code-block:: bash

    ccauth openrc --output ~/openrc
    source ~/openrc
    sudo -E cc-snapshot <image_name>

See the :ref:`cc-snapshot utility <cc-snapshot-utility>` page for full usage.

Older images
-------------

These changes affect vendordata itself, so they apply regardless of which
image an instance is running. Older images that predate this change are
affected too, but cannot fall back to the tools they previously relied on:

- ``cc-generate-openrc`` will no longer work, since vendordata no longer
  carries credentials. Obtain an openrc file via :ref:`ccauth
  <cli-ccauth>` or by downloading it from the Horizon GUI instead.
- ``cc-snapshot`` will require OpenStack credentials to be set in the
  environment, as described above.
- Any object store mount configured to run at boot will fail, since the
  credentials it depended on are no longer available. You'll need to get
  the credentials and mount the object store manually as described above.
