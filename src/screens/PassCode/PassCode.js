import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";

import logoImage from "../../assets/logo.png";

import startNavigationScreen from "../MainTabs/StartNavigationScreen";

import DefaultInput from "../../components/UI/DefaultInput";

import axios from "axios";

import { addUser } from "../../store/actions/index";

const mapDispatchToProps = dispatch => {
  return {
    onAddUser: (email, password, ip) => dispatch(addUser(email, password, ip))
  }
};

class PassCode extends Component {
  passCodeHandler = val => {
    if (val.length == 5) {
      axios.post('https://remotedesktopweb.herokuapp.com/get-access', {
        email: this.props.user.email,
        accessKey: val
      })
      .then(({ data }) => {
        // alert(`${user.email}, ${user.password}, ${user.ip}`);
        this.props.onAddUser(this.props.user.email, this.props.user.password, data.ip);
        startNavigationScreen();
      })
      .catch(function (error) {
        alert(error);
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{`${this.props.user.email}, ${this.props.user.password}, ${this.props.user.ip}`}</Text>
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

function mapStateToProps(state) {
  return { user: state.users.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(PassCode);

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
