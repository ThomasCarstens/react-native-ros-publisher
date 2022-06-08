import React from 'react';
import ReactTable from 'react-table'
// import 'react-table/react-table.css'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
class SocketStream extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentData: []
    };
    this.ws = new WebSocket("ws://192.168.1.26:8888/");
  }

  render() {
    this.ws.onopen = () => {
      console.log('Opened Connection!')
    };

    this.ws.onmessage = (event) => {
      const myData = myUsers.map(event => {
        initialData = JSON.parse(event.data)
        const endData = {};
    
        endData[initialData.name] = initialData.name;
        endData.age = initialData.number;
    
        return container;
      })

      this.setState({ currentData: JSON.parse(event.data) });
    };

    this.ws.onclose = () => {
      console.log('Closed Connection!')
    };

    const columns = [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Number', accessor: 'number' }
    ]
    console.log(this.state.currentData);
    return (
      // <View>
      //   <ReactTable
      //     data={this.state.currentData}
      //     columns={columns}
      //   />
      // </View>
      <View>
        <Table>
          {/* <Row/> */}
          <Cols data={this.state.currentData}/>
        </Table>
      </View>
    );
  }
}

export default function App() {


  return (

    
    <View >
      <SocketStream></SocketStream>
    {/* <Websocket></Websocket>   */}
    </View>
  );
}
