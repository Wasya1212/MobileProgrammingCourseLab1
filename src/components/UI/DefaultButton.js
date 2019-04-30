import React, { Component }from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

class DefaultButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[ defaultStyles.button, { backgroundColor: this.props.backgroundColor }, this.props.style ]}>
          <Text style={[ defaultStyles.text, { color: this.props.color } ]}>{this.props.children}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const defaultStyles = StyleSheet.create({
  button: {
    margin: 5,
    padding: 10,
    borderRadius: 5
  },
  text: {
    color: '#000'
  }
});

export default DefaultButton;
