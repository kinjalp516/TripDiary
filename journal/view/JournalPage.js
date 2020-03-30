import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {Appbar, FAB, Card} from 'react-native-paper';

import firebase from "../../Firebase.js";
import {fetchJournals, deleteJournal} from '../model/Journal.js';

class PressOptions extends React.Component {
    static defaultProps = {
      onPress: () => null,
      numberOfTouches: 1,
      delay: 500,
    }
  
    startPress = null;

    state = {
        isDeleted: false
    }
  
    onStartShouldSetResponder = (evt) => {
      if (evt.nativeEvent.touches.length === this.props.numberOfTouches) {
        this.startPress = Date.now();
        return true;
      }

      return false;
    }
  
    onResponderRelease = () => {
      const now = Date.now();
      //console.log (this.props.dbId);
      if (this.startPress && now - this.startPress < this.props.delay) {
        this.props.onPress();
      } else {
          Alert.alert (
              'Delete Note?',
              'Changes cannot be undone',
              [
                {text: 'Delete', onPress: () => {
                        deleteJournal(this.props.dbId);
                        this.setState({isDeleted: true});
                    }
                },
                {text: 'Cancel', onPress: () => null, style: 'cancel'},
              ]
          )
      }

      this.startPress = null;

    }
  
    render() {
      return (
        <View
          onStartShouldSetResponder = {this.onStartShouldSetResponder}
          onResponderRelease = {this.onResponderRelease}
        >
          {!this.state.isDeleted ? this.props.children : null}
        </View>
      );
    }
  }

export default class JournalPage extends Component{

    state = {
        journals: []
    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
        let userId = user.uid;

        //for initial load
        fetchJournals(userId).then((journals) => this.setState({journals}));

        this.props.navigation.addListener(
            'willFocus', 
            () => fetchJournals(userId).then((journals) => this.setState({journals}))
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('home')} />
                    <Appbar.Content title="Journal" />
                </Appbar.Header>
                <ScrollView>
                    {this.state.journals.map((item, index) => {
                        return (
                            <PressOptions 
                                dbId = {item.id}
                                onPress = {() => {
                                    this.props.navigation.navigate('addJournal', {
                                        itemId: item.id,
                                        title: item.title,
                                        note: item.note,
                                        editJournal: true
                                    })}}
                            >
                                <Card 
                                    key = {`journals-${index}`} 
                                    style = {styles.journalCard}
                                >

                                <Card.Title 
                                    title = {item.title}
                                    subtitle = {item.note}
                                />
                            </Card>
                        </PressOptions>);
                    })}
                </ScrollView>

                <FAB
                    style={styles.fab}
                    icon="plus"
                    label="Add Entry"
                    onPress={() => this.props.navigation.navigate('addJournal', {
                        title: '',
                        note: '',
                        editJournal: false
                    })}
                />

            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    journalCard: {
        marginTop: 24,
        marginLeft: 24,
        marginRight: 24,
        backgroundColor: '#A4D7DF',
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      }
});