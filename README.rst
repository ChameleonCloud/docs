===============================
Chameleon Cloud's Documentation
===============================

Quickstart
==========

Requires Python 3 and `tox <https://pypi.org/project/tox/>`_.

.. code-block:: shell

    # Start dev server (refreshes output on change)
    tox

    # Build just HTML output
    tox -- html

reStructuredText help
=====================

rST is a bit more onerous than Markdown, but it includes more advanced features
like inter-page references/links and a suite of directives.

- `Sphinx's primer <http://www.sphinx-doc.org/en/stable/rest.html>`_
- `Full Docutils reference <http://docutils.sourceforge.net/rst.html>`_

  - also see its `Quick rST
    <http://docutils.sourceforge.net/docs/user/rst/quickref.html>`_ cheat sheet.

- `Online rST editor <http://rst.ninjs.org/>`_ (it gets some things wrong)
- Other projects that use rST/Sphinx

  - `Python <https://docs.python.org/3/library/index.html>`_: click the "Show
    Source" under "This Page" in the sidebar.
  - `Sphinx <http://www.sphinx-doc.org/en/stable/rest.html>`_: similar
  - Numpy; note that the landing pages are usually coded in HTML and can be
    found in the templates directory, e.g. `Numpy's landing page
    <https://github.com/numpy/numpy/blob/master/doc/source/_templates/indexcontent.html>`_

Heading styles
--------------

RST supports arbitrary heading styles; the parser will treat the first style it
encounters as an h1 heading, the second an h2 heading, and so on. Here are the
recommended heading styles you can use:

.. code-block:: rst

    ==============
    Title heading
    ==============

    h1 heading
    ==========

    h2 heading
    ----------

    h3 heading
    ~~~~~~~~~~

    h4 heading
    ^^^^^^^^^^

    h5 heading
    ``````````
