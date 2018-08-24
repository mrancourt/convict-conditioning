import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text, Card, CardItem, Body, Content, Left,
} from 'native-base';
import {
  CheckBox,
} from 'react-native';
import dataStore from './datastore';

class ExerciceList extends Component {
  constructor() {
    super();
    this.state = {
      progress: -1,
    };
  }

  onCheckBoxPress(pressed) {
    const { progress } = this.state;
    this.setState({ progress: progress >= pressed ? pressed - 1 : pressed });
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
        <Text style={{ marginLeft: 5 }} key={`step-text-${step}`}>
          {step}
        </Text>,
      );
    });
    return list;
  };

  render() {
    const { exercice } = this.props;
    const { '@muscleGroups': { [exercice]: { exercices = [] } } } = dataStore;

    return (
      <Content padder>
        {exercices.map(({ name, instructions, progression }, id) => [
          <Content key={`name-${name}`}>
            <Card style={{ flex: 0 }}>
              <CardItem bordered>
                <Left>
                  <Body>
                    <Text style={{ fontWeight: 'bold' }}>{name}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>{instructions}</Text>
                </Body>
              </CardItem>
              <CardItem>
                {this.renderProgression(progression, id)}
              </CardItem>
            </Card>
          </Content>,
        ])}
      </Content>
    );
  }
}

export default ExerciceList;

ExerciceList.propTypes = {
  exercice: PropTypes.string.isRequired,
};
