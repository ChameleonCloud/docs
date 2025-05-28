.. _object-store-cli:

Managing Object Store using the CLI
====================================

.. tip::
   Reading :ref:`cli` is highly recommended before continuing on the following
   sections.

In addition to :ref:`cli-installing`, you must also install
``python-swiftclient`` package:

.. code-block:: bash

   pip install python-swiftclient

Then, you must set environment variables for your account and project using
:ref:`cli-rc-script`.

Working with Containers
-----------------------

To create a *Container*, use the following command:

.. code-block:: bash

   openstack container create <container_name>

.. tip::
   By default, the *Container* created using the above command will not be
   visible to the public.

To view all containers that belong to your project, run:

.. code-block:: bash

   openstack container list

.. tip::
   You may use ``--prefix <prefix>`` as a filter to list the containers whose
   name starts with ``<prefix>``.

To see details of a container, use the command:

.. code-block:: bash

   openstack container show <container_name>

To view a list of objects within a container, use the command:

.. code-block:: bash

   openstack object list <container_name>

To download a container with all the objects belong to it, use the following
command:

.. code-block:: bash

   openstack container save <container_name>

To delete a container and wipe out all the objects belong to it, use the
following command, and **be careful**!

.. code-block:: bash

   openstack container delete --recursive <container_name>

Working with Objects
--------------------

You may upload a file from your local machine to a container using the following
command:

.. code-block:: bash

   openstack object create <container_name> <local_filename>

.. tip::
   Optionally, you may name the object differently from it's original name in
   your local machine by using the ``--name`` parameter.

To delete an object from a container, run:

.. code-block:: bash

   openstack object delete <container_name> <object_name>

If you wish to download an individual object directly from a container, use the
command:

.. code-block:: bash

   openstack object save <container_name> <object_name>

Large object support
^^^^^^^^^^^^^^^^^^^^

The Swift CLI only supports objects up to 4GB. Larger objects are supported,
provided they are uploaded in segments. This advanced functionality is only
supported using a separate Swift interface. For a version compatible with
Chameleon's authentication, you need `python-swiftclient >= 3.11.1`, and
to generate and use an :ref:`Application Credential <cli-application-credential>`

.. code-block:: bash

   pip install "python-swiftclient>=3.11.1"

Instead of invoking commands via ``openstack``, you will instead use the
``swift`` command, which supports a ``--segment-size`` parameter, specifying
the segment size in bits. ``--segment-size 4831838208`` is close to the segment
limit of 4GB.

There is also a ``--changed`` flag, which prevents uploading of the object if
the checksum has not changed:

.. code-block:: bash

   swift --os-auth-type v3applicationcredential \
   --os-application-credential-id <credential_id> \
   --os-application-credential-secret <credential_secret> \
   upload --changed --segment-size 4831838208 \
   <container_name> <path>

Working with Folders
--------------------

There isn't "folders" when you managing the *Object Store* with the CLI.
However, when you create an object, you may use the delimiter ``/`` to specify
the path.