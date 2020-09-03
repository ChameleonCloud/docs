.. _globus:

====================
Sign in with Globus
====================

Chameleon supports signing in and registering via `Globus Auth
<https://auth.globus.org>`_, an authentication service that is already deployed
across many host institutions. Most new users can simply sign up via their
existing host instituation account. If you do not see an option for logging in
to Globus via your host institution, it is always possible to log in with any
Google account or else create a `Globus ID <https://globusid.org/>`_ tied to an
email and password that you provide.

Migrating to Globus from an old Chameleon account
=================================================

Chameleon considers Globus to be a more secure and long-term authentication
mechanism and will eventually drop support for signing in via legacy Chameleon
accounts, which use a username and password. Existing Chameleon users can link
their Globus account to their old Chameleon account so that they preserve their
project memberships, disk images, SSH key pairs, and other data saved over time.

.. important::

   Existing Chameleon users should go through the account linking process
   **before** attempting to sign in with Globus. Signing in before linking
   accounts can lead to you accidentally creating a new Chameleon account, if we
   cannot match the email address on your Globus account to the one you used
   when registering for Chameleon.

To link your old account to Globus:

1. Sign in to the `Chameleon identity management interface
   <https://auth.chameleoncloud.org/auth/realms/chameleon/account/identity>`_.
   When prompted to sign in, click the "Looking to log in with your old
   Chameleon account?" link, rather than the Globus button. This will bring
   you to a page where you can log in with your old Chameleon username and
   password.

   .. figure:: globus/globus_link_account_login.png
      :alt: Logging in via an existing Chameleon account.
      :figclass: screenshot

2. Once logged in, you can add your Globus account as a linked identity. Click
   the "Add" button and log in to your Globus account, if you are not already.
   Your Chameleon account will be automatically linked to your Globus account,
   allowing you to log in to your existing Chameleon account via Globus in the
   future.

   .. figure:: globus/globus_link_account.png
      :alt: Adding a Globus account to an existing Chameleon user.
      :figclass: screenshot

Current limitations
-------------------

TODO: note current limitations of account linking.
