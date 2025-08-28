.. _InCommon: https://incommon.org/federation

.. _federation:

===============================
Sign In with Federated Identity
===============================

Federated login enables users to use a single set of credentials to log into
many different services. For example, federated login allows you to use your
university or other institutional credentials to log into Chameleon--there is
no need to create a new account. In addition, since federated login is supported
by many testbeds and services across scientific infrastructures you will be able
to sign in once and use multiple services.

Chameleon uses `Globus Auth <https://globus.org>`_, a popular authentication
service, to implement federated login and federates with entities supported by
Globus. **We strongly recommend using federated login as it's the simplest and most 
convenient way to access Chameleon.** Users can sign in using their existing institutional 
account if their institution is an `InCommon`_ member, use their Google account, or create a
`Globus ID <https://globusid.org/what>`_ tied to an email and password that they
provide.

Logging In
==========

To log in to the Chameleon user portal, where you can manage your projects,
user profile, and submit |Help Desk| tickets, use the "Log in" button.

.. figure:: federation/user-portal-login.png
   :alt: Login button for the Chameleon user portal
   :figclass: screenshot

To log in to any of the testbed sites (|CHI@TACC|, |CHI@UC|, |CHI@NCAR|, |CHI@Edge|, |KVM@TACC|) or the
:ref:`Jupyter environment <jupyter>`, just click their item in the "Experiment"
dropdown on |Home|. The login process is triggered
automatically.

.. important::

   You must be part of project with an active allocation to use the testbed
   sites! Refer to our :ref:`"getting started" guide <getting-started-project>`
   for more info.

.. note::

   You can bookmark the URLs to the testbed sites and Jupyter environment if
   you want to access them directly in the future.

.. figure:: federation/application-login.png
   :alt: Links for accessing testbed sites and the Jupyter interface
   :figclass: screenshot

You will be taken to a Single Sign On (SSO) page with several authentication options.
**We recommend choosing "Sign in via federated identity" for the easiest experience.**

Authentication options
----------------------

- **Sign in via federated identity** ⭐ **RECOMMENDED**: This is the simplest way to access 
  Chameleon! Use your existing institution, research lab, or university credentials to log in. 
  This requires your host institution to participate in the `InCommon`_ federation. Most major 
  universities and research institutions are already members.

- **Google**: Sign in with any Google account if your institution isn't part of InCommon or 
  if you prefer using your Google credentials.

- **ORCiD**: Sign in with a valid ORCiD account for research credential integration.

.. tip::
   **New users**: If you're unsure which option to choose, try "Sign in via federated identity" 
   first - most universities and research institutions support this method, making it the fastest 
   way to get started with Chameleon.

.. warning::
   You may not find your institution on Globus. If so, you can still create an
   account with another identity, such as GitHub, Google, or ORCiD. However,
   we encourage users to sign up using their institution, as it helps the 
   Chameleon operators verify user identity, which is an essential step 
   to getting Principal Investigator status on the testbed.

.. note::
   Chameleon has fully migrated to federated identity authentication. Legacy 
   Chameleon username/password accounts are no longer supported.

.. figure:: federation/sso-login.png
   :alt: Single Sign On (SSO) portal login
   :figclass: screenshot

   The Single Sign On (SSO) portal login page.

Terms and Conditions
====================

When creating an account, you will be asked to accept `terms and conditions
<https://auth.chameleoncloud.org/auth/realms/chameleon/terms>`_ of use,
note that as part of those terms and conditions you are requested to
acknowledge Chameleon in publications produced using the testbed. See our FAQ
for information on `how to reference Chameleon in your publications
<https://www.chameleoncloud.org/learn/frequently-asked-questions/#toc-how-should-i-cite-chameleon->`_
and the suggested `acknowledgement text
<https://www.chameleoncloud.org/learn/frequently-asked-questions/#toc-how-should-i-acknowledge-chameleon->`_.

Account linking
===============

Chameleon accounts are linked to a federated identity provider, Globus and (previously) TACC.
If you are no longer wish to/are able to log in via your original account source (e.g. you move institutions)
You can re-link your Chameleon account assuming you have access to same email.

1. Log out of the Chameleon site via the menu on the top right of the web page on whatever platform you are using.

2. `Log out of Chameleon's authentication service <https://auth.chameleoncloud.org/auth/realms/chameleon/protocol/openid-connect/logout>`_.

3. `Sign into Globus <https://app.globus.org/settings/identities>`_ with the same primary email address as your Chameleon account.
   If your institution is not supported by Globus login, we recommend creating a Globus ID or ORCID account.

4. Return to the Chameleon website from step 1, and click "Log in" and then "Sign in via federated login".

5. If an existing Chameleon account was found with the same email address, you will see a message saying "You need to verify your email address to link your account with Globus Auth."
   Check your email inbox for a verification link.
   Once you click this link, your Chameleon account will now be linked to the Globus account from step 3, and you should use this login method when using Chameleon in the future.

   If you don't see this message, then your Globus account is using an email address that Chameleon doesn't have registered.
   Please contact the :doc:`Help Desk <help>` for further assistance regarding this or any other issue with the account linking process.


Troubleshooting Login Issues
============================

If you experience difficulty logging in, try these solutions:

**Common Authentication Issues:**

- **Institutional credentials not working**: Ensure your institutional credentials are 
  up-to-date and correctly linked to your Chameleon account
- **Browser issues**: Clear your browser cache and cookies, then try logging in again
- **Password reset problems**: Use the password reset links provided in the portal

**Getting Help:**

For persistent login issues, contact our :doc:`Help Desk <help>` with details about:
- Which authentication method you're trying to use
- Any error messages you're seeing
- Your institutional affiliation (if using federated login)

.. note::
   Users who had legacy Chameleon accounts (created before November 2020) successfully 
   completed migration to federated identity in 2021. All current authentication uses 
   federated identity providers.
