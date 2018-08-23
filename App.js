import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Font } from 'expo';
import ProgressScreen from './ProgressScreen';
import PushupsScreen from './PushupsScreen';
import PullupsScreen from './PullupsScreen';
import LegraiseScreen from './LegraiseScreen';
import SquatsScreen from './SquatsScreen';
import BridgesScreen from './BridgesScreen';
import HandstandsScreen from './HandstandsScreen';
import HomeScreen from './HomeScreen';
import NoteScreen from './NoteScreen';

Font.loadAsync({
  Roboto: require('native-base/Fonts/Roboto.ttf'),
  Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
});

const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Progress: {
    screen: ProgressScreen,
  },
  Pushups: {
    screen: PushupsScreen,
  },
  Handstands: {
    screen: HandstandsScreen,
  },
  Pullups: {
    screen: PullupsScreen,
  },
  Legraises: {
    screen: LegraiseScreen,
  },
  Squats: {
    screen: SquatsScreen,
  },
  Bridges: {
    screen: BridgesScreen,
  },
  Notes: {
    screen: NoteScreen,
  },
},
{
  initialRouteName: 'Home',
});

const App = () => {
  return <RootStack />;
};
export default App;
