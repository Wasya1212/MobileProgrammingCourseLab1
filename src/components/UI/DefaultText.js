import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    color: '#000'
  }
});

class DefaultText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text {...this.props} style={[ styles.text, this.props.style ]}>{this.props.children}</Text>
    );
  }
}

export default DefaultText;
