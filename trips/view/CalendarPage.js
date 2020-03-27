import React from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarList from 'react-native-calendars';

import firebase from "../../Firebase.js";
import { Trip } from '../model/Trip.js';

export default class CalendarPage extends React.Component{
    state ={
        trip: null,
        days: []
    }

  /*  dayHandler(){
        //route each Daily Summary page
    }*/
    render(){
        return(
            <View>
                  <CalendarList 
                     minDate = {'2020-03-27'}
                     maxDate = {'2020-03-30'}
                     horizontal = {true}
                     pagingEnabled = {true}
                     calendarWidth = {320}
                     // onPress = {this.dayHandler} 
                      />
            </View>
       

         );
    }
}