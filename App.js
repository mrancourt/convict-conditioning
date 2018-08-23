import React, { Component } from 'react';
import {Button, View, Text, ScrollView, Image} from 'react-native';
// import {CheckBox} from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import { Container, Header, Tab, Tabs, ScrollableTab, ListItem, Card, CardItem, Body, Content, Left, Icon, Thumbnail, CheckBox } from 'native-base';
// import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
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

  constructor() {
    super()
    this.state = {
      checked: false
    }
  }

  render() {
    let {checked} = this.state;

    return (
      <View>
        <CheckBox checked={checked} onPress={() => this.setState({checked: !checked})}/>
        <Text>Tab 1 content</Text>

      </View>
    )
  }
}


class Tab2 extends Component {
  render() {
    return (
      <Content>
        <Card style={{flex: 0}}>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'https://via.placeholder.com/100x100'}} />
              <Body>
              <Text>NativeBase</Text>
              <Text note>April 15, 2016</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
            <Image source={{uri: 'https://via.placeholder.com/1200x800'}} style={{height: 100, width: 370, flex: 1}}/>
            <Text>
              //Your text here
            </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button title="button" transparent textStyle={{color: '#87838B'}}>
                <Icon name="logo-github" />
                <Text>1,926 stars</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </Content>
    )
  }
}


class Tab3 extends Component {
  render() {
    return (
      <View>
        <Text>Tab 3 content</Text>
      </View>
    )
  }
}


class Tab4 extends Component {
  render() {
    return (
      <View>
        <Text>Tab 4 content</Text>
      </View>
    )
  }
}


class Tab5 extends Component {
  render() {
    return (
      <View>
        <Text>Tab 5 content</Text>
      </View>
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