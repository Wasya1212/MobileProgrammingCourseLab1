import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Slider from 'react-native-slider';

import DefaultButton from "../../components/UI/DefaultButton";
import Controller from "../../libs/controller";

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
      volumeLevel: 0,
      x: 0,
      y: 0,
      z: 0,
      connected: false
    };

    this.controller = new Controller(this.props.user.ip, {
      onGetVolume: volumeLevel => {
        this.setState({ volumeLevel });
      }
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.controller.getVolumeLevel();
    }, 100)


    this.controller.listenMoveMouse(({ x, y, z }) => {
      this.setState({ x, y, z });
    });
  }

  clickHandler = () => {
    this.controller.mouseClick('left');
  }

  scrollTop = () => {
    this.controller.mouseScroll('top');
  }

  scrollBottom = () => {
    this.controller.mouseScroll('bottom');
  }

  pauseHandler = () => {
    this.controller.pressKey('space');
  }

  fullscreenHandler = () => {
    this.controller.pressKey('f');
  }

  backHandler = () => {
    this.controller.pressKey('left');
  }

  forwardHandler = () => {
    this.controller.pressKey('right');
  }

  volumeHandler = (volumeLevel) => {
    this.controller.setVolumeLevel(volumeLevel);

    this.setState({volumeLevel});
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
        <Slider
          value={this.state.volumeLevel}
          onValueChange={this.volumeHandler}
          style={styles.volumeSlider}
        />
        <Text>Value: {this.state.volumeLevel}</Text>
        <DefaultButton onPress={this.clickHandler}>click</DefaultButton>
        <DefaultButton onPress={this.scrollTop}>scroll top</DefaultButton>
        <DefaultButton onPress={this.scrollBottom}>scroll bottom</DefaultButton>
        <DefaultButton onPress={this.pauseHandler}>pause</DefaultButton>
        <DefaultButton onPress={this.fullscreenHandler}>fullscreen</DefaultButton>
        <DefaultButton onPress={this.backHandler}>back</DefaultButton>
        <DefaultButton onPress={this.forwardHandler}>forward</DefaultButton>
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
  volumeSlider: {
    width: 150
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
