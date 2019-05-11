import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import DefaultButton from "../../components/UI/DefaultButton";
import DefaultInput from "../../components/UI/DefaultInput";
import Controller from "../../libs/controller";

class RemoteControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      z: 0,
      open: false,
      connected: false,
      keyboardVal: ''
    };

    this.controller = new Controller(this.props.user.ip);
  }

  componentDidMount() {
    this.controller.listenMoveMouse(({ x, y, z }) => {
      this.setState({ x, y, z });
    });
  }

  componentWillUnmount() {
    this.controller.disconnect();
    delete this.controller;
  }

  leftClickHandler = () => {
    this.controller.mouseClick('left');
  }

  rightClickHandler = () => {
    this.controller.mouseClick('right');
  }

  wordTypeHandler = key => {
    if (key.length < this.state.keyboardVal.length) {
      this.controller.pressKey('backspace');
    } else {
      this.controller.pressKey(key.slice(-1));
    }
    this.setState({ keyboardVal: key });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.controlContainer}>
          <DefaultButton style={styles.controlBtn} onPress={this.leftClickHandler}>left mouse</DefaultButton>
          <DefaultButton style={styles.controlBtn} onPress={this.rightClickHandler}>right mouse</DefaultButton>
        </View>
        <DefaultInput style={styles.input} placeholder="Tap to start write..." onChangeText={this.wordTypeHandler} value={this.state.keyboardVal} />
        <Icon name="mouse" size={120} color="#368fce" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around'
  },
  controlBtn: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#bbb',
    paddingTop: 100,
    paddingBottom: 100,
    paddingLeft: 40,
    paddingRight: 40
  },
  infoIcon: {
    padding: 50
  },
  input: {
    marginBottom: 50
  }
});

function mapStateToProps(state) {
  return { user: state.users.user }
}

export default connect(mapStateToProps)(RemoteControl);
