import React, { Component } from "react";
import { View, Text, Button } from "react-native";

import startPassCodeScreen from "../MainTabs/StartPassCodeScreen";

class Auth extends Component {
  loginHandler = () => {
    startPassCodeScreen();
  }

  render() {
    return (
      <View>
        <Text>Login page</Text>
        <Button disabled text="Disabled" title={(() => ('asd'))()} />
      </View>
    );
  }
}

export default Auth;
