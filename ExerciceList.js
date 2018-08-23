import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView, Text, View,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import dataStore from './datastore';

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

export default ExerciceList;

ExerciceList.propTypes = {
  exercice: PropTypes.string.isRequired,
};
