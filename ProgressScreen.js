import React, { Component } from 'react';
import {
  Text, ScrollView, View, AsyncStorage, Linking,
} from 'react-native';
import { Button } from 'native-base';
import AnimatedBar from 'react-native-animated-bar';
import PropTypes from 'prop-types';
import dataStore from './dataStore';
import { capitalize } from './utils';

const EXERCICES = [
  '@progress-pushups',
  '@progress-pullups',
  '@progress-legraises',
  '@progress-bridges',
  '@progress-handstands',
  '@progress-squats',
];

class ProgressScreen extends Component {
  constructor() {
    super();
    this.state = {
      progress: dataStore.progress,
    };
  }

  progressRatio = completed => (completed < 0 ? 0 : (completed + 1) / 30);

  loadAllProgress = (keys) => {
    try {
      AsyncStorage.multiGet(keys).then((result) => {
        if (result !== null) {
          const progress = {};
          result.forEach(item => progress[item[0].split('-')[1]] = parseInt(item[1], 10) || -1);
          this.setState({ progress });
        }
      });
    } catch (error) {
      console.error(`error while loading ${error}`);
    }
  };

  componentWillMount() {
    this.loadAllProgress(EXERCICES);
  }

  componentWillUpdate() {
    this.loadAllProgress(EXERCICES);
  }

  openUrl = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        console.log(`Can't handle url  ${url}`);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }


  render() {
    const { progress } = this.state;

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
            <Text style={{ fontWeight: 'bold' }} key={`nav-${muscleGroup}`}>
              {capitalize(muscleGroup)}
            </Text>,
            <AnimatedBar
              key={`progress-${muscleGroup}`}
              style={{
                marginTop: 10,
                marginRight: 20,
                marginBottom: 10,
                marginLeft: 20,
              }}
              progress={this.progressRatio(progress[muscleGroup])}
              height={35}
              barColor="#275DAD"
              fillColor="#CED3DC"
              borderWidth={0}
              animate={false}
            />,
          ])}
        </View>
      </ScrollView>
    );
  }
}

ProgressScreen.navigationOptions = {
  title: 'Your Progress',
};

ProgressScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProgressScreen;
