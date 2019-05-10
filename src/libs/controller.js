import { accelerometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";

export default class Controller {
  constructor(ip, opts) {
    this.ip = ip;
    this.connected = false;
    this.position = {
      x: 0,
      y: 0,
      z: 0
    };

    this.socket = new WebSocket(`ws://${this.ip}:8080/`);
    this.socket.onopen = () => { this.connected = true; };

    this.socket.onmessage = ({data}) => {
      try {
        const { type, volumeLevel } = JSON.parse(data);

        if (type == 'volume') {
          opts.onGetVolume(volumeLevel);
        }
      } catch (e) {
        alert(e);
      }
    };

    setUpdateIntervalForType(SensorTypes.accelerometer, 100);
  }

  emit(data) {
    if( this.connected ) {
      this.socket.send(JSON.stringify(data));
    }
  }

  listenMoveMouse(callback) {
    let moveMouse = direction => {
      this.emit({
        type: 'control',
        payload: {
          controller: 'mouse',
          direction: direction.toString()
        }
      });
    }

    this.subscription = accelerometer.subscribe(({ x, y, z, timestamp }) => {
      this.position = { x, y, z };

      if (x > 3 && y > 4) {
        moveMouse('top-left');
      } else if (x > 3 && y < -2) {
        moveMouse('bottom-left');
      } else if (x < -3 && y > 4) {
        moveMouse('top-right');
      } else if (x < -3 && y < -2) {
        moveMouse('bottom-right');
      } else if (x < -3) {
        moveMouse('right');
      } else if (x > 3) {
        moveMouse('left');
      } else if (y > 4) {
        moveMouse('top');
      } else  if (y < -2) {
        moveMouse('bottom');
      }

      callback({ x, y, z, timestamp });
    });
  }

  mouseClick(button = 'left') {
    this.emit({
      type: 'control',
      payload: {
        controller: 'mouse',
        action: `${button}-click`
      }
    });
  }

  mouseScroll(direction) {
    this.emit({
      type: 'control',
      payload: {
        controller: 'mouse',
        action: `${direction}-scroll`
      }
    });
  }

  pressKey(key) {
    this.emit({
      type: 'control',
      payload: {
        controller: 'keyboard',
        key: key
      }
    });
  }

  getVolumeLevel() {
    this.emit({
      type: 'control',
      payload: {
        controller: 'volume',
        action: 'get-volume-level'
      }
    });
  }

  setVolumeLevel(vol) {
    this.emit({
      type: 'control',
      payload: {
        controller: 'volume',
        action: 'set-volume-level',
        volumeLevel: vol
      }
    });
  }
}
