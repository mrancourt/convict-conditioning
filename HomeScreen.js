import React, { Component } from 'react';

import {
  Container, Header, Tab, Tabs, ScrollableTab, ListItem, Card, CardItem, Body, Content, Left, Icon, Thumbnail, CheckBox,
} from 'native-base';
import PropTypes from 'prop-types';
import ProgressScreen from './ProgressScreen';
import PushupsScreen from './PushupsScreen';
import PullupsScreen from './PullupsScreen';
import LegraiseScreen from './LegraiseScreen';
import SquatsScreen from './SquatsScreen';
import BridgesScreen from './BridgesScreen';
import HandstandsScreen from './HandstandsScreen';


class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Convict Conditioning',
  };

  render() {
    const { navigation } = this.props;

    return (
      <Container>
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading="Progress">
            <ProgressScreen navigation={navigation} />
          </Tab>
          <Tab heading="Pushups">
            <PushupsScreen />
          </Tab>
          <Tab heading="Pullups">
            <PullupsScreen />
          </Tab>
          <Tab heading="Leg Raises">
            <LegraiseScreen />
          </Tab>
          <Tab heading="Squats">
            <SquatsScreen />
          </Tab>
          <Tab heading="Bridges">
            <BridgesScreen />
          </Tab>
          <Tab heading="Handstands">
            <HandstandsScreen />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default HomeScreen;

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
