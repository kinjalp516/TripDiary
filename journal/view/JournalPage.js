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

    // state = {
    //     isDeleted: false
    // }
  
    onStartShouldSetResponder = (evt) => {
      if (evt.nativeEvent.touches.length === this.props.numberOfTouches) {
        this.startPress = Date.now();
        return true;
      }

      return false;
    }
  
    onResponderRelease = () => {
      const now = Date.now();
      
      if (this.startPress && now - this.startPress < this.props.delay) {
        this.props.onPress();
      } else {
          Alert.alert (
              'Delete Note?',
              'Changes cannot be undone',
              [
                {text: 'Delete', onPress: () => {
                        deleteJournal(this.props.dbId);
                        this.props.onDelete();
                    }
                },
                {text: 'Cancel', onPress: () => null, style: 'cancel'},
              ]
          )
      }

      this.startPress = null;

    }
  
    render() {
        //console.log(this.state.isDeleted);
        return (
            <View
                onStartShouldSetResponder = {this.onStartShouldSetResponder}
                onResponderRelease = {this.onResponderRelease}
            >
                {this.props.children}
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
        console.log("do i get here after returning???");

        this.props.navigation.addListener(
            'willFocus', 
            () => fetchJournals(userId).then((journals) => this.setState({journals}))
        );
    }

    render() {
        let arr = this.state.journals;
        return (
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('home')} />
                    <Appbar.Content title="Journal" />
                </Appbar.Header>
                <ScrollView>
                    {arr.map((item, index) => {
                        console.log(item);
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
                                onDelete={() => this.setState({journals: this.state.journals.filter((val, index) => {
                                    if (item.id === val.id) return false;
                                    return true;
                                })
                                })}
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