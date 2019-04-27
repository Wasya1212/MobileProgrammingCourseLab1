import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onItemSelected}>
        {
          this.props.icon ? (<Icon name={this.props.icon} size={30} color="#900" />) : null
        }
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
