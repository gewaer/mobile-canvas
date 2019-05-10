/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import { Navigation } from 'react-native-navigation';
import registerScreens from './src/screens/registerScreen';
import'./src/config/sentry';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'canvas.Welcome',
              options: {
                topBar: {
                  visible: false
                }
              }
            }
          }
        ],
      }
    }
  });
});
