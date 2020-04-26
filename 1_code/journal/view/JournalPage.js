
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { Card } from 'galio-framework';
//import { AppleHeader } from "@freakycoder/react-native-header-view";

import firebase from "../../Firebase.js";
import {fetchJournals, deleteJournal} from '../model/Journal.js';

class PressOptions extends React.Component {
    
    static defaultProps = {
      onPress: () => null,
      numberOfTouches: 1,
      delay: 500,
    }
  
    startPress = null;
  
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
        if (user != null){
            let tripId = this.props.trip.id

            //for initial load
            fetchJournals(tripId).then((journals) => this.setState({journals}));
    
            this.props.navigation.addListener(
                'willFocus', 
                () => fetchJournals(tripId).then((journals) => this.setState({journals}))
            );
        }
    }

    arrayToObjects (arr) {

        var locations = [];
        arr.forEach(function(entry) {
            var obj = {};
            obj.name = entry
            locations.push(obj);
        });

        return locations;
    }

    getDate () {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return(today);
    }

    getHeaderDate () {
        var now = new Date();
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        var day = days[ now.getDay() ];
        var month = months[ now.getMonth() ];

        return (day + ', ' + month + ' ' + now.getDate()).toLocaleUpperCase()
    }

    render() {
        let arr = this.state.journals;
        return (
            <View style={styles.container}>

                {/* {Platform.OS === 'ios' ? <AppleHeader
                    dateTitle= {this.getHeaderDate()}
                    largeTitle="Journal"
                    imageSource= {require('../pin.png')}
                    onPress={()=> this.props.navigation.navigate('home')}
                    borderColor='#D5D8D8'
                    backgroundColor='white'
                /> : <Appbar.Header>
                        <Appbar.BackAction onPress={() => this.props.navigation.navigate("home")} />
                        <Appbar.Content title="Journal" />
                    </Appbar.Header>
                } */}

                <ScrollView>
                    {arr.map((item) => {

                        return (
                            <PressOptions 
                                dbId = {item.id}
                                onPress = {() => {
                                    this.props.navigation.navigate('addJournal', {
                                        itemId: item.id,
                                        tripId: this.props.trip.id,
                                        title: item.title,
                                        note: item.note,
                                        locations: this.arrayToObjects(item.locations),
                                        editJournal: true
                                    })}}
                                onDelete={() => this.setState({journals: this.state.journals.filter((val, index) => {
                                    if (item.id === val.id) return false;
                                    return true;
                                })
                                })}
                            >
                                <Card 
                                    flex
                                    shadow
                                    style={styles.card, styles.margin}
                                    title={item.title}
                                    caption={this.getDate()}
                                    location={item.locations[0]}
                                    avatar={firebase.auth().currentUser.photoURL}
                                    imageStyle={styles.cardImageRadius}
                                    image={item.url[0]}
                                >
                            </Card>
                        </PressOptions>);
                    })}
                </ScrollView>

                <FAB
                    style={styles.fab}
                    small
                    icon="plus"
                    onPress={() => this.props.navigation.navigate('addJournal', {
                        title: '',
                        note: '',
                        editJournal: false,
                        tripId: this.props.trip.id,
                    })}
                />

            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        //backgroundColor: '#dce1e6'
    },
    margin: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: 'pink'
      }
});