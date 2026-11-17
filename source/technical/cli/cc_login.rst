.. _cli-cc-login:

Removal of the cc-login command
===============================

The ``cc-login`` command, which created an application credential on your
behalf and wrote it to an ``openrc`` file or a ``clouds.yaml`` entry, has been
removed, and ``ccauth`` no longer creates application credentials. Running
``cc-login`` now prints a removal notice and exits with an error, so scripts
that call it fail instead of continuing without credentials.

.. important::

   Use :ref:`ccauth <cli-ccauth>` instead. Its ``openrc`` and ``clouds-yaml``
   commands write files that authenticate through the ``v3chameleonoidc``
   plugin, so ``ccauth`` must be installed in the same Python environment as
   your OpenStack client. It is preinstalled on CC-\* images; elsewhere,
   install it with ``pip install chameleon-ccauth``.

``openrc`` files and ``clouds.yaml`` entries that ``cc-login`` already wrote
stop working once their application credential expires. Regenerate them with
``ccauth``.

Replacing cc-login commands
---------------------------

.. list-table::
   :header-rows: 1

   * - ``cc-login``
     - ``ccauth`` replacement
   * - ``cc-login --output-openrc ~/openrc``
     - ``ccauth openrc --output ~/openrc``
   * - ``cc-login --output-clouds-yaml ~/.config/openstack/clouds.yaml``
     - ``ccauth clouds-yaml --output ~/.config/openstack/clouds.yaml``
   * - ``--app-cred-name``, ``--app-cred-expires-hours``, ``--ttl-seconds``
     - No replacement. ``ccauth`` caches a refresh token and renews
       credentials automatically.

``cc-login`` only worked with a single project and site at a time. ``ccauth``
can also generate credentials for every site and project you have access to;
see :ref:`ccauth <cli-ccauth>` for the full set of commands.
