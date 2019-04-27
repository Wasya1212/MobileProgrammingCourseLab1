import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";

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
          renderItem={({ item }) => <MenuItem key={item.key} onItemSelected={() => this.props.onItemSelected(item.screen)} text={item.text}>
            <Text>{item.text}</Text>
          </MenuItem>}
        />
        <FlatList
          data={this.props.items}
          renderItem={({ item }) => <MenuItem key={item.key} onItemSelected={() => this.props.onItemSelected(item.screen)} text={item.text}>
            <Text>{item.key}</Text>
          </MenuItem>}
        />
      </View>
    );
  }
}

export default MenuList;
