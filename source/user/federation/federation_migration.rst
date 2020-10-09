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

Step-by-step instructions
=========================

1. **Sign in** to the `Chameleon identity management interface
   <https://auth.chameleoncloud.org/auth/realms/chameleon/protocol/openid-connect/auth?client_id=account&redirect_uri=https%3A%2F%2Fauth.chameleoncloud.org%2Fauth%2Frealms%2Fchameleon%2Faccount%2Fidentity&response_type=code&scope=openid&kc_idp_hint=tacc>`_.
   You will see a screen that prompts you for your existing Chameleon username
   and password.

   .. figure:: federation_migration/idp-tas-authenticate.png
      :alt: Sign in to identity management with your Chameleon credentials
      :figclass: screenshot

2. Once authenticated, you will be taken to a page showing all the identities
   (credentials) linked to your Chameleon user account. **Click the "Add"
   button** next to the entry for the Globus identity to iniate another login
   via federated identity. You can pick whichever login method you choose; your
   federated identity need not be tied to the same email address or username as
   your existing Chameleon account if you wish.

   .. figure:: federation_migration/idp-link-identity.png
      :alt: Link your Chameleon user account to a federated identity
      :figclass: screenshot

   Once added, your linked federated identity can be used to log in to your
   existing Chameleon account in the future, and you no longer need to use your
   Chameleon username and password to login to any part of the Chameleon
   infrastructure.

3. If you try to log in to any of the testbed sites with your linked federated
   identity, you may notice that some of your data is missing, namely:

   - *disk images* and *snapshots* you or other project members have created in
     the past,
   - *active or pending leases* you made,
   - *SSH keypairs* you previously associated with your account, and
   - *active server instances* launched recently

   Migrating to federated identity effectively creates a new account for you in
   the system, so in order to retain access to some of your saved data, a short
   data migration is necessary.

   **Go to the `migration page
   <https://www.chameleoncloud.org/user/migrate/>`_** in the Chameleon user
   portal to start this process (**note**: ensure you now log in to the user
   portal using federated login, and not the old sign-in page!)

   You should see a page that looks like the following.

   .. figure:: federation_migration/account-migration-page.png
      :alt: The account migration helper page.
      :figclass: screenshot

   .. important::

      Not all data can be migrated to your new account. Leases and active server
      instances will remain on your old account. If you wish to access these,
      you can log in to the testbed site using the old sign in method.

4. **Trigger a migration of your user** to copy over any SSH keypairs you
   previously associated with your account.

5. **Trigger migrations of projects** you are a member of to associate any disk
   images and snapshots to your new account. This only needs to be done once by
   any member of the project, but can also be re-run in the event that you or
   other project members create disk images/snapshots under their old account.

6. You should now have access to your old data via your new account linked to
   your federated identity!

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
