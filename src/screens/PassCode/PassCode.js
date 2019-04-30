import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";

import logoImage from "../../assets/logo.png";

import startNavigationScreen from "../MainTabs/StartNavigationScreen";

import DefaultInput from "../../components/UI/DefaultInput";

export default class PassCode extends Component {
  passCodeHandler = val => {
    if (val.length == 5 && val.toString() == '12345') {
      startNavigationScreen();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logoImage}
          source={logoImage}
        />
        <DefaultInput
          placeholder="Enter your pass code..."
          onChangeText={this.passCodeHandler}
          style={styles.passInput}
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
    borderColor: '#368fce'
  },
  logoImage: {
    width: 150,
    height: 150,
    marginBottom: 75
  }
});
