Chameleon Object Store - Quickstart
===================================

Chameleon currently provides object store capabilities that can be used
via the Swift client. In this quickstart guide we show the basics: how a
user can configure the Swift client to interact with the Chameleon
object store service, and how files can be uploaded, downloaded and
deleted. If you are interested in more advanced usage, please take a
look at the `Swift
documention <http://docs.openstack.org/cli-reference/swift.html>`__.

**Please note that the steps described in this guide can be executed
from any computer connected to Internet**.

Installing and Configuring the Swift Client
-------------------------------------------

The Swift client has been installed on all Chameleon appliances. If you
need to install the Swift client elsewhere please see the instructions
at
its \ `documentation <https://swiftstack.com/docs/integration/python-swiftclient.html#installing-the-swift-command-line-client>`__.
To configure the Swift client, first connect to CHI@TACC dashboard and
visit the `Access & Security
tab <https://chi.tacc.chameleoncloud.org/dashboard/project/access_and_security/>`__
in the OpenStack web interface and "`Download OpenStack RC
File <https://chi.tacc.chameleoncloud.org/dashboard/project/access_and_security/api_access/openrc/>`__".

Copy this file to your instance and source it, as in the following
example:

::

    $ source Chameleon-openrc.sh

You will be asked to enter you Chameleon password. Once it is done, you
will be able to use the Swift client and to continue this guide.

First Steps with Swift
----------------------

In this section we will see how to upload, download and delete a file
with Swift. 

Create a container
~~~~~~~~~~~~~~~~~~

A container is a datastructure that will contain a list of objects (i.e.
files). It can be created with a command line:

::

    $ swift post my_first_container

Upload a file in a container
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Assuming that a file "figure.png" is located in the current folder. To
upload it with swift:

::

    $ swift upload my_first_container figure.png

You can check the result of the previous command via command line:

::

    $ swift list my_first_container

or via dashboard if you are using Swift at at TACC:

https://chi.tacc.chameleoncloud.org/dashboard/project/containers/my_first_container/

Listing objects of a container and getting statistics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To list the objects that are inside a container:

::

    $ swift list my_first_container

You can also get statistics (size, number of objects, ...) about a
container:

::

    $ swift stat my_first_container

Download a file
~~~~~~~~~~~~~~~

::

    $ swift download my_first_container figure.png -o figure2.png

Remove a file from a container
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    $ swift delete my_first_container figure.png

Delete a container
~~~~~~~~~~~~~~~~~~

::

    $ swift delete my_first_container

Uploading a big file
~~~~~~~~~~~~~~~~~~~~

You may experience troubles when uploading big files (>1024 MB) from
CHI@UC and CHI@TACC. The solution is to use the segment option supported
by Swift:

In the following example, we upload a big file (ubuntu.qcow2) in several
segments of 200MB. **Please note that the segments are uploaded in
parallel.**

::

    $ swift upload -S 209715200 my_first_container ubuntu.qcow
