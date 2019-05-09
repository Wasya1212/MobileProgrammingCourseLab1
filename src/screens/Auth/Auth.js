import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { View, Text, Button, AsyncStorage } from "react-native";

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

const storeAuthData = async data => {
  try {
    await AsyncStorage.setItem('UID123', JSON.stringify(data));
  } catch (error) {
    alert("Cannot save auth data localy!");
  }
}

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('UID123')
      .then(result => {
        const json = JSON.parse(result);

        this.setState({
          email: json.email,
          password: json.password
        });
      })
      .catch(err => {
        alert(err);
      });
  }

  loginHandler = () => {
    axios.post('https://remotedesktopweb.herokuapp.com/login', {
      email: this.state.email.toString().toLowerCase().trim(),
      password: this.state.password.toString().toLowerCase().trim()
    })
    .then(({ data: user }) => {
      storeAuthData({
        email: user.email,
        password: this.state.password.toString().toLowerCase().trim()
      });

      this.props.onAddUser(user.email, this.state.password.toString().toLowerCase().trim(), user.ip);
      startPassCodeScreen();
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
        <DefaultInput textContentType="emailAddress" placeholder="Email" value={this.state.email} onChangeText={this.changeEmailLoginData} />
        <DefaultInput textContentType="password" placeholder="Password" value={this.state.password} onChangeText={this.changePasswordLoginData} />
        <DefaultButton onPress={this.loginHandler}>Sign in</DefaultButton>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.users.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
