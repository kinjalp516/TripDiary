
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Alert, Platform, Dimensions } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Card } from 'galio-framework';
import { AppleHeader } from "@freakycoder/react-native-header-view";
import {ContributionGraph} from "react-native-chart-kit";

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
        journals: [],
        journalsOrig: [],
        count: null
    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
        if (user != null){
            let tripId = this.props.trip.id

            //for initial load
            fetchJournals(tripId).then((journals) => this.setState({journals}));
            fetchJournals(tripId).then((journalsOrig) => this.setState({journalsOrig}));

            this.props.navigation.addListener(
                'willFocus', 
                () => fetchJournals(tripId).then((journals) => this.setState({journals})),
                () => fetchJournals(tripId).then((journalsOrig) => this.setState({journalsOrig}))
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

    getHeaderDate () {
        var now = new Date();
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        var day = days[ now.getDay() ];
        var month = months[ now.getMonth() ];

        return (day + ', ' + month + ' ' + now.getDate()).toLocaleUpperCase()
    }

    async getDateAmount (date) {

        var db = firebase.firestore().collection("journals").where("tripId", "==", this.props.trip.id).where("date", "==", date);
        let count = await db.get().then(snap => {
            return snap.size // will return the collection size
        });
        
        //console.log(size);
        return count;
    }

    getChartData () {
        let arr = this.state.journalsOrig;

        var data = arr.map((item) => {
            return {date: item.date, count: this.getCount(item.date)}; 
        })

        return data;
    }

    getCount (date) {

        var arr =  this.state.journalsOrig.filter(function(item) {
            return item.date == date;
        });

        return arr.length;
    }

    render() {

        //this.getDateAmount().then((count) => this.setState({count}));
        const commitsData2 = this.getChartData();
        //console.log(dateData);

        const chartConfig = {
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(57, 55, 121, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
          };

        const commitsData1 = [
            { count: 0, date: "2020-01-02"}
          ];

        const commitsData = commitsData1.concat(commitsData2)

          //console.log(commitsData);

        let arr = this.state.journals;
        
        return (
            <View style={styles.container}>

                

                <Appbar.Header>
                        <Appbar.BackAction onPress={() => this.props.navigation.navigate("home")} />
                        <Appbar.Content title="Journal" />
                        <Appbar.Action icon="plus" 
                            onPress={() => this.props.navigation.navigate('addJournal', {
                                title: '',
                                note: '',
                                editJournal: false,
                                tripId: this.props.trip.id,
                                })}
                        />
                    </Appbar.Header>

                

                <ContributionGraph
                    values={commitsData}
                    startDate={new Date(this.props.trip.startDate)}
                    numDays={100}
                    width={Dimensions.get("window").width}
                    height={220}
                    chartConfig={chartConfig}
                    onDayPress =  {(value) => {
                        var arr =  this.state.journalsOrig.filter(function(item) {
                            return item.date == value.date;
                        });

                        this.setState({journals: arr});
                        //console.log(arr);
                    }
                    }
                />

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
                                    borderless
                                    style={styles.card, styles.margin}
                                    title={item.title}
                                    caption={item.date}
                                    location={item.locations[0]}
                                    avatar={firebase.auth().currentUser.photoURL}
                                    imageStyle={styles.cardImageRadius}
                                    image={item.url[0]}
                                >
                            </Card>
                        </PressOptions>);
                    })}
                </ScrollView>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: 80,
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