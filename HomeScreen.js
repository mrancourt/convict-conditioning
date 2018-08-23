import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Tab, Tabs, ScrollableTab, Fab, Icon, Text,
} from 'native-base';
import ProgressScreen from './ProgressScreen';
import PushupsScreen from './PushupsScreen';
import PullupsScreen from './PullupsScreen';
import LegraiseScreen from './LegraiseScreen';
import SquatsScreen from './SquatsScreen';
import BridgesScreen from './BridgesScreen';
import HandstandsScreen from './HandstandsScreen';

const PAGES = [
  'progress',
  'pushups',
  'lergaises',
  'squats',
  'bridges',
  'handstands',
];

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 0,
    };
  }

  render() {
    let { navigation } = this.props;
    let { selectedTab } = this.state;

    return (
      <Container>
        <Tabs
          prerenderingSiblingsNumber={1}
          onChangeTab={(tab) => { this.setState({ selectedTab: tab.i }); }}
          renderTabBar={() => <ScrollableTab />}
        >
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
        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => navigation.navigate('Notes', {
            noteKey: `@note-${PAGES[selectedTab]}`,
          })}
        >
          <Icon name="md-add" />
        </Fab>
      </Container>
    );
  }
}
HomeScreen.navigationOptions = {
  title: 'Convict Conditioning',
  headerStyle: {
    backgroundColor: '#275DAD',
  },
  headerTintColor: '#fff',
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeScreen;
