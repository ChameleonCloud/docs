.. _using-cli:

Using the CLI
=============

You can use the CLI in either Interactive Mode or Shell Mode. In either mode,
the OpenStack client has to be configured by using the *OpenStack RC Script* or
by providing the command line switches. For more information about the usage of
the OpenStack client, run ``openstack --help``.

Interactive Mode
----------------

The Interactive Mode allows you to use the ``openstack`` commands through an
interactive prompt. To start the Interactive Mode, type ``openstack`` in the
configured terminal. Once entering the Interactive Mode, you will see a
``(openstack)`` prompt. Type the command you would like to run at the prompt. To
find out the commands, type ``help``.

Shell Mode
----------

Each CLI command can be used in your terminal exactly the same way that it
appears in the Interactive Mode, simply by preceding the command with
``openstack``. For example, the command ``image list`` in the Interactive Mode
is equivalent to the command ``openstack image list`` in the Shell Mode.