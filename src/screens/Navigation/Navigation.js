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
    }
  },
  {
    text: 'Commands screen',
    key: Math.random(),
    screen: {
      text: 'Commands',
      title: 'Commands',
      name: 'remote-control.CommandsScreen'
    }
  },
  {
    text: 'Video translation screen',
    key: Math.random(),
    screen: {
      text: 'Video translation',
      title: 'Video translation',
      name: 'remote-control.VideoTranslationScreen'
    }
  },
  {
    text: 'Remote TV screen',
    key: Math.random(),
    screen: {
      text: 'TV remote',
      title: 'TV remote',
      name: 'remote-control.RemoteTVScreen'
    }
  },
  {
    text: 'Presentation mode screen',
    key: Math.random(),
    screen: {
      text: 'Presentation mode',
      title: 'Presentation mode',
      name: 'remote-control.PresentationModeScreen'
    }
  },
  {
    text: 'Documentation screen',
    key: Math.random(),
    screen: {
      text: 'Documentation',
      title: 'Documentation',
      name: 'remote-control.DocumentationScreen'
    }
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
        <Text>Navigation page</Text>
        <MenuList items={menuItems} onItemSelected={this.screenSelectedHandler}></MenuList>
      </View>
    );
  }
}
