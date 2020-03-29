import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Appbar, Menu, Card, FAB } from 'react-native-paper';
import { Calendar,CalendarList,Agenda } from 'react-native-calendars';

import firebase from "../../Firebase.js";
import  Trip  from '../model/Trip.js';

export default class CalendarPage extends React.Component{
    state ={
        days: []
    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
        let userId = user.uid;
        let trip = this.props.trip;
    
      }

  /*  dayHandler(){
        //route each Daily Summary page
    }*/
    render(){
        return(
            <View style={styles.container}>
            <Appbar.Header>
            <Appbar.BackAction onPress={() => this.props.navigation.navigate("home")} />
            <Appbar.Content title="Calendar" />
            </Appbar.Header>
            <CalendarList
                minDate={this.props.trip.startDate}
                maxDate={this.props.trip.endDate}
                current={this.props.trip.startDate}
                hideExtraDays={true}
                horizontal={true}
                pagingEnabled={true}
                pastScrollRange={0}
                futureScrollRange={(this.props.trip.endDate.getMonth()-this.props.trip.startDate.getMonth())}
                //onDayPress={dayHandler()}
                onDayPress={(day) => {console.log('selected day', day)}}//just outputs day info to console for now
                theme={{
                    textMonthFontSize: 20,
                    textMonthFontFamily: 'Arial',
                    textDayFontFamily: 'Arial',
                    calendarBackground:'aliceblue',
                }}
            />
            </View>
            
       

         );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });