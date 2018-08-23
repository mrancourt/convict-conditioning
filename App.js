import React, { Component } from 'react';
import {Button, View, Text, ScrollView} from 'react-native';
import {CheckBox} from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import dataStore from './datastore';

const ucFirst = string => (
  string.charAt(0).toUpperCase() + string.slice(1)
);

class ProgressScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {Object.keys(dataStore["@muscleGroups"]).map((muscleGroup) => [
            <Text key={`progression-${muscleGroup}`}>{`${muscleGroup} => ${dataStore[`@progress-${muscleGroup}`]}`}</Text>,
            <Button key={`nav-${muscleGroup}`}
                    title={muscleGroup}
                    onPress={() => this.props.navigation.navigate(ucFirst(muscleGroup))}
            />,
            <View key={`progress-${muscleGroup}`} width={'70%'} style={{margin: 10}}>
              <View width={`${dataStore[`@progress-${muscleGroup}`]}%`} height={20} style={{backgroundColor: '#0c204a'}}/>
            </View>
          ])}
          />
        </View>
      </ScrollView>
    );
  }
}

class ExerciceList extends Component {
  constructor() {
    super();
    this.state = {
      progress: -1
    }
  }

  render() {
    let {progress} = this.state;
    const {'@muscleGroups' : { [this.props.exercice]: {exercices = []} } } = dataStore;
    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#ffffff" }}>
          <Text>Pushups Screen</Text>
          {exercices.map(({name, instructions}, id) => [
              <Text key={`name-${id}`}>{name}</Text>,
              <Text key={`instruction-${id}`}>{instructions}</Text>,
              <CheckBox
                key={`checkbox-${name}`}
                name={`checkbox-${name}`}
                checked={id <= progress}
                onPress={() => this.setState({progress: id <= progress ? id -1 : id})}
              />
            ]
          )}
        </View>
      </ScrollView>
    )
  }
}

class PushupsScreen extends Component {
  render() {
    return (
      <ExerciceList exercice={"pushups"}/>
    );
  }
}

class PullupsScreen extends Component {
  render() {
    return (
      <ExerciceList exercice={"pullups"}/>
    );
  }
}

class LegraiseScreen extends Component {
  render() {
    return (
      <ExerciceList exercice={"legraises"}/>
    );
  }
}

class SquatsScreen extends Component {
  render() {
    return (
      <ExerciceList exercice={"squats"}/>
    );
  }
}

class BridgesScreen extends Component {
  render() {
    return (
      <ExerciceList exercice={"bridges"}/>
    );
  }
}

class HandstandsScreen extends Component {
  render() {
    return (
      <ExerciceList exercice={"handstands"}/>
    );
  }
}

class Tab1 extends Component {
  render() {
    return (
      <Tab heading={"test"}/>
    )
  }
}


class Tab2 extends Component {
  render() {
    return (
      <Tab heading={"test"}/>
    )
  }
}


class Tab3 extends Component {
  render() {
    return (
      <Tab heading={"test"}/>
    )
  }
}


class Tab4 extends Component {
  render() {
    return (
      <Tab heading={"test"}/>
    )
  }
}


class Tab5 extends Component {
  render() {
    return (
      <Tab heading={"test"}>
        <Text>Test</Text>
      </Tab>
    )
  }
}

class NavScreen extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs/>
        <Tabs renderTabBar={() => <ScrollableTab/>}>
          <Tab heading="Tab1">
            <Tab1/>
          </Tab>
          <Tab heading="Tab2">
            <Tab2/>
          </Tab>
          <Tab heading="Tab3">
            <Tab3/>
          </Tab>
          <Tab heading="Tab4">
            <Tab4/>
          </Tab>
          <Tab heading="Tab5">
            <Tab5/>
          </Tab>
        </Tabs>
      </Container>
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
    Nav: {
      screen: NavScreen,
    },
  },
  {
    initialRouteName: 'Nav',
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}