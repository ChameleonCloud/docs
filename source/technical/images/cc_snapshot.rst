.. _cc-snapshot-utility:

===========================
The ``cc-snapshot`` Utility
===========================

The ``cc-snapshot`` utility implements snapshotting a bare metal instance from command line and uploads it to `Glance <https://docs.openstack.org/glance/latest/>`_, so that it can be immediately used to boot a new bare metal instance. The snapshot images created with this tool are whole disk images.

For ease of use, ``cc-snapshot`` has been installed in all the appliances supported by the Chameleon project. If you would like to use it in a different setting, it can be downloaded and installed from the `github repository <https://github.com/ChameleonCloud/cc-snapshot>`_.

To make a snapshot of a bare metal instance, run the following command from inside the instance:

.. code-block:: bash

   sudo cc-snapshot <image_name>

.. tip::
   You may get warnings, such as "image too large", during snapshotting, and get prompted to confirm. If you are confident about what you are trying to do, you can skip all warnings by using the ``-f`` flag.

   .. code-block:: bash

      sudo cc-snapshot -f <image_name>

   In addition, you can exclude directories by using the ``-e`` flag.

   .. code-block:: bash

      sudo cc-snapshot -e <dir1> -e <dir2> <image_name>

   To see all available options for ``cc-snapshot``, run ``sudo cc-snapshot -h``.

You will be prompted to enter your username and password.

.. tip:: You can skip entering username and password by setting the ``OS_USERNAME`` and ``OS_PASSWORD`` environment variables. You can set those environment variables manually or using :ref:`cli-rc-script`.

.. note:: When using the ``cc-snapshot``, it will create an image within your project with the ``shared`` visibility. Anyone with access to your project can access this image.

.. note:: If you choose an *Image* name that already exists, the previous one **will not** be overwritten. A new *Image* with the same name but a different *UUID* will be generated.

.. note:: If you install a custom kernel, make sure the size of your running kernel (``/lib/modules/<kernel_version>``) is less than 4GB. To find out which kernel version you're running, run ``uname -r``.

.. _updating-snapshot:

Updating cc-snapshot
--------------------

.. error::
   If you receive the following error:

   .. code::

      public endpoint for image service in regionOne not found Unable to contact Glance, check username and password

   it means that you have an outdated copy of ``cc-snapshot`` and you will need to update ``cc-snapshot``.
   This usually happens when you use an older images that contains an outdated version of ``cc-snapshot``.

   You may also want to get new functionalities added to the latest version of ``cc-snapshot``.

   Run the following commands from your instance:

   .. code::

      curl -O https://raw.githubusercontent.com/ChameleonCloud/cc-snapshot/master/cc-snapshot
      sudo mv cc-snapshot /usr/bin/
      sudo chmod +x /usr/bin/cc-snapshot