.. _federation-migration:

================================
Migrating to federated identity
================================

Chameleon considers federation to be a more secure and long-term authentication
mechanism and will eventually drop support for signing in via legacy Chameleon
accounts, which use a username and password. Existing Chameleon users can link
their federated identity account to their old Chameleon account so that they
preserve their project memberships, disk images, SSH key pairs, and other data
saved over time.

To ease the transition, we still enable you to log in via your old Chameleon
username and password. Existing users however are highly encouraged to migrate
to a proper federated account, as over time we will announce a deprecation and
removal of support for the legacy accounts.

.. important::

   Existing Chameleon users should go through the account linking process
   **before** attempting to sign in with federated identity. Signing in before
   linking accounts can lead to you accidentally creating a new Chameleon
   account, if we cannot match the email address on your federated account to
   the one you used when registering for Chameleon.

To migrate your old account:

1. Sign in to the `Chameleon identity management interface
   <https://auth.chameleoncloud.org/auth/realms/chameleon/account/identity>`_.
   When prompted to sign in, click the "Looking to log in with your old
   Chameleon account?" link rather than the Globus Auth button. This will bring
   you to a page where you can log in with your old Chameleon username and
   password.

   .. figure:: federation_migration/globus_link_account_login.png
      :alt: Logging in via an existing Chameleon account.
      :figclass: screenshot

2. Once logged in, you can explicitly associate your federated identity. Click
   the "Add" button and log in to your federated account (if you are not
   already.) Your Chameleon account will be automatically linked to your
   federated identity, allowing you to log in to your existing Chameleon account
   via this federated identity in the future.

   .. figure:: federation_migration/globus_link_account.png
      :alt: Adding a federated account to an existing Chameleon user.
      :figclass: screenshot

Migrating testbed data
======================

Linking your Chameleon account to a federated identity will cause some testbed
resources to become unavailable, namely:

- Any disk image snapshots published historically to your project(s) via
  :ref:`cc-snapshot <cc-snapshot-utility>`.
- Any server keypairs associated with your user.
- :ref:`Experimental metrics <metrics>` and :ref:`experiment-precis` for old
  experiments and leases.
- Still-active server instances and leases. Please note that your server
  instances and leases have **not** been deleted; you just will not be able to
  see them in the GUI, nor enumerate them in the command-line interface.

If you wish to have some of this data transferred to your federated account,
please create a |Help Desk| ticket and a member of the Chameleon team will
assist you.

.. note::

   **2020-09-03**: Over time we hope to improve the migration process and make
   it easier to migrate your old disk images and key pairs without contacting
   the Help Desk.

Using the CLI
=============

If you use the :ref:`command line interface <cli>` when interacting with
Chameleon (or use another tool that interfaces directly with Chameleon's APIs),
you will no longer be able to authenticate with a username and password. You
should re-download your :ref:`RC file <cli-rc-script>` and use it when invoking
the CLI, as it will have new authentication parameters compatible with your
account pre-filled.

You can also look in to generating an :ref:`application credential
<cli-application-credential>` for your command line client or app, which may be
simpler.
