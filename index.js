import 'expo-dev-client';
import 'react-native-get-random-values';
import React from 'react';
import {registerRootComponent} from 'expo'
// import {AppWrapperNonSync} from './app/AppWrapperNonSync';
// import {AppWrapperSync} from './app/AppWrapperSync';
// import {SYNC_CONFIG} from './sync.config';
import App from './src/components/App';

// const App = () =>
//   SYNC_CONFIG.enabled ? (
//     <AppWrapperSync appId={SYNC_CONFIG.appId} />
//   ) : (
//     <AppWrapperNonSync />
//   );

registerRootComponent(App);
