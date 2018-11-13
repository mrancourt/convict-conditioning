import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Text, Card, CardItem, Body, Content, Left, Right, Button, Icon, Fab
} from 'native-base';
import {
  ImageBackground,
  AsyncStorage,
  CheckBox,
  StyleSheet,
  FlatList,
  Linking,
} from 'react-native';
// TODO: Optimize loading of datastore
import dataStore from './dataStore';

const NOT_STARTED = -1;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 500,
    width: null,
  },
  hidden: {
    height: 0,
  },
  thumbnail: {
    marginRight: 5,
    fontSize: 30,
    color: '#144b76',
    fontWeight: 'bold',
  },
});

class ExerciceList extends Component {
  constructor() {
    super();

    this.state = {
      progress: NOT_STARTED,
      openSteps: [],
    };
  }

  onStepPressed = (step) => {
    let { openSteps } = this.state;
    if (openSteps.includes(step)) {
      openSteps.splice(openSteps.indexOf(step), 1);
    } else {
      openSteps.push(step);
    }

    this.setState({ openSteps });
  };

  storeProgress = (key, stateAttribute, value) => {
    this.setState({ [stateAttribute]: value }, () => {
      try {
        AsyncStorage.setItem(key, value.toString());
        AsyncStorage.setItem(`${key}:timestamp`, moment().unix().toString());
        AsyncStorage.getItem(`${key}:timestamp`).then(value => {
          console.warn(moment(value, 'X').fromNow());
        })
      } catch (error) {
        console.error(`error while saving ${error}`);
      }
    });
  };

  loadProgress = (key, stateAttribute) => {
    try {
      AsyncStorage.getItem(key).then((value) => {
        if (value !== null) {
          this.setState({ [stateAttribute]: parseInt(value, 10) });
        }
      });
    } catch (error) {
      console.error(`error while loading ${error}`);
    }
  };

  componentWillMount() {
    const { exercice } = this.props;
    this.loadProgress(`@progress-${exercice}`, 'progress');
  }

  onCheckBoxPress(pressed) {
    const { exercice } = this.props;
    const { progress } = this.state;
    const newProgress = progress >= pressed ? pressed - 1 : pressed;
    this.storeProgress(`@progress-${exercice}`, 'progress', newProgress);
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

  renderProgression = (progression, id) => {
    const { progress } = this.state;
    const list = [];
    progression.forEach((step, _id) => {
      const stepId = id * progression.length + _id;
      list.push(
        <CheckBox
          key={`step-checkbox-${step}`}
          value={stepId <= progress}
          onChange={() => this.onCheckBoxPress(stepId)}
        />,
        <Text
          style={{ marginLeft: 5 }}
          key={`step-text-${step}`}
          onPress={() => this.onCheckBoxPress(stepId)}
        >
          {step}
        </Text>,
      );
    });
    return list;
  };

  keyExtractor = (item, index) => `${item.name}-${index}`;

  render() {
    const { exercice } = this.props;
    const { openSteps } = this.state;
    const { '@muscleGroups': { [exercice]: { exercices = [] } } } = dataStore;

    return (
      <Content padder>
        <FlatList
          data={exercices}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          renderItem={({ item, index }) => {
            const {
              name, image, instructions, progression, link,
            } = item;
            return (
              <Card>
                <CardItem bordered button onPress={() => this.onStepPressed(index)}>
                  <Left style={{ flex: 1 }}>
                    <Text style={styles.thumbnail}>{index + 1}</Text>
                    <Body>
                      <Text style={{ fontWeight: 'bold' }}>{name}</Text>
                    </Body>
                  </Left>
                  <Right style={{ flex: 0 }}>
                    <Button
                      iconRight
                      transparent
                      primary
                      onPress={() => this.onStepPressed(index)}
                    >
                      <Icon name="md-information-circle" />
                    </Button>
                  </Right>
                </CardItem>
                <CardItem button onPress={() => this.onStepPressed(index)}>
                  <Body>
                    <Text>{instructions}</Text>
                  </Body>
                </CardItem>
                <CardItem bordered cardBody>
                  <ImageBackground
                    source={image}
                    style={openSteps.includes(index) ? styles.image : styles.hidden}
                  >
                    {link && (
                      <Fab
                        style={{ backgroundColor: '#4fB0A6', bottom: 200 }}
                        onPress={() => { this.openUrl(`https://www.youtube.com/watch?v=${link}`); }}
                      >
                        <Icon name="ios-play" />
                      </Fab>
                    )}
                  </ImageBackground>
                </CardItem>
                <CardItem>
                  {this.renderProgression(progression, index)}
                </CardItem>
              </Card>
            );
          }}
        />
      </Content>
    );
  }
}

export default ExerciceList;

ExerciceList.propTypes = {
  exercice: PropTypes.string.isRequired,
};
