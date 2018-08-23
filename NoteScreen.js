import React, { Component } from 'react';
import {
  Container, Content, Form, Button, Textarea,
} from 'native-base';
import PropTypes from 'prop-types';
import {
  AsyncStorage,
  Text,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { capitalize } from './utils';

class NoteScreen extends Component {
  constructor(props) {
    super();
    let { navigation: { state: { params: { noteKey = '@note-default' } } } } = props;
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      note: '',
      noteKey,
    };
  }

  componentWillMount() {
    let { noteKey } = this.state;
    this.loadNote(noteKey);
  }

  componentWillUnmount() {
    let { noteKey } = this.state;
    this.saveNote(noteKey);
  }

  handleBackButtonClick = () => {
    let { navigation } = this.props;
    navigation.goBack(null);
  };

  saveNote = (key) => {
    const { note } = this.state;
    try {
      AsyncStorage.setItem(key, note);
    } catch (error) {
      console.error(`error while saving note ${error}`);
    }
  };

  loadNote = (key) => {
    try {
      AsyncStorage.getItem(key).then((value) => {
        if (value !== null) {
          this.setState({ note: value });
        }
      });
    } catch (error) {
      console.error(`error while loading note ${error}`);
    }
  };

  handleChange(name, value) {
    this.setState(() => ({ [name]: value }));
  }

  render() {
    let { note, noteKey } = this.state;
    return (
      <Container>
        <Content padder>
          <Form>
            <Text style={{ fontWeight: 'bold' }}>{capitalize(`${noteKey.split('-')[1]} notes`)}</Text>
            <Textarea
              rowSpan={10}
              bordered
              onChangeText={text => this.handleChange('note', text)}
              value={note}
              style={{
                marginBottom: 20,
                marginTop: 10,
                paddingTop: 15,
                borderRadius: 5,
              }}
            />
          </Form>
          <Button block primary onPress={this.handleBackButtonClick}>
            <Text>Save</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

NoteScreen.navigationOptions = {
  title: 'Notes',
  headerStyle: {
    backgroundColor: '#275DAD',
  },
  headerTintColor: '#fff',
};

NoteScreen.defaultProps = {
  noteKey: '@note',
};

NoteScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  noteKey: PropTypes.string,
};

export default withNavigation(NoteScreen);
