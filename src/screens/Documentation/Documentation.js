import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import DefaultButton from "../../components/UI/DefaultButton";
import DefaultText from "../../components/UI/DefaultText";
import DefaultTitle from "../../components/UI/DefaultTitle";

const styles = StyleSheet.create({
  button: {
    borderColor: '#368fce',
    borderWidth: 2
  }
});

export default class Documentation extends Component {
  render() {
    return (
      <View>
        <DefaultTitle>Documentation page</DefaultTitle>
        <DefaultText>default text</DefaultText>
        <DefaultButton style={styles.button} backgroundColor="#368fce" color="#fff" onPress={() => { alert("documentation default button!"); }}>Learn more</DefaultButton>
      </View>
    );
  }
}
