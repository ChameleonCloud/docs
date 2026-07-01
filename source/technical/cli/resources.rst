.. _cli-resources:

===================================
Working with Resources via the CLI
===================================

.. tip::

   Reading :ref:`CLI authentication <cli-authentication>` and
   :ref:`which authentication method should I use? <cli-which-auth-method>`
   is highly recommended before continuing on the following sections.

The Chameleon CLI is built on the `OpenStack Client
<https://docs.openstack.org/python-openstackclient/latest/>`_, along with a
few service-specific clients (Blazar, Manila, Heat, Swift) for features
beyond core compute and networking. Rather than duplicate command references
here, this page covers the modes you can run the CLI in, and then maps out
where each task is actually documented, alongside the equivalent GUI
instructions.

.. _using-cli:

Command Modes
=============

You can use the CLI in either Interactive Mode or Shell Mode. In either mode,
the OpenStack client has to be configured by using the *OpenStack RC Script* or
by providing the command line switches. For more information about the usage of
the OpenStack client, run ``openstack --help``.

Interactive Mode
-----------------

The Interactive Mode allows you to use the ``openstack`` commands through an
interactive prompt. To start the Interactive Mode, type ``openstack`` in the
configured terminal. Once entering the Interactive Mode, you will see a
``(openstack)`` prompt. Type the command you would like to run at the prompt. To
find out the commands, type ``help``.

Shell Mode
-----------

Each CLI command can be used in your terminal exactly the same way that it
appears in the Interactive Mode, simply by preceding the command with
``openstack``. For example, the command ``image list`` in the Interactive Mode
is equivalent to the command ``openstack image list`` in the Shell Mode.

Common Tasks
============

- **Discover hardware and resources**: resource discovery is available via
  the GUI and the :doc:`REST API <../discovery/rest_api>` — there is no
  dedicated ``openstack`` CLI command for browsing hardware, see
  :doc:`../discovery/index` for details.
- :doc:`Reserve resources (leases) <../reservations/cli_reservations>`:
  create and manage Blazar leases for bare metal nodes, network segments
  (VLANs), and floating IPs.
- :doc:`Launch and manage bare metal instances <../baremetal/launching_cli>`:
  create, list, and delete bare metal servers.
- :doc:`Work with KVM instances <../kvm/kvm_cli>`: KVM-specific CLI tasks,
  such as converting images to raw format for better launch performance.
- :doc:`Manage images and snapshots <../images/cli_management>`: upload,
  list, and snapshot images.
- :doc:`Manage the object store <../swift/swift_cli>`: upload and retrieve
  objects via Swift.
- :doc:`Manage shares <../shares/cli_management>`: create and manage shared
  file systems via Manila.
- :doc:`Manage complex appliances <../complex/cli_management>`: orchestrate
  multi-resource appliances via Heat.
