import React, { useState, useEffect } from 'react'
import { useROS } from './ROS'
import { StyleSheet, Text, View, TextInput, Button, Flatlist} from 'react-native';

var listener = null;

function EchoTopic() {
  const { createListener, topics } = useROS();
  const [ topic, setTopic ] = useState('/client_count');
  const [ queue, setQueue ] = useState(0);
  const [ compression, setCompression ] = useState('none');

  useEffect(() => {
    handleTopic(topic);
  });

  const unsubscribe = () => {
    if (listener) {
      console.log("Unsubscribing");
      listener.unsubscribe();
    }
  }

  const handleTopic = (topicInput) => {
    console.log(topicInput) // ISSUE IS WITH INPUT.
    if (topic !== topicInput) {
      setTopic(topicInput);
      unsubscribe();
      return;
    }

    unsubscribe();
    listener = null;

    for (var i in topics) {
      if (topics[i].path == topicInput) {
        listener = createListener( topics[i].path,
                                   topics[i].msgType,
                                   Number(queue),
                                   compression);
        break;
      }
    }

    if (listener) {
      console.log("Subscribing to messages...");
      listener.subscribe(handleMsg);
    } else {
      console.log("Topic '" + topic + "' not found...make sure to input the full topic path - including the leading '/'");
    }
  }

  const handleQueue = (queueInput) => {
    setQueue(queueInput);
  }

  const handleCompression = (compInput) => {
    console.log('compression is', compInput)
    setCompression(compInput);
  }

  const handleMsg = (msg) => {
    console.log(msg);
  }

  return (
    // <div>
    //   <b>Message Queue Length:  </b><input name="queueInput" defaultValue={ queue } onChange={event => handleQueue(event.target.value)} />  <br />
    //   <b>Compression:  </b><input name="compInput" defaultValue={ compression } onChange={event => handleCompression(event.target.value)} />  <br />
    //   <b>Topic to echo:  </b><input name="topicInput" defaultValue={ topic } onChange={event => handleTopic(event.target.value)} />  <br />
    // </div>
    <View>
      <Text>
        Message Queue Length:  </Text><TextInput floatingLabel name="queueInput" defaultValue={ queue } value={queue} onChange={event => handleQueue(event.target.value)} /><Text> {"\n"}
        Compression:  </Text><TextInput floatingLabel name="compInput" defaultValue={ compression } value={compression} onChange={event => handleCompression(event.target.value)} /><Text> {"\n"}
        Topic to echo:  </Text><TextInput floatingLabel name="topicInput" defaultValue={ topic } value={topic} onChange={event => handleTopic(event.target.value)} /><Text>  {"\n"}
      </Text>
    </View>
  );
}

export default EchoTopic;