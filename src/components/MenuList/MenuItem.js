import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onItemSelected}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
