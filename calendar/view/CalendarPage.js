import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Appbar, Menu, Card, FAB, Paragraph } from 'react-native-paper';
import { Calendar,CalendarList,Agenda } from 'react-native-calendars';

import firebase from "../../Firebase.js";
//import  Trip  from '../model/Trip.js';
//import moment from 'moment';
//import TripsController from '../TripsController.js';

export default class CalendarPage extends React.Component{
    state ={
        days: []
    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
       // let userId = user.uid;
       // let trip = this.props.trip;
    
      }
    
    render() {
        return(
            <View style={styles.container}>
            <Appbar.Header>
            <Appbar.BackAction onPress={() => this.props.navigation.navigate("home")} />
            <Appbar.Content title="Calendar" />
            </Appbar.Header>
            <CalendarList
                testID = 'Calendar Date' //integration test
                minDate={this.props.trip.startDate}
                maxDate={this.props.trip.endDate}
                current={this.props.trip.startDate}
                hideExtraDays={true}
                horizontal={true}
                pagingEnabled={true}
                pastScrollRange={0}
                futureScrollRange={(this.props.trip.endDate.getMonth()-this.props.trip.startDate.getMonth())}
                
                onDayPress={(day) => console.log('selected day', day)}//just outputs day info to console for now
                theme={{
                    textMonthFontSize: 20,
                    textMonthFontFamily: 'Arial',
                    textDayFontFamily: 'Arial',
                    calendarBackground:'aliceblue',
                }}
            />
            <Card>
                <Card.Title
                    title = "Daily Summary"

                />
            </Card>
            <ScrollView>
            <Card>
                <Card.Title
                    title = "Photos"
                    subtitle = "[# of photos]"
                    //left={(props) => <Avatar rounded reverse size="small" icon= "md-photos" onPress={() => console.log("This will bring you to all photos for this day!")}/>} 
                />
                <Card.Content>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
                        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
                    </View>
                </Card.Content>
            </Card>
            <Card>
                <Card.Title
                    title = "Journals"
                />
            </Card>
            <Card>
                <Card.Title
                    title = "Budget"
                />
            </Card>
            <Card>
                <Card.Title
                    title = "Attractions"
                />
            </Card>
            </ScrollView>
            </View>

         );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  });
