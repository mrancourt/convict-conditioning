import React, { Component } from 'react';
import {
  Button, ScrollView, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
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

export default ProgressScreen;

ProgressScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
