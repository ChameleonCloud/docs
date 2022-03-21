.. _daypass:

=======
Daypass
=======
Normally, only Chameleon users with active allocations are able to launch and
view Trovi artifacts. To allow anyone to launch an artifact, we also provide
daypass. This allows for a non-Chameleon user to have access to Chameleon
for a limited amount of time, using a small, separate allocation.
People interested in reproducing your project will send requests
to the managers of a project. If approved, the requesting user will receive an
email invitation to join a reproducibility project. When they accept, they
can use this project to run your artifact. After the specified time limit,
they will be automatically removed from this project.
Daypass can be enabled on an artifact-by-artifact basis in Trovi.

.. _enable-daypass:

Allowing Reproducibility Requests
=================================

First, the owner of an artifact must permit reproducibility requests. This can
be revoked at any time, preventing future requests. Additionally, you must also
give your artifact a value for "Hours a user has to reproduce." This value
specifies how long a user will have access to Chameleon for. Consider how
long it takes to run your experiment from start to finish as a lower bound for
this value. The artifact owner must also assign their artifact to a project via
the dropdown selector. As these requests are granting access to Chameleon
resources, this is needed to tie granted requests to a PI.

These fields can be accessed by navigating to an artifact's detail page, and
then selecting "Share." At the bottom of the share page, you will see the
below forms, which are the project assignment, the enabling of reproducibility
requests, and the hours to reproduce.

.. figure:: daypass/sharing_reproducibility.png
   :alt: An image showing the sharing fields for reproducibility requests
   :figclass: screenshot

After these items are saved, a reproducibility allocation request is
automatically made under your PI's name. Your artifact should now appear with a
"Request Daypass" button below the "Launch" button. The "Launch" button will
not appear for users that are not a member of an active Chameleon project.

Requesting a Daypass
--------------------

When another researcher wishes to reproduce your artifact (or when you wish to
do so for another's artifact), selecting "Request Daypass" will display a form
asking for a name, institution, and the reason for reproducing the artifact.
For artifacts under your project/allocation, this gives you oversight and
discretion as to who you grant access to, as ultimately you're responsible for
usage under your allocation (including reproducibility allocations). For
artifacts you wish to explore, it gives you the chance to reach out to the
project owners and explain why you are interested in their work.

.. figure:: daypass/request_daypass_button.png
   :alt: An image showing the "Request Daypass" button
   :figclass: screenshot

After submitting the form, the managers (and PI) of the project associated with
the artifact will receive an email informing them of the request.

Reviewing a Daypass Request
---------------------------

After receiving an email with the daypass request, PIs and project managers
can navigate to the review page by clicking the link in the email. Here, they
will see all of the details submitted with the request. A decision can be made
by choosing "approved" or "rejected" in the selector, and then clicking submit.

.. figure:: daypass/review_daypass_request.png
   :alt: An image showing the "Review Daypass" screen
   :figclass: screenshot

After this decision is made, an email is sent to the requestor with the result.
If the request is approved, an invitation is sent to the user.

Using an Invitation
-------------------

If your daypass request is approved, an email will be sent to you with an
invite link. After clicking this link, you will be automatically added to the
project. The email will also mention how long the invitation is for. When the
invite is accepted, you will be taken to the project page for the
reproducibility project. Please note the ID of the project (CHI-XXXXX), which
may be needed to configure an artifact.

Next, you can navigate back to the original artifact URL you were given. The
"Launch" button can be used now to start running the artifact.

After the duration for the invite has passed, you will be automatically removed
from the project.

