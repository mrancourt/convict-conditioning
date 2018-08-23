import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import ProgressScreen from './ProgressScreen';
import PushupsScreen from './PushupsScreen';
import PullupsScreen from './PullupsScreen';
import LegraiseScreen from './LegraiseScreen';
import SquatsScreen from './SquatsScreen';
import BridgesScreen from './BridgesScreen';
import HandstandsScreen from './HandstandsScreen';

const RootStack = createStackNavigator({
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
},
{
  initialRouteName: 'Progress',
});

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
