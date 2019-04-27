import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";

import logoImage from "../../assets/logo.png";

import startNavigationScreen from "../MainTabs/StartNavigationScreen";

export default class PassCode extends Component {
  state = {
    passCode: ''
  }

  passCodeHandler = val => {
    if (val.length == 5 && val.toString() == '12345') {
      startNavigationScreen();
    }

    this.setState({
      passCode: val
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logoImage}
          source={logoImage}
        />
        <TextInput
          style={styles.passInput}
          value={this.state.passCode}
          placeholder="Enter your pass code..."
          onChangeText={this.passCodeHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passInput: {
    width: '90%',
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 3,
    borderRadius: 5,
    borderColor: '#368fce',
    fontSize: 21
  },
  logoImage: {
    width: 150,
    height: 150,
    marginBottom: 75
  }
});
