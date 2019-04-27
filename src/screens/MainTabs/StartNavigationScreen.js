import { Navigation } from "react-native-navigation";

const startPassCodeScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'remote-control.NavigationScreen',
            passProps: {
              text: 'Choose category'
            }
          }
        }],
        options: {
          topBar: {
            title: {
              text: 'Main menu'
            }
          }
        }
      }
    }
  });
}

export default startPassCodeScreen;
