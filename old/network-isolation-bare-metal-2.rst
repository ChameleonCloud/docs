Network Isolation for Bare Metal
================================

By default, bare metal nodes on each Chameleon site share the same
local network (shared VLAN and IP subnet). However, some experiments may
require more network isolation, which is now supported by Chameleon.

Our implementation of network isolation is based on dynamically
managed VLANs (network layer 2) associated with user-configured private
IP subnets (network layer 3). This means that all network communications
local to the IP subnet or the broadcast domain (such as Ethernet
broadcast, ARP, IP broadcast, DHCP, etc.) will be restricted to the
user-configured network and its associated VLAN. This feature enables a
range of experiments in networking and security. For example, this
allows running your own DHCP server to configure virtual machines
running on bare metal nodes, without impacting other users.

Please note the following:

-  Network isolation is currently **only supported on CHI@UC**. It will
   be deployed to CHI@TACC at a later stage.
-  Strong network isolation is **provided at network layer 2 only**.
   Even using separate IP subnetworks, any bare metal node can still
   communicate with each other and with the Internet through the
   network's router. We are investigating solutions to provide stronger
   isolation at network layer 3.
-  Network isolation **only works on compute nodes**, not storage nodes.
    Other types may be added as development permits

To use this feature, you will need to create a dedicated network and
router.  You can use a `heat
template <https://chi.uc.chameleoncloud.org/dashboard/project/stacks/>`__
or use the |Link - OpenStack dashboard|. The procedures are explained
below.

Create a Network with Heat Template
-----------------------------------

#. From panel Orchestration, choose Stacks:
   |image1|

#. Click Launch Stack to start using a heat template:
   |image2|

#. For Template Source, select URL:
   |image3|

#. In the Template URL field, copy-and-paste in the URL:
   \ `https://raw.githubusercontent.com/ChameleonCloud/heat-templates/master/network-isolation/network-isolation.yaml <https://raw.githubusercontent.com/ChameleonCloud/heat-templates/master/network-isolation/network-isolation.yaml>`__\ 
   |image4|

#. Press Next to go to the Launch Stack screen
   |image5|

#. At the Launch Stack screen, choose a simple name
   |image6|

#. Your password is required to perform certain operations; please enter
   it in the box
   |image7|

#. Set a private IP range that does not overlap with another; a good
   rule is to use the last 2 or 4 digits of your project #:
   |image8|
   For example, my project # is 817790:

   #. For a unique 10.xx.yy.0/24 address range, I would use
      10.77.90.0/24
      |image9|

   #. For a unique 172.16-31.x.0/24 or 192.168.x.0/24 address range, I
      would use 172.16.90.0/24 or 192.168.90.0/24

   #. Numbers 100-254 are not used by basic application of this rule and
      therefore can be used whenever there are conflicts (i.e. in the
      rare case where the last 2-4 digits of your project is the same as
      another project, and hence your desired IP subnet range is already
      in use).

#. The first IP adddress in the DHCP range should never be \*.1, which
   will be used by the router.  Nor should the first address be \*.2 for
   reasons which will be explained in step 11
   |image10|

#. The last IP address in the range must be less than \*.255
   |image11|

#. A special secondary gateway is required to use the Chameleon
   Openstack Ironic services.  This will only be used for contacting
   Ironic services, and needs to be set to 1 less than the first IP
   address in the DHCP range
   |image12|

#. Start creating the network and routers with “Launch”
   |image13|

#. Congratulations!  Your network and router have been created
   |image14|
   Click on the newly created “stack” to see its details

Create a Network with OpenStack Dashboard
-----------------------------------------

#. | From panel Network, choose Networks:
   | |image15|
   |  

#. | Click “Create Network”
   | |image16|
   |  

#. | Name the network:
     |image17|
   |  

#. | Make sure “Create Subnet” is checked:
     |image18|
   |  

#. | Click Next:
     |image19|
   |  

#. | Name the subnet:
     |image20|
   |  

#. Set a Network Address that does not overlap with another subnet; a
   good rule is to use the last 2 or 4 digits of your project #:
   |image21|
   For example, my project # is 817201:

   #. | For a unique 10.x.x.0/24 address range, use
        10.72.\ ***0***1.0/24
      | |Picture - pasted image 0\_ZnsYr4F.png|

   #. | For a unique 172.16-31.x.0/24 or 192.168.x.0/24 address range,
        use 172.16.1.0/24 or 192.168.1.0/24
      |  

   #. | Numbers 100-254 are not used by basic application of this rule
        and therefore can be used whenever there are conflicts (i.e. in
        the rare case where the last 2-4 digits of your project is the
        same as another project, and hence your desired subnet range is
        already in use).
      |  

#. | Set a Gateway (or leave blank to use the default):
   | |image23|

#. | Click Next:
     |image24|
   |  

#. | Make sure DHCP is enabled:
     |image25|
   |  

#. | Specify DHCP allocation Pool(s):
     |image26|
     Define the allocation pools to be within the network address
     allocated to the subnet. It cannot contain the IP allocated to the
     gateway. Make sure to take note of the first IP address in the pool
     (here it is 10.72.1.10).  You will need the IP address that’s one
     less than this address (i.e. 10.72.1.9) later.
   |  

#. | Specify DNS Name Servers:
   | For Chameleon UC, the DNS name servers are:

   -  130.202.101.6

   -  | 130.202.101.37
        |image27|
      |  

#. | Click Create:
     |image28|
   |  

#. | Check to see the network is created without errors:
   | |image29|
   |  

#. | If you see an error like this:
   | |image30|
   | Pick a different subnet range (see step 11 e.g. use 10.72.101.0/24
     instead)

 

Create a router with OpenStack Dashboard
----------------------------------------

 

#. | Click on Routers
   | |image31|
   |  

#. | Under Routers lists, click Create Router:
   | |image32|
   |  

#. | Name the router:
   | |image33|
   |  

#. | Select “ext-net” as the External Network if you want to have
     external access:
   | |image34|
   |  

#. | Click “Create Router”:
     |image35|
   |  

#. | Now to connect this router to your network, click on the router's
     name:
   | |image36|
   |  

#. | Under Router Details, click on Interfaces:
   | |image37|
   |  

#. | Click Add Interface:
     |image38|
   |  

#. | Select the network and subnet you created:
   | |image39|
   |  

#. | Click Add Interface button:
     |image40|
   |  

#. | Noticed that it has automatically picked the gateway IP you
     assigned to your subnet:
   | |image41|
   |  

#. | Add a static route (this is necessary for your nodes to reach
     Chameleon services):
   | |image42|
   |  

#. | Click Add Static Route button:
   | |image43|
   |  

#. You will need a static route for 10.140.80.0/22 to work with
   Chameleon at UC:

   -  | Enter “10.140.80.0/22” in the “Destination CIDR” box:
      |  

      | |image44|
      |  

   -  | For the Next Hop on the entries, it will be the IP address that
        is one less than the first IP address in your DHCP pool.  For
        this example, we have used 10.72.1.10 - 10.72.1.99 as the DHCP
        pool.  Therefore, we need to use 10.72.1.9 as the Next Hop:
      |  

      | |image45|
      |  

   -  | Click Add route button:
      |  

      | |image46|
      |  

   -  | See the new static route:
      |  

      |image47|

Use the new network when launching instances
--------------------------------------------

#. When launching a new instance, under the Networking tab
   |image48|
    
#. | There now will be new options: you will see isolated networks
     created under your project, as well as the default shared network
     (named sharednet1).
   | |image49|
   |  

#. | Select the network your instance will be using. If you want to use
     network isolation, select one of the isolated network created under
     your project.
   | |image50|
   |  

#. Launch the instance!
   |image51|

Delete the network and router with Heat Template
------------------------------------------------

#. To delete the network and router, go to Orchestration -> Stacks, and
   select your stack and use the “Delete Stacks” button or use the
   drop-down Actions menu:
   |image52|

#. Confirm the deletion:
   |image53|

#. It will take a few seconds to finish the deletion

Delete the network and router with OpenStack Dashboard
------------------------------------------------------

#. First make sure all instances using them are terminated

#. | Click on Routers:
   | |image54|
   |  

#. | Click on the name of your router to see its details, and select
     Static Routes:
   | |image55|
   |  

#. | Click Delete Static Route:
     |image56|
   |  

#. | A confirmation appears, confirm to Delete Static route:
     |image57|
   |  

#. | Go to the Interfaces tab:
     |image58|
   |  

#. | Delete gateway interface:
     |image59|
   |  

#. | Confirm Delete Interface:
     |image60|
   |  

#. Now the router can be safely deleted:
   |image61|

#. | Confirm Delete Router:
     |image62|
   |  

#. | Verify that the router is deleted:
   | |image63|

#. | Now go delete the network:
   | |image64|
   |  

#. | Use the drop down menu:
   | |image65|
   | Or check the checkbox and then use the Delete Network button
   |  

#. Confirm Delete Network:
   |image66|

.. |Link - OpenStack dashboard| image:: /static/cms/img/icons/plugins/link.png
   :name: plugin_obj_17150
.. |image1| image:: https://lh3.googleusercontent.com/fDUk5u5JTBHUNsBmILtzWOQe-0Z8cTTZsfWgTNZP1ZTzrI0kSb7rp8mC-zMw-rynxCYVo80V800OoQlhlOZ1Cx6KRKu59mLfVsI56omC_CztXVIhYWkEE88W2n1lxKvdlMbvjVs
   :width: 277px
   :height: 498px
.. |image2| image:: https://lh4.googleusercontent.com/1hkgFAekRpYSO2hV8vHHpVNsi5ZgClIWETDmaQ_JXspD7bFVOWnNb0yz3iJHOAmqDUfg9XaGEi-tYHXdbxQ8zBRpSSQvl9mIl1Q78BUiOiiPK8sC_w3Y92ny13DORmHcUDvBOiA
   :width: 624px
   :height: 125px
.. |image3| image:: https://lh6.googleusercontent.com/ZzLlVX9vDbcOnN4HiRMIkcr5Nd1Nxn9CYFVMggcGo2tHf4nSrzVZYCh2vPwnHXUpqnVdkBzI_53HFNkjfLmYwvwzRqk3hsZH76F9HpykVuJrdWnQzzt-5_PuFMeJMMQVv6tKizs
   :width: 442px
   :height: 248px
.. |image4| image:: https://lh3.googleusercontent.com/VtT2aujAR-mqC33JKhQEwCoHeXxIeTrTLSTjOkIHWkD8JVsYwKz9wx7KWLzRQL9YRyG2Opcgn6qevG8AyoT4kuNDM3P7f6itSktKvpmDVTCfRZHLkukFkPAQAKYFanHs-3mPFpg
   :width: 431px
   :height: 170px
.. |image5| image:: https://lh6.googleusercontent.com/vyuXGCQ71glDGUpZkNoUaYkQDmRfJ2t8ksZC9vbxNByHpXY5t0fSINXeQA98TM8SMlnEUgP9QDHkl3w_lCFTQraSXw5xqDUYyJYRA2oSwt2I0uoA8AYTHdC8HA3SoPm9chObEAo
   :width: 107px
   :height: 80px
.. |image6| image:: https://lh6.googleusercontent.com/9kXU3WTAy55zU_Um6qKZNIFyQkpXATuINMKLZ8VxEyQFQS3mM3eu_gaAbu8_fjHTwUjfmHwD7TeAPtyOcuYp73oBUbPYRY8nwNKbL7ewVCEI8qZqmIx7HMAJClDFEeA3bkw2DIQ
   :width: 422px
   :height: 146px
.. |image7| image:: https://lh6.googleusercontent.com/7GQzZEOAgXBTNbfYXMsh3s_zF6ArPdqX0bN6aNuLycQ8DokCTRBj4mU67gPmkJcTOyLnwh9AbpHi-jHSeXU8Au7z0vZBEm6ludtX6Ksv-xYiD5aWLW2hc5Q0aP3OFvnCBMzhq3Q
   :width: 457px
   :height: 111px
.. |image8| image:: https://lh6.googleusercontent.com/ZGoJdkWJQLH5RXtvotBwK3huNhO-jH4vDCB2rXqJdv1FIH18f5eiFvNraTGLyaxdRl4jsjiSdNg8djrq6GGKZ_9di6Cul3jdHQgbIJjnxfOQECeJ1CXedVVKZJM-9IhIX_OzZmc
   :width: 281px
   :height: 116px
.. |image9| image:: https://lh3.googleusercontent.com/mBACzR_F41kHgLPEMFQR-9LX0TizIHmewg3zkW8SQxy4VgOE8H6rGuZ3FeWzuklFiPqpGRfBxPfAOVt0JdCLcTAjyeSXx9NvASgp01s8wewHhrK4ldPttgCaC77lSRy7rOj2Ycs
   :width: 427px
   :height: 72px
.. |image10| image:: https://lh3.googleusercontent.com/K0RmsyNH0OUSJjKpGZiL1E4SZngBJRV5Rklc2r98wCVFvhDLh_zSle3rjTezVVyIu9z8LE12ztQAvuql_4gb1BSmGeZRkaUy5zMxkL-2iFkvLr9p6ykqUjuUDE1RfEJG2n5k4QU
   :width: 499px
   :height: 88px
.. |image11| image:: https://lh5.googleusercontent.com/XaqyP68BSaMPqHdD_jJxW-QYewzuZwl3_yx7dlxhO2FxxWntvOdydEnLj0DUqfYZW7o5tX_YYXr8-6D4ZjRlXeWwtwtJ1FEHyJRDpHyqj5-BD_KuZwSaRbtmtnHTW4MRA2N5kis
   :width: 423px
   :height: 73px
.. |image12| image:: https://lh4.googleusercontent.com/2s_EjBUcieWYH6tEmhnEchCLEA9bRzMg9u8JvrRrS7aWs8IylEjyuKPu5pdB4RKLfyC9XXZNF1KhDYdMbF9PR5lH4SvbuCPbqhGLq9UW_ssHMWGJZT8i_rAPQ7BQ2c6tikhcTLg
   :width: 424px
   :height: 115px
.. |image13| image:: https://lh4.googleusercontent.com/Q1RtcatI_0YtNHdqqJKNaPrYAJ1gvt3szf9aTpiZl1GLxMzmlp8lCfS_Zdd5OCF6yn-C9DraCpiPX52JNBj71GKOQUE9wR_WYVV37VUd_u901lLrmeRgvUZ9gtRPjSIpB38YUis
   :width: 146px
   :height: 69px
.. |image14| image:: https://lh3.googleusercontent.com/w65--nfbcV7x2yjT60NSei5py3yf-xnR7yeBwrMgM6bvLUoDZoWG-SZI6phnFbpqYqavhrr01d2cXzl4K818hVKYZxCNMmGBtyEE2l4rxWhtakU0hGSXoxrz4JLz6HlWydVzKE8
   :width: 624px
   :height: 129px
.. |image15| image:: https://lh3.googleusercontent.com/hVud5qPy7cUP1nRFJK3mx5UG0OgT6Hu-uJcDbrNm7NKLskY_-C4PRuOrXyld-VLjUHzHmry5_Gqe6_F1ycBL8puk4W0xuHfh6dd8NEU2qyBMPex7e90Utrv11XQHelIiEVkQPMk
   :width: 189px
   :height: 266px
.. |image16| image:: https://lh6.googleusercontent.com/PzIJr7zPD4CAYH7iuOdt0PH09t4GQSJZ9xCErrgeviCpLApqtMH36I2kIy2QKuB6tK0W1IYQNLRCeTyOH9InwUtH63k8uDJq7pA0ajXpWYf6RPwdjczjRN-hF2SAfDGsh9F3GqY
   :width: 523px
   :height: 134px
.. |image17| image:: https://lh3.googleusercontent.com/Tjh9bRrbYbMf7FU_ngqUjoTygX0etidisaSercuJDW_ytCFdKVi-ev-8ynJ74EAGU1RVGDShRR4i1sukw1YDpMHuym1yVCDqGCVuv6jafR06aY2xy2jdIwCWNno5Ie8NNAvhoRY
   :width: 335px
   :height: 100px
.. |image18| image:: https://lh3.googleusercontent.com/kDYvGYPCLmIvvw5OHdMBNnbAnpHn0o9hYiBETtwO7X7yQRlWxeKK2Sw4xERJ4aSFmdnFcl3YQXSTFF6uoBsF6F3bc6kyDnkrMgMJs0XJXX4fQq4cfNeDZwj68pewtOZINXhsbi0
   :width: 344px
   :height: 95px
.. |image19| image:: https://lh3.googleusercontent.com/CB6jblzDos1lWue7caM402dSRJMYa-fv8NW9PdiLy-81dulPerWmcrxljqfRvdoPVijQFPjLN4gP3dWXsmq_32wMfeSsbowE_kScooefOo-zlXZOd_06upnaYXBiHud7g6COzlM
   :width: 212px
   :height: 76px
.. |image20| image:: https://lh6.googleusercontent.com/kVWfGocNCnVRkxebVNlgEzdKmNZNYYau3AMX3vBLzaBeQnIPrP9MarDWuGw6k-uLVTdyi9ioN3ZdgjazTpTREeCSWRZneYI66z4Blrg4te3dIyPiblfw7WJxmwYispXsOPQuC3Y
   :width: 339px
   :height: 107px
.. |image21| image:: https://lh6.googleusercontent.com/EWTU7OhwSbXSEtCvkS1iCgyuU_TZ48o5SP2hsfp-zemtAie9jBQniRvR4rn8ef6lcX64X-exS5Cjhc2wbKzCxT8U_32YQKGGE0nyOJ89RMn8KtwHa_NYI2o45n8GBFzOSYg935Q
   :width: 410px
   :height: 87px
.. |Picture - pasted image 0\_ZnsYr4F.png| image:: /static/cms/img/icons/plugins/image.png
   :name: plugin_obj_17151
.. |image23| image:: https://lh5.googleusercontent.com/gWxHzr69f-jRbzOcLaZjrKMUCLDQOY6IlOMfda4rEtZOc6KAG1DdHGconXlb-Fa8vGxm2dslqauv5r1D8kSOMXXtIL4Q5iHeDgajY_J1gF2--lJTVjBYDxTMB_Gy_oQKsRALcMw
   :width: 363px
   :height: 210px
.. |image24| image:: https://lh6.googleusercontent.com/3rGM47HeMRWkSEcdh5vanriCbLMe5K3Cwxak7S1hDDm6-0g80ub25c8jINpFjyeOyQUK1Ll7cfqS00q4X_WIl8kEk3iXedjq1NJVp_9d4S9H5ABP7oRBWzaNYWba7Rl7QpTmxrU
   :width: 204px
   :height: 66px
.. |image25| image:: https://lh6.googleusercontent.com/M1YkrHFugzq-8juwiFTzibsZL2xrNGLoH6tb9dhBdPoWmO8hblJbAlXRYq9D-QfYkdeIuH5OXpPvO3Vwy7t0sRedNY34vTrzpd3cpJzJSKeE90IPhi5pN1Xfcafcq8QYY4UBAvo
   :width: 401px
   :height: 113px
.. |image26| image:: https://lh3.googleusercontent.com/gU6f_1d1f37fPLQw0lH58ilvW4YqzwRZeTAjw3tbrwHVHgTg0_BcUOcyMpy8nVVjdqizU1dRFEVUI36jY0cl2WwhNuIiU9Wrc1-eFVUbTKI_fV0ibnJ4hmC-ncHDs8ED2YZerpg
   :width: 427px
   :height: 190px
.. |image27| image:: https://lh4.googleusercontent.com/sB492-SqaHsWQB_CSF6Nms0039nwfLuD7QcqKzw9G6Vg2Crz_-JZG8pS9tJFkVurlVNaWd7GtTVrI_l_NPNzUXUHsR6undFvjN6t8ruSLIy55jZ9yjPiRyyD1QtzTWWjMC2zWyQ
   :width: 423px
   :height: 123px
.. |image28| image:: https://lh6.googleusercontent.com/pEkQEQR9MBK3abzjMxIhHFRKRhk5BG9q1lStjlALR2xARTouXhjojdFXo6pZ8js1uJkpCRhIMZqCf4BNTA1sI-nKm77dnYX29HfsOTi73dFUuAFEcmNbm8mDxEiRRMn0EOL8Mdc
   :width: 210px
   :height: 74px
.. |image29| image:: https://lh3.googleusercontent.com/mugPEU8mXdgzp8QNjtV2IyYIg-2ot-SMxCqQwRS6O1K4ydjVVu8jqdo3rVbLeE4viFZGksSLjkiZBLEOIwRGLtAh7bHl0o5bq6SSCi3dW-wEtAGw7A28lc9kppafPx1HFqS-UM8
   :width: 505px
   :height: 112px
.. |image30| image:: https://lh5.googleusercontent.com/JetMKPv84GpFkLzlw7n4HNyX9TjL3wUY4606fSEVpOcHPtZwJzZffThionTFV8B5NpyVYJRI3Fp94crtJ6tYwCGidfmXgO_N7LmCL1q8WP1iC8vk-SPiSMHHbM2rm7CvhzzLSy0
   :width: 340px
   :height: 307px
.. |image31| image:: https://lh4.googleusercontent.com/bOBOElR_9EUfDHDWMZNiwRLoLDhDO2KSV0p30PYmlaMGkSN4ZSnc3ODz6rZY4T1T2KxWMYZsOfXT9W2u9hVZNSMQPLNzwfFqSk1uCJH9mQvsf8mjzWyNQ2GDajOwZsKO3KxlosE
   :width: 219px
   :height: 151px
.. |image32| image:: https://lh6.googleusercontent.com/pwgEppV9Jao_aherF7Y4WsSppH9hnR6pWsY1mbLbMPEOl-ZDr8G5Cn0tGln-imc2T2yzZ67qdxxy3do39bOgxahmw4lQoZ9BR3cxgDF_TcxEqaDy-UZ6NKT47-jVraoR928i_BE
   :width: 485px
   :height: 102px
.. |image33| image:: https://lh5.googleusercontent.com/CWdQHnMWLHxgJo_CsZaY50Ue-wh_BgvfqLdzaLTFXORvnBx4ocwLdHUzUWE_TDPjB0IWfEAidSD8T9Epzu2zZhT0KxpCAst6p4vngryMxGeeXVsa1PRCHY-pRv3qUhcCpPpr24c
   :width: 330px
   :height: 114px
.. |image34| image:: https://lh5.googleusercontent.com/AQZsO5pRnolg9ZxtDvqkwkNrrw6TVMDfdqEh5vdflKxuU0E4Ef3Sph7lAOwRwVjFAtT-RCIopaCU5GmH56AnEndUtb4W2zSkWh_v8l_oH-5qzXYb3dZWnAxn5cKjtgFLPnNy5ds
   :width: 429px
   :height: 122px
.. |image35| image:: https://lh6.googleusercontent.com/xQsTJI8045P3Mp9Ym7h3nR6oqJhmg7sr9IbbpocHfEjjNHniiTQ-8OSwYQdh29FowVVPaN2lZEncKIAQ3a-rPURI5ztKgiKFX7HyUjt-9Vhry9xFb8RBNjZajvCccFwZkwPNNX8
   :width: 218px
   :height: 81px
.. |image36| image:: https://lh3.googleusercontent.com/4VIZEF2JdRulcmMcVjySbOL0esYJSo5utsUXWU93137AmjrpkSXiKlrdC1bnqqqek6ZWu7vsBCN3iBX8LcoVcOWIVOEO7jT6QMQG6QfbHOmCWu0BFohE6muIBKAGDaIlca9kz4c
   :width: 505px
   :height: 95px
.. |image37| image:: https://lh5.googleusercontent.com/AXEoWCiTMH07lH5CkS2_gGzOsetrzivA60CUnqfy38Z0-Xl8MJOxGY0ZL4riehzpTpg91skWYBR-8JTVLD6_vVIuIG8Vl9tD38xOEEUq9xjadWUY0m-K6PFITA2jiJgKC7gm7Sc
   :width: 252px
   :height: 140px
.. |image38| image:: https://lh4.googleusercontent.com/_Rk9ZtnCo1FyQXFyCZhLlagJSDCVuU7deoJDb-6J0do9hdg5aELu4UcvFxt6G4aAtSAziMCA0R_dc6LEg17bZMfaxeRWAWwIHOzmGpQ5k6XyMZknH4xbt1uGbWy2A9QNec6fsJk
   :width: 624px
   :height: 99px
.. |image39| image:: https://lh4.googleusercontent.com/A6j5Jpp7HxifmizRXABrS69hgxGc7-XqCzKvSMthBJDrsHVb8uiD-uYMcsVc2f5UrFjckR-mbF3ziEZKOiwrpM16NmYRN1IQUZ3Nx9X-818cibThoh0HztNMp7RsOZaMquxleb4
   :width: 366px
   :height: 197px
.. |image40| image:: https://lh4.googleusercontent.com/CWDLvc41t8TPYf53VPMnYuPaCbF3NEI1s3E3obfpI8bQpn13j3wq8JhgyJLX8meXz_7Krn2reGPCek8MobeVXEhpEH3L3AaFPA8O3efXJ34HkQ25J29b4iVMtDrdX0Vgkvy-P1s
   :width: 179px
   :height: 58px
.. |image41| image:: https://lh4.googleusercontent.com/91YLZyeydI8RfSqMWvzksqgW22OOfEs2tmstg-5ianTHf8DjLzNBRfK_PNQOnAEPKt_CnDyqIkCxeUF6EUo5lvwXPX0Dc1020F1s2uEb-4xqo5yz0NzqDJeFRzsoAr1b869q9cs
   :width: 448px
   :height: 84px
.. |image42| image:: https://lh5.googleusercontent.com/scrbvKPKaBxaAJtki-9jB4dwL4eTxUiaqohxP0P8Yj-z4Xet53UMuy82DEJy1liTGpmwRNSSBpTc1Fvl04SB8XA0QdzzP7CFg534n0qnD8dbNK4vLkRWhc0bhSlPUZk86f6emBI
   :width: 265px
   :height: 113px
.. |image43| image:: https://lh3.googleusercontent.com/27RtPNfodri3VmFo-PfZK7WYrdQH4uxqXpMerKF7uhKRV8f762NHSv9-SVuEQl10MwnDDZvwvLPbHe5qtW8d81th3L_feoOm3MLwZI1M5x7Bi0Bk7PwtU9c9URhCtWZ9YZ8tikM
   :width: 607px
   :height: 117px
.. |image44| image:: https://lh4.googleusercontent.com/dWdH2spPEUjaR-QP2WSHRIft9ZaYViYxgb40RPPDp8DGGdLQidlNChewQbszgrqbt2t5l3bY0_oEsM36sE9d80pYGf5QyVAVIjg9DU4oAss1RU28hljmKpQlChAkmOKRw7tz-KE
   :width: 365px
   :height: 134px
.. |image45| image:: https://lh5.googleusercontent.com/UiYYfIeA-W9_2M6Dyaum48-YOx4IOzlYnFjW-8syyJjWJBylfEemjLRq-UXsnJ0HvWjxId78KyKxXpEFqxfNlBLgC2J0Sc_iLfnuqW5VY38zr17ShsPA4mKGTPRD5pdHaBriVqg
   :width: 410px
   :height: 75px
.. |image46| image:: https://lh4.googleusercontent.com/o44XznzLwzgzYoH-mKNT0ti1wo1IdXl2kYnSycEvwiuHZEPjzmiwbEPeJDpL9Wpg2GZUDyfDLfv1Gwion_edXoSrK5UpmSfwFHsJPYWtmGVQXvfoF_uv4awXzVfaDrkTweplgAA
   :width: 146px
   :height: 53px
.. |image47| image:: https://lh3.googleusercontent.com/3IvtkrqzRYHw0EPS5PrrP3RcngAuAO3cX2XFKE8fyfgoga8w3afak0xQQNX5CymhDPiDeFK6ZJkwWrG_l-LVYUcAkY6g81yh0Cphel4xptm35CywuMMW0G7YVeCE-21NTVz-ycM
   :width: 436px
   :height: 94px
.. |image48| image:: https://lh3.googleusercontent.com/gasIBmIFEYTSdVr87ng7jD_SFfZ_35WvOSZ7deS7GSke2ZpzvurP6UCF-rz7JK9fJ7X-LtpByVg3BNMQ6wPefnrITQYZCXbIJHaEpYwkX6BUH4Hl1NN1U9L91Nn770miHQra-Rk
   :width: 355px
   :height: 102px
.. |image49| image:: https://lh3.googleusercontent.com/nkmMVA6f-rZtBE0Nh9uJikELHPoYf33qHl4BlMCpLgdYEPaXbWgI1vQBeeXUeRc6jDGRrJjky5GHINGe-r8PKuxrKyfU8fRHs0Le5wYZ81Xb_6Wk8_YpKmQkvjPY_y_S8WldKpI
   :width: 335px
   :height: 291px
.. |image50| image:: https://lh5.googleusercontent.com/xYmKsqFH8G4Jvg9-QnNUdjU3aCmJzN7YPfQBeo-SBcjV6GHWWWPXrXUqcZEJWd_lu_CrxVUF-axOLhX2wJRVyvEBk0o1oFspSQTmLb8me62dEzavTBy08KwJ__cK1ZgBZ9T1mVU
   :width: 345px
   :height: 143px
.. |image51| image:: https://lh5.googleusercontent.com/9PnXnY429pTB9QD3lbfKfiffgV20wb9OxjiJV7n5pTjOckEnodk6yvn1Xo5RkOuBp8RLpwp8LZ_lNmIJ1-5enTdpRGDMpDknFtzBwuHsSdIbX2db_F5Cb18p1B1dsb-4UKENoLc
   :width: 254px
   :height: 93px
.. |image52| image:: https://lh4.googleusercontent.com/TMW9PXwbqLR_O39bajfIZ6yghsgH_p4y-_Ta7kIo8hDwdx-LPThMjCJIf1CPW-lzLrARWaqQzaXQm2B0m8MiC1RLex9IY7b1f_dSKTU-blMhq_i4Cx_B_Fh1EoTN958ekGPHw6E
   :width: 292px
   :height: 313px
.. |image53| image:: https://lh3.googleusercontent.com/6e0J3FfEO5LzrNDXiZPZUQ4SFgEcNYeXHT0l3CJzQh0-tpnco971QfwyJyHB4EKl6P2nqVUNy6Ts-O-cVPO3ZDwoS0gVFdoRN1TPf0SZAo9RuN-44V_H2NTtx44kM2szLtzc5-E
   :width: 624px
   :height: 135px
.. |image54| image:: https://lh4.googleusercontent.com/bOBOElR_9EUfDHDWMZNiwRLoLDhDO2KSV0p30PYmlaMGkSN4ZSnc3ODz6rZY4T1T2KxWMYZsOfXT9W2u9hVZNSMQPLNzwfFqSk1uCJH9mQvsf8mjzWyNQ2GDajOwZsKO3KxlosE
   :width: 231px
   :height: 159px
.. |image55| image:: https://lh6.googleusercontent.com/sRTTbyUUloScfmBBMlfLPC0oG1BEVg0UPuRJFMGKgk2Hjm-3XWfqGQwtfBszgoS7tvXbQ--cAqMT07k9ThEnYQMVXt6CY7J4PJgYbmHQJRMCU4vT1JaDVqWb9A_55SfBeeg08zo
   :width: 293px
   :height: 128px
.. |image56| image:: https://lh5.googleusercontent.com/owfgCrugsRE9dug3nkyovLiUPO8bhkD1R5tcJB3SVpd8TP7vRWAihB2QihxqZaxkmbGPcyNNZx0WLk2JQScOarLh9DaeAZR6NFFRufAkr_IwyvKvoxoeoj2HOJeH3mwog42r-80
   :width: 189px
   :height: 160px
.. |image57| image:: https://lh4.googleusercontent.com/n52sliLlg7R4z16niQTFy0BD1Ap7l48Wy4L9cU6E9s84RN5I1xdrCM6Ko-0L1tTmX_KTq6UwQeJpQSRFDRSRvzlHahFVeHIKiu7CKs_czWxrhqkW_PlwQD8nhq97ihdVzAJ6acg
   :width: 624px
   :height: 149px
.. |image58| image:: https://lh5.googleusercontent.com/XTmbmJKHEYYAeeYAHjGWrOiC-neB-Rw5yf1foxQXeZIolK0m4MxFJMSaiAahqJjPjteWgaHokUb0BTby75pQXuACwWmOKcRpsPwAECqhiTf2YdwN1ft_RFgG5XWWjGt_qycpQTc
   :width: 355px
   :height: 62px
.. |image59| image:: https://lh5.googleusercontent.com/NAZyXTZeRTK85qagBwpHJnvQdWBa266DvJ7oCO7c12Vl4h-a1lOESavS4B_VEiW2zYnQa684fOE0qXC0HCEhCMvHa05H_semZame539VCQe7uVVkjX9H-suNjREV1l3qmdZdG7o
   :width: 343px
   :height: 107px
.. |image60| image:: https://lh3.googleusercontent.com/cQ1bPczZBOX0BpYqQxdH5TvG0LxOq8JlyABTL7auZNDUvtYxvJ0oWjLP7h66OcIBhgn2IjwmWTIyWdN4CopapQy9L2QOTTN9f6rjqrEfWHJpmTZ4E_yvc4ztfegthwpfE8LSVRs
   :width: 624px
   :height: 165px
.. |image61| image:: https://lh5.googleusercontent.com/VIOX9fBcfDyneuwDGvr-Jd0p3LeAfWedVdfzkPfFQMhiDqKzbjeQwvU2MDq-7Pqv832l9D6BLVIInn8hbgBMiUxlFe1Neb4hr2ECRhaLoj9zgw-H6BnTSQ3qJcXQAP7kCCh0aR0
   :width: 372px
   :height: 182px
.. |image62| image:: https://lh4.googleusercontent.com/5pN5TPjEkZAZ9JB7scui0KGRC22YZ4_lHGqTxAzrefiky4O4UmP3ljIUwMsEP9XT7T_HRH4EVC7QN_k7wyKILZQ_cbdF9J3wKip4XQBPStGRMeWA0KdCZSKI86TiYOc7KuVqNr8
   :width: 624px
   :height: 149px
.. |image63| image:: https://lh4.googleusercontent.com/WQT_TO6HsSAlOi7kkbbnUUDP_6iE3Jcbg8_16JjCdklo4k6xilOS12htMWyEwbWSXuTuVWJYDP1P_iNOf3_sqHgkbrsPc4n7iZXTM81x94GVHVpBNI4cTp5LXAxZkz2ItR-m6Fs
   :width: 489px
   :height: 191px
.. |image64| image:: https://lh3.googleusercontent.com/hVud5qPy7cUP1nRFJK3mx5UG0OgT6Hu-uJcDbrNm7NKLskY_-C4PRuOrXyld-VLjUHzHmry5_Gqe6_F1ycBL8puk4W0xuHfh6dd8NEU2qyBMPex7e90Utrv11XQHelIiEVkQPMk
   :width: 220px
   :height: 309px
.. |image65| image:: https://lh6.googleusercontent.com/S76dBYY4A2KAEFQhi1ZSCKoOMnwsM6dSC0_l5gO9r0OYHl4lOn_h_m6T0yDuZFt68L5zTz638oxGm9X93FENHlO7c1bBTakayH-USjWEAZQrATrQaKhExrSXyIbaox923hSrMEA
   :width: 212px
   :height: 171px
.. |image66| image:: https://lh4.googleusercontent.com/4cp15XfTKf63AWCzGmLKoNpkCw80IgGMnbskGVeUTqlKnHfLR60ZPebBNz2dsWS1z_NDLH2SxEKnseZQIoyJKq7a4X7V5aHaC6MPUhydyj03BJK92WWNfCMWuehPJq4rAZXJVsU
   :width: 624px
   :height: 151px
