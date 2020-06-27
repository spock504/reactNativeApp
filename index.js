/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import 'react-native-gesture-handler'
import * as Sentry from '@sentry/react-native';

import App from './src/App'

Sentry.init({ 
    dsn: 'https://da52beeed0dd419e8146ab7331d2a486@sentry.io/2787865', 
});

AppRegistry.registerComponent(appName, () => App);
