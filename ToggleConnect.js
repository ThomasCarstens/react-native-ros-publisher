import React, { useEffect, useState } from 'react'
import { useROS } from './ROS'
import { StyleSheet, Text, View, TextInput, Input, Button, Flatlist} from 'react-native';

function ToggleConnect() {
  const { isConnected, topics, url, changeUrl, toggleConnection, toggleAutoconnect} = useROS();

  // Try replacing this with your own unique rosbridge webserver address
//   const defaultURL = "ws://192.168.1.26:11311";
  const defaultURL = "ws://192.168.1.26:9090";
	
  // only runs once when ToggleConnect is first rendered (mounted)
  useEffect(() => {
    console.log('ToggleConnect is mounted!');
    if (url !== defaultURL) {
      changeUrl(defaultURL);
    }

    if (!isConnected) {
      toggleAutoconnect();
    }
  },[])
    
  // runs every time there is an update to any state/rerender
  useEffect(() => {
    //console.log('rerender ToggleConnect');
  })
//   <TextInput
//   style={styles.input}
//   onChangeText={onChangeNumber}
//   value={number}
//   placeholder="useless placeholder"
//   keyboardType="numeric"
// />
    console.log('result', topics)
    const TOPICS = topics.map((topic, i) => { {topic.path} })
    const [people, setPeople]=useState([
        {name: 'shaun', key: '1'},
        {name: 'yoshi', key: '2'},
        {name: 'friend', key: '3'},

    ])
  return (

        <View>
        <Text>
            Simple connect:  <Button onClick={ toggleConnection } title="Toggle Connect"/>  {"\n"}{"\n"}{"\n"}
            ROS url input:  </Text><TextInput name="urlInput" placeholder="add url here."defaultValue={url} onChange={event => changeUrl(event.target.value)} />  
        <Text>{"\n"}
            ROS url to connect to:  {url}  {"\n"}
            Status of ROS: { isConnected ? "connected" : "not connected" }   {"\n"}
            Topics detected:{"\n"}
        </Text>
        { topics.map((item) => {
            return(
                <View>
                    <Text>{item.path} {item.type}</Text>
                </View>
            )
            
        })}     
        </View>


  );
}

export default ToggleConnect;