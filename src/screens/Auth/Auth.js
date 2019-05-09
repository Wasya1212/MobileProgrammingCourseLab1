import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { View, Text, Button } from "react-native";

import startPassCodeScreen from "../MainTabs/StartPassCodeScreen";

import DefaultInput from "../../components/UI/DefaultInput";
import DefaultButton from "../../components/UI/DefaultButton";

import axios from "axios";

import { addUser } from "../../store/actions/index";

const mapDispatchToProps = dispatch => {
  return {
    onAddUser: (email, password) => dispatch(addUser(email, password))
  }
};

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//     userActions: bindActionCreators({ onAddUser: addUser }, dispatch)
//   }
// }

class Auth extends Component {
  state = {
    email: '',
    password: ''
  }

  loginHandler = () => {
    console.log(`${this.state.email}, ${this.state.password}`)
    axios.post('http://192.168.1.3:5000/login', {
      email: this.state.email.toString().toLowerCase().trim(),
      password: this.state.password.toString().toLowerCase().trim()
    })
    .then(({ data: user }) => {
      // startPassCodeScreen();
      // alert(`${user.email}, ${user.password}, ${user.ip}`);
      this.props.onAddUser(user.email, this.state.password.toString().toLowerCase().trim(), user.ip);
    })
    .catch(function (error) {
      alert(error);
    });
  }

  changeEmailLoginData = val => {
    this.setState({
      email: val
    });
  }

  changePasswordLoginData = val => {
    this.setState({
      password: val
    });
  }

  render() {
    return (
      <View>
        <Text>{`${this.props.user.email}, ${this.props.user.password}, ${this.props.user.ip}`}</Text>
        <DefaultInput placeholder="Email" value={this.state.email} onChangeText={this.changeEmailLoginData}/>
        <DefaultInput placeholder="Password" value={this.state.password} onChangeText={this.changePasswordLoginData}/>
        <DefaultButton onPress={this.loginHandler}>Sign in</DefaultButton>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.users.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
