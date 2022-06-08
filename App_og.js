import { StatusBar } from 'expo-status-bar';
// import React from 'react';
import React, { Component, useState, useEffect } from 'react';

import { StyleSheet, Text, View, ScrollView } from 'react-native';
import EchoTopic from './EchoTopic';
import { ROS } from './ROS' 
import ToggleConnect from './ToggleConnect'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Accelerometer } from 'expo-sensors';
// import SensorView from "./SensorView";
const client = new W3CWebSocket('ws://192.168.1.26:8000');


function Acceleration() {
  
  const [data, setData] = useState({});
  useEffect( () => {
    _subscribe();
  }, []);

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
  };
  
  // // SEE VALUES ON PHONE:
  // let { x, y, z } = data;

  // var x1 = parseFloat(x).toFixed(3) 
  // var y1 = parseFloat(y).toFixed(3) 
  // var z1 = parseFloat(z).toFixed(3) 
  return (
  <View>
    <Text>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
  {/* //   <Text>
  //     x: {x1} y: {y1} z: {z1}
  //   </Text> */}
  </View>
);
    }





class Websocket extends Component {
  UNSAFE_componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
      client.begin("192.168.1.26", 8000, "/sendSensorData");
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      const stateToChange = {};
      if (dataFromServer.type === "userevent") {
        stateToChange.currentUsers = Object.values(dataFromServer.data.users);
      } else if (dataFromServer.type === "contentchange") {
        stateToChange.text = dataFromServer.data.editorContent || contentDefaultMessage;
      }
      stateToChange.userActivity = dataFromServer.data.userActivity;
      this.setState({
        ...stateToChange
      });
    };
  }
  
  render() {
    return (
      <View>
        <Text>Practical Intro To WebSockets.</Text>
      </View>
    );
  }
}

// export default Websocket;



export default function App() {


  return (

    
    <View style={styles.container}>
      <Acceleration></Acceleration>
    {/* <Websocket></Websocket>   */}
    <ROS>
      <ToggleConnect />
      <EchoTopic />
    </ROS>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
