import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import Slider from 'react-native-slider';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

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

  componentWillUnmount() {
    this.controller.disconnect();
    delete this.controller;
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
      <View style={[styles.container, styles.mainContainer]}>
        <View>
          <DefaultButton onPress={this.clickHandler}>
            <Icon name="touch-app" size={100} color="#368fce" />
          </DefaultButton>
        </View>
        <View style={styles.containerRow}>
          <View style={styles.volumeSliderContainer}>
            <Slider
              value={this.state.volumeLevel}
              onValueChange={this.volumeHandler}
              style={styles.volumeSlider}
              thumbTintColor="#368fce"
            />
            <Text>Volume: {Math.floor(this.state.volumeLevel * 100)}</Text>
          </View>
          <View>
            <DefaultButton onPress={this.scrollTop}>
              <Icon name="keyboard-arrow-up" size={50} color="#368fce" />
            </DefaultButton>
            <DefaultButton onPress={this.scrollBottom}>
              <Icon name="keyboard-arrow-down" size={50} color="#368fce" />
            </DefaultButton>
          </View>
        </View>
        <View style={styles.containerRow}>
          <DefaultButton onPress={this.backHandler}>
            <Icon name="arrow-back" size={50} color="#368fce" />
          </DefaultButton>
          <DefaultButton onPress={this.pauseHandler}>
            <Icon name="pause-circle-outline" size={50} color="#368fce" />
          </DefaultButton>
          <DefaultButton onPress={this.forwardHandler}>
            <Icon name="arrow-forward" size={50} color="#368fce" />
          </DefaultButton>
          <DefaultButton onPress={this.fullscreenHandler}>
            <Icon name="aspect-ratio" size={50} color="#368fce" />
          </DefaultButton>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.users.user }
}

export default connect(mapStateToProps)(RemoteTV);

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: 50,
    paddingTop: 50,
    justifyContent: 'flex-start'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  volumeSlider: {
    width: 200
  },
  volumeSliderContainer: {
    marginRight: 25
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
