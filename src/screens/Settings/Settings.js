import React, { Component } from "react";
import { View, Text } from "react-native";
import Svg, { Polyline } from 'react-native-svg';

export default class Settings extends Component {
  render() {
    return (
      <View>
        <Text>Settings page</Text>
        <Svg
          height="300"
          width="300"
        >
          <Polyline
			      points="150,0 0,150 75,75 0,0"
            fill="none"
            stroke="black"
            strokeWidth="3"
          />
          <Polyline
			      points="200,50 150,0 150,150 200,150 150,75 200,50"
            fill="none"
            stroke="black"
            strokeWidth="3"
          />
        </Svg>
      </View>
    );
  }
}
