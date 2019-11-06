.. _cli:

======================================
The Command Line Interface
======================================

_______________
Introduction
_______________

The Command Line Interface (CLI) provides a way to interact with Chameleon resources using shell and scripting tools. Chameleon uses the `OpenStack Client <https://docs.openstack.org/python-openstackclient/latest/>`_ to provide CLI functionality. This documentation section provides an overview on how to install the `OpenStack Client <https://docs.openstack.org/python-openstackclient/latest/>`_ and configure your shell environment to access Chameleon features.

.. attention::
    Some of the Chameleon features are **only** accessable via the CLI, such as the Gnocchi metrics and the advanced networking features.

.. note:: Chameleon Cloud is primarily designed to support Unix-like environments. Threfore, it is highly recommended using CLI in a Unix-like system. For Windows 10 users, you may want to enable `Windows Subsystem for Linux <https://docs.microsoft.com/en-us/windows/wsl/install-win10>`_ to get better experience with the Chameleon CLI.

.. _cli-installing:

___________________________
Installing the CLI
___________________________

Prerequisites
________________________

#. **Python** - Check if you have Python installed.
#. **PIP** - If you’re using Python 2.7.9 (or greater) or Python 3.4 (or greater), then PIP comes installed with Python by default.

OpenStack Client Installation
_________________________________

#. Install the CLI by typing ``pip install python-openstackclient`` in the terminal.
#. Verify that it has installed correctly by typing ``openstack``. You will enter the Openstack Client in interactive mode and your prompt should change to ``(openstack)``.
#. Exit the client by typing ``exit``.

.. _cli-rc-script:

_______________________
The OpenStack RC Script
_______________________

You must use the *OpenStack RC Scripts* to configure the environment variables for accessing Chameleon features. You can downloaded the script from the Chameleon GUI at the :ref:`gui-api-access`.

#. Log in to the GUI at `CHI@TACC <https://chi.tacc.chameleoncloud.org>`_ or `CHI@UC <https://chi.uc.chameleoncloud.org>`_. 

   .. important:: Download RC file from the site you would like to interact with.

#. Select the project you wish to access via :ref:`gui-project-menu`.

   .. figure:: gui/project_dropdown.png
      :alt: The Project Dropdown

      The Project Dropdown

#. Download *OpenStack RC Script* using :ref:`gui-user-menu` by clicking on *Openstack RC File v3*.

   .. figure:: cli/userdropdown.png
      :alt: The OpenStack RC File v3 link in the User Dropdown

      The OpenStack RC File v3 link in the User Dropdown

#. Run the following command in the terminal:

   .. code-block:: shell
   
       source <path/to/openstack_rc_file>

   .. note:: The command **would not** work for Windows users. Skip this step and the next step if you are using Windows system.

#. Enter your password when prompted.
#. For macOS/Linux users, your current terminal session has been configured to access your project. Now type ``openstack`` in your terminal session.
   
   For Windows users, you have to provide the environment variables in the *OpenStack RC* script as ``openstack`` command parameters. Run the following command in your Windows prompt:
   
   .. code-block:: shell
   
       openstack --os-auth-url <OS_AUTH_URL> \
       --os-project-id <OS_PROJECT_ID> \
       --os-project-name <OS_PROJECT_NAME> \
       --os-user-domain-name <OS_USER_DOMAIN_NAME> \
       --os-username <OS_USERNAME> \
       --os-password <OS_PASSWORD> \
       --os-region-name <OS_REGION_NAME> \
       --os-interface <OS_INTERFACE> \
       --os-identity-api-version <OS_IDENTITY_API_VERSION>
       
   Replace values of the parameters by reading from the *OpenStack RC* script.
   
   Another way to configure *OpenStack Client* for Windows users is to add/edit environment variables manually via *System Properties* window. Then, click on *Environment Variables...* button and manually add/edit the environment variables in *OpenStack RC Script*  to *Environment Variable* window.
   
   .. figure:: cli/systemproperties.png
      :alt: System Properties Window of Windows System

      System Properties Window of Windows System

   .. note:: For macOS/Linux users, every time when open a new terminal, you have to run the ``source`` command to access *OpenStack Client*.
   
   .. error:: If you get authentication error, check if you input your password correctly.

#. Type ``project list`` at the ``(openstack)`` prompt. You should see a list of the projects you belong to.

   .. error:: If you get permission error at this step, please check that 1) the terminal session has been configured correctly with the environment variables; 2) the *OpenStack RC* script you ``source`` is **v3**; 3) the *OpenStack Client* version is the latest. To check the *OpenStack Client* version, use ``openstack --version`` command. Some older version of the *OpenStack Client* may cause errors.
   
   .. error:: If you get the ``Missing value`` error when using a command, it is likely that your terminal session has not been configured correctly and completely with the environment variables. The error may be fixed by re-running the ``source`` command over the OpenStack RC Script or using the command line switches.


_____________________________
Using the CLI
_____________________________

You can use the CLI in either Interactive Mode or Shell Mode. In either mode, the *OpenStack Client* has to be configured by using the *OpenStack RC Script* or by providing the command line switches. For more information about the usage of *OpenStack Client*, run ``openstack --help``.

Interactive Mode
________________

The Interactive Mode allows you to use the ``openstack`` commands through an interactive prompt. To start the Interactive Mode, type ``openstack`` in the configured terminal. Once entering the Interactive Mode, you will see a ``(openstack)`` prompt. Type the command you would like to run at the prompt. To find out the commands, type ``help``.

Shell Mode
___________________

Each CLI command can be used in your terminal exactly the same way that it appears in the Interactive Mode, simply by preceding the command with ``openstack``. For example, the command ``image list`` in the Interactive Mode is equivalent to the command ``openstack image list`` in the Shell Mode.
