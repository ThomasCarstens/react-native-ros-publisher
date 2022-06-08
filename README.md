# react-native-ros-publisher 
Currently experimenting with the **distributed networking of native sensors.**

**Why?** I wish to stream data between my phone and my laptop. 
- ROS offers the versatility of distributed networking tools. As of May 2022, this seem to be no other native mobile framework directly compatible with ROS.
- Websockets have low latency for realtime streaming as opposed to REST APIs.

This is an RN project that transfers JSON via ROS/Websockets. 

Tested on Samsung using React Native (RN), and to Ubuntu 20 
- PC to phone via `rosbridge_suite` on ROS
- phone to PC via websockets

## Master branch: Template of basic functionality.
![Android connects to ros and print topics](/assets/connected.jpeg width=300 "Connects and Reads Network Topics.").

Snapshot of my phone screen (Android): Connects to ros and prints topics. 


## Dev branch: Testing Android streaming in RN Viro app.
### 7 June '22
Near realtime viz acquired
