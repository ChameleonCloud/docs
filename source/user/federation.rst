.. _federation:

================================
Sign in with federated identity
================================

Federated login enables users to use a single set of credentials to log into
many different services. For example, federated login allows you to use your
university or other institutional credentials to log into Chameleon -- there is
no need to create a new account. In addition, since federated login is supported
by many testbeds and services across scientific infrastructures you will be able
to sign in once and use multiple services.

Chameleon uses `Globus Auth <https://globus.org>`_, a popular authentication
service, to implement federated login and federates with entities supported by
Globus. Users can sign in using their existing institutional account if their
institution is an `InCommon <https://incommon.org/federation/>`_ member, use
their Google account, or create a `Globus ID <https://globusid.org/what>`_ tied
to an email and password that they provide. In addition, Chameleon also
federates with the TAS entity.

.. toctree::
   :maxdepth: 1
   :hidden:

   federation/federation_migration
