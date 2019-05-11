import React, { Component } from "react";
import { ScrollView, View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

import MenuItem from "./MenuItem";

class MenuList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.largeItemsContainer}>
          {
            this.props.items.map(item => <MenuItem style={styles.largeItem} key={item.key} iconSize={60} icon={item.icon} onItemSelected={() => this.props.onItemSelected(item.screen)} text={item.text}></MenuItem>)
          }
        </View>
        <View style={styles.smallItemsContainer}>
          {
            this.props.items.map(item => (
              <MenuItem style={styles.smallItem} key={item.key} iconSize={20} icon={item.icon} onItemSelected={() => this.props.onItemSelected(item.screen)} text={item.text}>
                <Text>{item.screen.text}</Text>
              </MenuItem>
            ))
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  largeItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#368fce'
  },
  smallItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  largeItem: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderColor: '#fff',
    borderWidth: 1
  },
  smallItem: {
    width: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 20,
    flexWrap: 'nowrap'
  }
});

export default MenuList;
