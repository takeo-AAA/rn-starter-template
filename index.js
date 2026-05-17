import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { AppProvider } from './src/app/providers/AppProvider';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppProvider);
