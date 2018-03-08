======================================
The Command Line Interface
======================================

_______________
Overview
_______________

The Command Line Interface (CLI) provides a way to interact with Chameleon resources using shell and scripting tools. Chameleon uses the OpenStack Client to provide CLI functionality.  In addition, the CLI provides access to Chameleon features that are not accessible through the GUI, such as Gnocchi metrics and advanced networking features. This documentation provides an overview of how to install the OpenStack Client and configure your shell environment to access Chameleon features for your project.

.. note:: Chameleon Cloud is primarily designed to support Unix shell environments. Windows instructions are here for reference, but it is highly recommended that CLI access is performed through a Unix shell. Windows 10 includes `Windows Subsystem for Linux <https://docs.microsoft.com/en-us/windows/wsl/install-win10>`_, which can provide this functionality.

___________________________
Installing the CLI
___________________________

Linux/macOS Installation
________________________

#. Install Python from https://www.python.org, or through your operating system's package manager.
#. Open a shell or terminal.
#. Install the CLI by typing ``pip install python-openstackclient``.
#. Verify that it has installed correctly by typing ``openstack`` in the command prompt. You will enter the Openstack Client in interactive mode and your prompt should change to ``(openstack)``.
#. Exit the client by typing ``exit``.

Windows Installation
____________________


To install ``python-openstackclient`` on Windows, you must first install Python and configure your ``PATH`` environment variable to include the ``Scripts`` subdirectory of your Python installation.

#. Install Python from https://www.python.org.
#. Open System Properties and click the *Environment Variables* button at the bottom of the screen.

   .. figure:: cli/systemproperties.png
      :alt: Windows 10 System Properties

      Windows 10 System Properties

#. Select the ``PATH`` environment variable and click *Edit*.

   .. figure:: cli/environmentvariables.png
      :alt: Windows 10 Environment Variables

      Windows 10 Environment Variables

#. Add your Python directory and your Python installation's ``Scripts`` directory to the ``PATH`` environment variable.  If you have installed Python 2.7 to its default installation location, you should add ``C:\Python27; C:\Python27\Scripts;`` to your environment variables.

   .. figure:: cli/path.png
      :alt: The PATH Environment Variable

      The PATH Environment Variable

#. Open a command prompt or Windows Powershell.
#. Install the CLI by typing ``pip install python-openstackclient``.
#. Verify that it has installed correctly by typing ``openstack`` in the command prompt. You will enter the Openstack Client in interactive mode and your prompt should change to ``(openstack)``.
#. Exit the client by typing ``exit``


.. _cli-rc-script:

_______________________
The OpenStack RC Script
_______________________

The CLI is easiest to use when environment variables are pre-configured to access features associated with your project. For example, if you are attempting to access a project's Gnocchi metrics at Texas Advanced Computing Center, the script will configure environment variables to access those specific metrics. To download a script to configure the CLI to access your project, follow these steps:

#. Log in to the GUI for the site where you wish to access Chameleon resources and features - either https://chi.tacc.chameleoncloud.org or https://chi.uc.chameleoncloud.org
#. Select the project you wish to access by clicking on the Project Dropdown in the upper left corner next to the *Chameleon* logo.

   .. figure:: gui/project_dropdown.png
      :alt: The Project Dropdown

      The Project Dropdown

#. In the User Dropdown in the upper right corner, click on *Openstack RC File v3*. A shell script will download to your local computer.

   .. figure:: cli/userdropdown.png
      :alt: The OpenStack RC File v3 link in the User Dropdown

      The OpenStack RC File v3 link in the User Dropdown

#. This file contains a Unix shell script that configures environment variables to access the *specific project at the Chameleon site from where you downloaded the script*. Open a shell or terminal, navigate to the location where you downloaded the script and activate it by typing ``source CH-XXXXXX-openrc.sh`` where ``XXXXXX`` matches your project name.

   .. note:: This shell script is intended for Unix users, and will not work in a Windows command prompt.

#. You will be prompted to enter in your Chameleon password. Do this now.
#. Your current terminal session has been configured to access your project. You will have to re-run the script if you close your terminal session. You may enter the CLI interactive mode by typing ``openstack`` in your terminal session.

   .. note:: If you are a Windows user, you must manually supply the environment variables found in the script. You may look at these values by opening the script in a text editor. To use the ``openstack`` CLI from a Windows command prompt, you must use the switches ``--os-auth-url``, ``--os-project-id``, ``--os-project-name``, ``--os-user-domain-name``, ``--os-username``, ``--os-password-input``, ``--os-region-name``, ``--os-interface`` and ``--os-identity-api-version``. Each switch is followed by an ``=`` and the associated value from the script. The value for ``--os-password-input`` is your plaintext user password.

#. In your terminal session. Verify that you have access to your project by typing ``project list`` at the ``(openstack)`` prompt. You should see your project as well as any other projects that you have access to.

_____________________________
Using the CLI
_____________________________

The CLI may be used in both Interactive Mode or as commands in a shell script in Shell Mode. In each case, the shell must be configured using the OpenStack RC Script or the appropriate command line switches. You may see a verbose list of all switches and commands by typing ``openstack --help``. This documentation site provides details on using the CLI for each Chameleon feature in the relevant sections in the Technical Guide. You may see full vendor documentation for the OpenStack Client by visiting https://docs.openstack.org/python-openstackclient/latest/ .

Interactive Mode
________________

The Interactive Mode allows you to use commands through an interactive prompt. Once entering the Interactive Mode, you will see a ``(openstack)`` prompt. You may list all commands by typing ``help``. To list subcommands, you may type the name of a command. For example, if you wish to see a list of ``image`` subcommands, type ``image``. If you wish to see parameters and flags for a specific subcommand, simply type the name of that subcommand. For example, to see specific flags for ``image save``, type ``image save``. 

Shell Mode
___________________

Each CLI command can be used in your terminal exactly the same way that it appears in Interactive Mode, simply by preceding the command with ``openstack``. For example, to run ``image list`` from a terminal session, you can type ``openstack image list``, followed by any additional flags.

.. note:: Windows users must supply the necessary switches (``--os-auth-url``, ``--os-project-id``, etc.) with each command, or configure the corresponding environment variables.

Missing Environment Variables
_____________________________

Using a Unix terminal with pre-configured environment variables from an OpenStack RC Script is the preferred way to use the CLI. If you receive the error ``Missing value auth-url required for auth plugin password`` while using a command, it is likely that your terminal session has not been configured with the environment variables. You must re-run the OpenStack RC Script for each terminal session or use the necessary command line switches to configure the CLI to use Chameleon.
