import React from "react";
import { Provider } from "react-redux";

import { Navigation } from "react-native-navigation";

import AuthScreen from "./src/screens/Auth/Auth";
import DocumentationScreen from "./src/screens/Documentation/Documentation";
import CommandsScreen from "./src/screens/Commands/Commands";
import SettingsScreen from "./src/screens/Settings/Settings";
import RemoteControlScreen from "./src/screens/RemoteControl/RemoteControl";
import RemoteTVScreen from "./src/screens/RemoteTV/RemoteTV";
import VideoTranslationScreen from "./src/screens/VideoTranslation/VideoTranslation";
import PassCodeScreen from "./src/screens/PassCode/PassCode";
import NavigationScreen from "./src/screens/Navigation/Navigation";
import configureStore from "./src/store/configureStore";

const reduxStore = configureStore();

// Register screens
Navigation.registerComponent('remote-control.AuthScreen', () => (props) => (
  <Provider store={reduxStore}>
    <AuthScreen {...props} />
  </Provider>
), () => AuthScreen);
Navigation.registerComponent('remote-control.DocumentationScreen', () => DocumentationScreen);
Navigation.registerComponent('remote-control.CommandsScreen', () => CommandsScreen);
Navigation.registerComponent('remote-control.SettingsScreen', () => SettingsScreen);
Navigation.registerComponent('remote-control.RemoteControlScreen', () => (props) => (
  <Provider store={reduxStore}>
    <RemoteControlScreen {...props} />
  </Provider>
), () => RemoteControlScreen);
Navigation.registerComponent('remote-control.RemoteTVScreen', () => (props) => (
  <Provider store={reduxStore}>
    <RemoteTVScreen {...props} />
  </Provider>
), () => RemoteTVScreen);
Navigation.registerComponent('remote-control.VideoTranslationScreen', () => VideoTranslationScreen);
Navigation.registerComponent('remote-control.PassCodeScreen', () => (props) => (
  <Provider store={reduxStore}>
    <PassCodeScreen {...props} />
  </Provider>
), () => PassCodeScreen);
Navigation.registerComponent('remote-control.NavigationScreen', () => NavigationScreen);

// Start a app
Navigation.setRoot({
  root: {
    stack: {
      children: [{
        component: {
          name: 'remote-control.AuthScreen',
          passProps: {
            text: 'Login'
          }
        }
      }],
      options: {
        topBar: {
          title: {
            text: 'Sing in'
          }
        }
      }
    }
  }
});

























// import React from 'react';
// import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
//
// import logoImage from './src/assets/logo.png';
//
// export default class App extends React.Component {
//   state = {
//     passCode: ''
//   }
//
//   passCodeHandler = val => {
//     if (val.length == 5) {
//       alert("5 items");
//     }
//
//     this.setState({
//       passCode: val
//     });
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <Image
//           style={styles.logoImage}
//           source={logoImage}
//         />
//         <TextInput
//           style={styles.passInput}
//           value={this.state.passCode}
//           placeholder="Enter your pass code..."
//           onChangeText={this.passCodeHandler}
//         />
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   passInput: {
//     width: '90%',
//     paddingLeft: 15,
//     paddingRight: 15,
//     borderBottomWidth: 3,
//     borderRadius: 5,
//     borderColor: '#368fce',
//     fontSize: 21
//   },
//   logoImage: {
//     width: 150,
//     height: 150,
//     marginBottom: 75
//   }
// });
