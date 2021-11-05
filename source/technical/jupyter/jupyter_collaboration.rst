.. |python_chi| replace:: ``python-chi``
.. _python_chi: https://github.com/chameleoncloud/python-chi

.. _jupyter-collaboration:

Collaboration Strategies
========================

It is often desirable to share your in-progress Notebooks with peers or
supervisors for feedback, perhaps before publishing in :ref:`trovi`. 
This can be accomplished in many different ways, each
suiting different use-cases. We have identified a few current tools that offer
the best range of functionality.

.. |trovi| replace:: **Trovi sharing portal**

|trovi|_
---------------

The easiest way to share and collaborate on a Notebook is to publish it to
:ref:`Trovi <trovi>`.

**Pros**

- Already integrated into Jupyter; no need to sign up or log in to anything
  else.
- No need to download and copy Notebooks and other data around.
- Supports sharing with other Chameleon users and projects.

**Cons**

- Limited support for real-time collaboration; last edit wins.
- No support (yet!) for sharing one-time or expiring links with collaborators
  outside of Chameleon.

.. |google_colaboratory| replace:: **Google Colaboratory**
.. _google_colaboratory: https://colab.research.google.com

|google_colaboratory|_
----------------------

Google provides a free Jupyter Notebook execution environment that can run your
Notebook files in a private VM on Google's cloud infrastructure. As it is a
Google product, a Google account is required to use it. Notebooks can be edited
by users concurrently, similar to functionality present in Google Docs.
Notebooks are stored in Google Drive and as such can be easily shared using the
existing Drive sharing mechanisms. Finally, and notably, hardware-accelerated
computation via GPUs and TPUs is available for free exploration. For more
details see the `FAQ <https://research.google.com/colaboratory/faq.html>`_.

**Pros**

- Supports rich real-time collaboration on Notebook files.
- Notebooks easily sharable via Google Drive to others with Google accounts.
- Can manage access to private Notebooks via ACLs.
- Free to use.

**Cons**

- Not intended for long-running tasks. Your experiment may be terminated
  prematurely if it is deemed an invalid use of resources.
- Chameleon libraries not pre-installed. You can however install the Python API
  client to your Notebook via the special ``!pip install python-chi`` syntax.
  See the `Importing Libraries
  <https://colab.research.google.com/notebooks/snippets/importing_libraries.ipynb>`_
  example notebook for examples on how to install new libraries.
- Requires Google account.

.. |github_nbviewer| replace:: **GitHub + Nbviewer**
.. _github_nbviewer: https://help.github.com/articles/working-with-jupyter-notebook-files-on-github/

|github_nbviewer|_
------------------

A common pattern that works for many use-cases is using GitHub as the backing
store for your Notebooks. This is nice because you get version history for free
due to Git VCS being used behind the scenes. GitHub Notebooks are easily
sharable (you just send a link) and there is decent support in GitHub for
viewing the current state of the Notebook and its rendered outputs. To allow
others to actually run your Notebook, you can either import the Notebook files
back in to your Chameleon JupyterLab instance, or use `Binder
<https://mybinder.org/>`_, which allows spinning up a Jupyter instance for a
given GitHub link.

**Pros**

- Supports version history via Git VCS.
- Supports easily sharing rendered Notebooks (read-only) via GitHub links.
- Can import the Notebook into a personal Jupyter server (such as the one
  provided by Chameleon) or via a hosted tool like Binder.
- Changes can be proposed using Pull Request workflows you may already be
  familiar with.

**Cons**

- Running the Notebook requires getting it into a Jupyter server somehow.
- Requires GitHub account if you want to keep your Notebooks private.
- Services like Binder don't create Jupyter servers with Chameleon tools (like
  the |python_chi|_ Python API) built in by default.
