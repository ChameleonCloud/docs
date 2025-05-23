Managing Shares using CLI
=========================

As all other Chameleon services, you can manage your shares via CLI as well. 

.. tip::

  Reading :ref:`Command Line Interface (CLI) <cli>` is highly recommended before continuing on the following sections.

In addition to installing the CLI, you must also install `python-manilaclient` package:

.. code-block:: bash

  pip install python-manilaclient

Then, you must set environment variables for your account and project using :ref:`The OpenStack RC Script <cli-rc-script>`.

.. tip::

  If you get HTTP 406 error of ``version is not supported by the API``, add ``--os-share-api-version 2.65`` to
  the command to specify manila minor version.

List Shares
------------

To list all shares of your project, run the following command:

.. code-block:: bash

  openstack share list
  
You can filter the results by the share name via adding a ``--name`` argument to the list command.

Create Share
------------

To create a share, using the following command:

.. code-block:: bash

  openstack share create --name <name of your share> NFS <size in GiB>

For example, for creating a 1 GiB share with name of ``my-first-share``, run:

.. code-block:: bash

  openstack share create --name my-first-share NFS 1

.. note::

  Only the NFS protocol is supported. 

You can add the ``--public true`` to make your share public.

Edit Share
----------

To change the visibility of a share, run:

.. code-block:: bash

  openstack share set --public <true/false> <name/id of the share>

To update the name or the description of a share, run:

.. code-block:: bash

  openstack share set --name <new name> --description <description> <name/id of the share>

To extend/shrink the size of a share, run:

.. code-block:: bash

  openstack share resize <name/id of the share> <new size in GiB>

.. _view-share-cli:

View Share
----------

To view the details of a share, run:

.. code-block:: bash

  openstack share show <name/id of the share>

Delete Share
------------

To delete a share, run the following command:

.. code-block:: bash

  openstack share delete <name/id of the share>