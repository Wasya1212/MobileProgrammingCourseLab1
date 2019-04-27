import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import MenuItem from "./MenuItem";

class MenuList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.items}
          renderItem={({ item }) => <MenuItem key={item.key} icon={item.icon} onItemSelected={() => this.props.onItemSelected(item.screen)} text={item.text}></MenuItem>}
        />
        <FlatList
          data={this.props.items}
          renderItem={({ item }) => <MenuItem key={item.key} icon={item.icon} onItemSelected={() => this.props.onItemSelected(item.screen)} text={item.text}>
            <Text>{item.screen.text}</Text>
          </MenuItem>}
        />
      </View>
    );
  }
}

export default MenuList;
