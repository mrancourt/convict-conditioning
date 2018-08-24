import React, { Component } from 'react';
import {
  Button, ScrollView, Text, View,
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
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {Object.keys(dataStore['@muscleGroups']).map(muscleGroup => [
            <Button
              key={`nav-${muscleGroup}`}
              title={muscleGroup}
              onPress={() => navigation.navigate(ucFirst(muscleGroup))}
            />,
            <AnimatedBar
              key={`progress-${muscleGroup}`}
              style={{margin: 10}}
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
