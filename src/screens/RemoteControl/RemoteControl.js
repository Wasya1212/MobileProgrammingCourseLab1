import React, { Component } from "react";
import { View, Text } from "react-native";

export default class RemoteControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      connected: false
    };

    this.socket = new WebSocket('ws://10.0.2.2:8080/');
    this.socket.onopen = () => {
      this.setState({connected:true})
    };
  }

  emit = () => {
    if( this.state.connected ) {
      this.socket.send("message")
      this.setState(prevState => ({ open: !prevState.open }))
    }
  }

  componentDidMount() {
    this.socket.onopen = () => this.socket.send(JSON.stringify({type: 'control', payload: { controller: 'mouse', direction: 'right' }}));
    this.socket.onmessage = ({data}) => console.log(data);
  }

  render() {
    return (
      <View>
        <Text>Remote control page</Text>
      </View>
    );
  }
}
