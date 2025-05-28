.. _cli-authentication:

CLI authentication
==================

When using the CLI, you have to provide some credentials so the system trusts
that the operations are really being executed by your user account. There are
two ways of doing this.

Setting a CLI password
----------------------

You can set a CLI password via the `Chameleon Authentication Portal
<https://auth.chameleoncloud.org/auth/realms/chameleon/account/#/security/signingin>`_. The
password you associate with your account can not be used to log in to the GUI or
Jupyter interfaces and can only be used to authenticate a command-line client.

.. figure:: set_cli_password.png
   :alt: Setting a password in the Chameleon Authentication Portal

   Setting a password in the Chameleon Authentication Portal

The benefit of this method is that this password will work on any Chameleon
site.

.. note::

   You should set a strong password for your CLI password, and it should not be
   a password you use elsewhere. Otherwise, your account risks being compromised
   by an attacker who has possibly obtained your password from another breached
   service. We **highly** recommend using a password manager e.g., `BitWarden
   <https://bitwarden.com/>`_, `LastPass
   <https://www.lastpass.com/password-manager>`_, or `1Password
   <https://1password.com/>`_ to assist.

.. _cli-application-credential:

Creating an application credential
----------------------------------

You can also generate *application credentials*, which act as dedicated one-off
passwords that are authorized with the same permissions as your user account,
within a single project. If you work on multiple projects simultaneously, you
will need to generate one application credential for each project.

To create an application credential, navigate to the "Identity" dashboard in the
:ref:`gui`, and go to the "Application Credentials" panel. Create a new
application credential and name it something meaningful (such as "CLI access for
project CH-XXX"). **You will also need to check the "unrestricted" checkbox in
order to use the CLI to make leases in Blazar**. If you do not need to make
reservations via the CLI, you can leave the box unchecked, as it is the safer
option.

.. figure:: applicationcredentials.png
   :alt: Creating an application credential via the GUI

Once the system generates the credential, you will be given the option to
download an :ref:`RC file <cli-rc-script>` that configures the CLI to use the
application credential for authentication. You will only see the secret
credentials once, so make sure to save the RC file or the secret somewhere, as
if it's lost, you will have to delete the credential and create a new one.