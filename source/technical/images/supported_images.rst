.. _chameleon-supported-images:

==========================
Chameleon Supported Images
==========================

There are a number of images built and supported by the Chameleon team,
specifically:

- CC-Ubuntu24.04
- CC-Ubuntu24.04-CUDA
- CC-Ubuntu24.04-ROCm
- CC-Ubuntu24.04-ARM64
- CC-Ubuntu22.04
- CC-Ubuntu22.04-CUDA
- CC-Ubuntu22.04-ARM64
- CC-Centos9-Stream

The CUDA images, such as `Ubuntu24.04-CUDA <https://chameleoncloud.org/appliances/123/>`_,
contain various settings, software, and drivers specifically
for NVIDIA GPU nodes. The ROCm images contain similar settings, software,
and drivers for AMD GPU nodes. And finally, the ARM64 images, such as
`Ubuntu22.04-ARM64 <https://chameleoncloud.org/appliances/110/>`_,
are images specifically built with ARM support for ARM nodes. Non-ARM
images all assume x86-based architectures.

.. warning::
   Any images with operating system versions that are end-of-life, such as
   Ubuntu18.04 are no longer offered as Chameleon-supported images. However,
   they can still be used on Chameleon with caution. Please note that these
   images are EOL so they no longer receive security updates and bug fixes.
   They may stop working at any point, therefore, make sure to upgrade and
   move your environments to newer versions of the operating system as soon as
   possible. If you do need to launch older images on Chameleon, please consider
   using a `bastion host <https://www.chameleoncloud.org/blog/2023/01/23/experiment-pattern-bastion-host/>`_
   that is up-to-date and provides SSH access. From there, you can jump to your
   instances running older images that are not exposed directly on the Internet.

You may also build your own images and share them with the community. These images
may be built from scratch or based on the Chameleon-supported images. However,
the Chameleon team cannot offer support for user-provided images.