import { Navigation } from "react-native-navigation";

const startPassCodeScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'remote-control.PassCodeScreen',
            passProps: {
              text: 'Enter pass code'
            }
          }
        }],
        options: {
          topBar: {
            title: {
              text: 'Pass code'
            }
          }
        }
      }
    }
  });
}

export default startPassCodeScreen;
