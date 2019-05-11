import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { View, Text, Button, AsyncStorage, StyleSheet } from "react-native";

import startPassCodeScreen from "../MainTabs/StartPassCodeScreen";

import DefaultInput from "../../components/UI/DefaultInput";
import DefaultButton from "../../components/UI/DefaultButton";
import DefaultTitle from "../../components/UI/DefaultTitle";

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
      <View style={styles.container}>
        <DefaultTitle style={styles.title}>Login</DefaultTitle>
        <DefaultInput style={styles.input} textContentType="emailAddress" placeholder="Email" value={this.state.email} onChangeText={this.changeEmailLoginData} />
        <DefaultInput style={styles.input} password={true} secureTextEntry={true} textContentType="password" placeholder="Password" value={this.state.password} onChangeText={this.changePasswordLoginData} />
        <DefaultButton style={styles.submitBtn} onPress={this.loginHandler}>
          <Text style={styles.text}>Sign in</Text>
        </DefaultButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtn: {
    padding: 15,
    borderColor: '#368fce',
    borderWidth: 2,
    backgroundColor: '#368fce'
  },
  text: {
    color: '#fff'
  },
  input: {
    borderColor: '#368fce',
    marginBottom: 25
  },
  title: {
    color: '#368fce',
    marginBottom: 25
  }
});

function mapStateToProps(state) {
  return { user: state.users.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
