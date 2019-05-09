import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { accelerometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";

const Value = ({name, value}) => (
  <View style={styles.valueContainer}>
    <Text style={styles.valueName}>{name}:</Text>
    <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
  </View>
)

class RemoteTV extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      z: 0,
      connected: false
    };

    this.socket = new WebSocket(`ws://${this.props.user.ip}:8080/`);
    this.socket.onopen = () => {
      this.setState({connected:true})
    };

    setUpdateIntervalForType(SensorTypes.accelerometer, 100);
  }

  emit = data => {
    if( this.state.connected ) {
      this.socket.send(JSON.stringify(data));
    }
  }

  componentDidMount() {
    let moveMouse = direction => {
      this.emit({
        type: 'control',
        payload: {
          controller: 'mouse',
          direction: direction.toString()
        }
      });
    }

    const subscription = accelerometer.subscribe(({ x, y, z, timestamp }) => {
      let direction = 'none';

      this.setState(prevState => {
        if (x > 3) {
          moveMouse('left');
        } else if (x < -3) {
          moveMouse('right');
        }

        if (y > 5) {
          moveMouse('top');
        } else  if (y < -2) {
          moveMouse('bottom');
        }
        return { x, y, z, direction };
      });
    });

    this.socket.onmessage = ({data}) => console.log(data);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Remote TV page {this.props.user.ip}</Text>
        <Text style={styles.headline}>
          Accelerometer values
        </Text>
        <Value name="x" value={this.state.x} />
        <Value name="y" value={this.state.y} />
        <Value name="z" value={this.state.z} />
        <Value name="direction" value={this.state.direction} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.users.user }
}

export default connect(mapStateToProps)(RemoteTV);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headline: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  valueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  valueValue: {
    width: 200,
    fontSize: 20
  },
  valueName: {
    width: 50,
    fontSize: 20,
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
