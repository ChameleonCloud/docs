.. _power-monitoring:

================
Power Monitoring
================

Chameleon provides comprehensive power monitoring capabilities to help researchers measure and understand the energy consumption of their experiments.

.. tip:: 
   For detailed examples, tool installation instructions, and advanced techniques, see our `Power Measurement and Management blog post <https://chameleoncloud.org/blog/2024/06/18/power-measurement-and-management-on-chameleon/>`_.

Available Power Monitoring Methods
==================================

**Infrastructure-level monitoring:**
- Automatic power and temperature data collection via IPMI/DCMI
- Works on most server-class Intel and AMD nodes
- Provides system-level power consumption data

**Application-level monitoring:**
- ``etrace2``: Energy measurement for individual applications using Intel RAPL
- ``perf``: Quick RAPL energy measurements  
- Scaphandre: Advanced per-process power tracking

**Long-term monitoring:**
- Prometheus exporters and Grafana for continuous data collection and visualization

Hardware Support
================

Power monitoring support varies by node type:
- **Full support**: Most Intel and AMD compute/GPU nodes
- **Limited support**: Specialized nodes (FPGAs, ARM64)
- **Temperature monitoring**: Only available when nodes are powered on

Getting Started
===============

1. **For system-level monitoring**: Use ``ipmitool dcmi power reading`` to get current power consumption
2. **For application-level monitoring**: Use ``etrace2 <your_program>`` to measure energy consumption of specific applications
3. **For detailed instructions**: See the `power monitoring blog post <https://chameleoncloud.org/blog/2024/06/18/power-measurement-and-management-on-chameleon/>`_

.. note::
   Power monitoring tools use software-based estimation models and may include system overhead. For accurate measurements, consider baseline readings and validate with multiple tools when possible.