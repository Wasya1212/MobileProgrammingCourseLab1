import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  text: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold'
  }
});

class DefaultTitle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text {...this.props} style={[ styles.text, this.props.style ]}>{this.props.children}</Text>
      </View>
    );
  }
}

export default DefaultTitle;
