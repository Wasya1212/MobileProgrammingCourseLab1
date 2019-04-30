import React, { Component } from "react";
import { TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    width: '90%',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 2,
    borderRadius: 5,
    borderColor: '#000',
    fontSize: 18
  }
});

class DefaultInput extends Component {
  state = {
    value: ''
  }

  constructor(props) {
    super(props);
  }

  changeTextHandler = val => {
    this.setState({
      value: val
    });

    this.props.onChangeText(val);
  }

  render() {
    return (
      <TextInput
        {...this.props}
        style={[ styles.input, this.props.style ]}
        value={this.state.value}
        onChangeText={this.changeTextHandler}
      />
    );
  }
}

export default DefaultInput;
