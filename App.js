import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, ScrollView, Text, View,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import dataStore from './datastore';

const ucFirst = string => (
  string.charAt(0).toUpperCase() + string.slice(1)
);

class ProgressScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {Object.keys(dataStore['@muscleGroups']).map(muscleGroup => [
            <Text key={`progression-${muscleGroup}`}>{`${muscleGroup} => ${dataStore[`@progress-${muscleGroup}`]}`}</Text>,
            <Button
              key={`nav-${muscleGroup}`}
              title={muscleGroup}
              onPress={() => navigation.navigate(ucFirst(muscleGroup))}
            />,
            <View key={`progress-${muscleGroup}`} width="70%" style={{ margin: 10 }}>
              <View width={`${dataStore[`@progress-${muscleGroup}`]}%`} height={20} style={{ backgroundColor: '#0c204a' }} />
            </View>,
          ])}
        </View>
      </ScrollView>
    );
  }
}

class ExerciceList extends Component {
  constructor() {
    super();
    this.state = {
      progress: -1,
    };
  }

  render() {
    const { exercice } = this.props;
    const { progress } = this.state;
    const { '@muscleGroups': { [exercice]: { exercices = [] } } } = dataStore;
    return (
      <ScrollView>
        <View style={{
          flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
        }}
        >
          <Text>Pushups Screen</Text>
          {exercices.map(({ name, instructions }, id) => [
            <Text key={`name-${name}`}>{name}</Text>,
            <Text key={`instruction-${name}`}>{instructions}</Text>,
            <CheckBox
              key={`checkbox-${name}`}
              name={`checkbox-${name}`}
              checked={id <= progress}
              onPress={() => this.setState({ progress: id <= progress ? id - 1 : id })}
            />,
          ])}
        </View>
      </ScrollView>
    );
  }
}

class PushupsScreen extends Component {
  render() {
    return (
      <ExerciceList exercice="pushups" />
    );
  }
}

class PullupsScreen extends Component {
  render() {
    return (
      <ExerciceList exercice="pullups" />
    );
  }
}

class LegraiseScreen extends Component {
  render() {
    return (
      <ExerciceList exercice="legraises" />
    );
  }
}

class SquatsScreen extends Component {
  render() {
    return (
      <ExerciceList exercice="squats" />
    );
  }
}

class BridgesScreen extends Component {
  render() {
    return (
      <ExerciceList exercice="bridges" />
    );
  }
}

class HandstandsScreen extends Component {
  render() {
    return (
      <ExerciceList exercice="handstands" />
    );
  }
}

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

ProgressScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

ExerciceList.propTypes = {
  exercice: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    link: PropTypes.string,
    name: PropTypes.string,
    instructions: PropTypes.string,
    progression: PropTypes.array,
  })).isRequired,
};
