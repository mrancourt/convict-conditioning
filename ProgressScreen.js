import React, { Component } from 'react';
import {
  Text, ScrollView, View,
} from 'react-native';
import AnimatedBar from 'react-native-animated-bar';
import PropTypes from 'prop-types';
import dataStore from './datastore';

const ucFirst = string => (
  string.charAt(0).toUpperCase() + string.slice(1)
);

const progress = done => (
  Math.round(done / 30 * 100)
);

class ProgressScreen extends Component {
  static navigationOptions = {
    title: 'Your Progress',
  };

  render() {
    return (
      <ScrollView>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 20,
        }}
        >
          {Object.keys(dataStore['@muscleGroups']).map(muscleGroup => [
            <Text key={`nav-${muscleGroup}`}>{ucFirst(muscleGroup)}</Text>,
            <AnimatedBar
              key={`progress-${muscleGroup}`}
              style={{ margin: 10 }}
              progress={dataStore[`@progress-${muscleGroup}`]}
              height={30}
              barColor="#264653"
              fillColor="#2A9D8F"
              borderWidth={0}
              animate={false}
            />,
          ])}
        </View>
      </ScrollView>
    );
  }
}

export default ProgressScreen;

ProgressScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
