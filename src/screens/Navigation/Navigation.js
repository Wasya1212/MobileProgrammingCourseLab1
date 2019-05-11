import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { Navigation } from "react-native-navigation";

import MenuList from "../../components/MenuList/MenuList";

const menuItems = [
  {
    text: 'Remote control screen',
    key: Math.random(),
    screen: {
      text: 'Remote Control',
      title: 'Remote Control',
      name: 'remote-control.RemoteControlScreen'
    },
    icon: 'settings-remote'
  },
  {
    text: 'Commands screen',
    key: Math.random(),
    screen: {
      text: 'Commands',
      title: 'Commands',
      name: 'remote-control.CommandsScreen'
    },
    icon: 'line-weight'
  },
  {
    text: 'Video translation screen',
    key: Math.random(),
    screen: {
      text: 'Video translation',
      title: 'Video translation',
      name: 'remote-control.VideoTranslationScreen'
    },
    icon: 'important-devices'
  },
  {
    text: 'Remote TV screen',
    key: Math.random(),
    screen: {
      text: 'TV remote',
      title: 'TV remote',
      name: 'remote-control.RemoteTVScreen'
    },
    icon: 'live-tv'
  },
  {
    text: 'Settings screen',
    key: Math.random(),
    screen: {
      text: 'Settings',
      title: 'Settings',
      name: 'remote-control.SettingsScreen'
    },
    icon: 'settings'
  },
  {
    text: 'Documentation screen',
    key: Math.random(),
    screen: {
      text: 'Documentation',
      title: 'Documentation',
      name: 'remote-control.DocumentationScreen'
    },
    icon: 'library-books'
  }
];

export default class MainNavigation extends Component {
  screenSelectedHandler = screen => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screen.name,
        passProps: {
          text: screen.text
        },
        options: {
          topBar: {
            title: {
              text: screen.title
            }
          }
        }
      }
    });
  }

  render() {
    return (
      <View>
        <MenuList items={menuItems} onItemSelected={this.screenSelectedHandler}></MenuList>
      </View>
    );
  }
}
