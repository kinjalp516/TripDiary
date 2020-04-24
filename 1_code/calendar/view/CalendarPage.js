import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Appbar, Menu, Card, FAB, Paragraph } from 'react-native-paper';
import { Calendar,CalendarList,Agenda } from 'react-native-calendars';
import ReactWeather from 'react-open-weather';
//Optional include of the default css styles
//import 'react-open-weather/lib/css/ReactWeather.css';

import Weather from '../Weather';
import weatherCondition from '../weatherConditions';
import getLocationAsync from '../../map/MapPage';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import firebase from "../../Firebase.js";
import MapPage from '../../map/MapPage';
const API_KEY = "197e39b5b7deb39fe1e512c297a198d9";
var counter = 0;

export default class CalendarPage extends React.Component{

    state ={
        days: [],
        startDay: this.props.trip.startDate,
        endDay: this.props.trip.endDate,
        selectedDay: this.props.trip.startDate,
        options : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        error: null,
        weatherCondition: null,
        temperature: 0,
        latitude: null,
        longitude: null,
        locationResult: null,
        hasLocationPermissions: null
    }
    async getLocationAsync() {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== 'granted') {
          //console.log("error");
          this.setState({locationResult: 'Permission to access location was denied'});
          return;
      }
      else this.setState({hasLocationPermissions: true});

      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
      this.setState({ locationResult: JSON.stringify(location) });
  }

    componentDidMount() {
        let user = firebase.auth().currentUser;
        this.getLocationAsync();
        //this.fetchWeather();
        

      }
    
    fetchWeather() {
       console.log(this.state.latitude);
       console.log(this.state.longitude);
       console.log(counter);
       
    let lat = this.state.latitude;
    let lon = this.state.longitude;
    
        
            if(this.state.latitude == null || this.state.longitude == null){
                return;
            }
            fetch(
                `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=imperial`
              )
                .then(res => res.json())
                .then(json => {
                  console.log(json);
                  //const jsonWeather = json[1];
                  //const jsonMain = json[4];
                  this.setState({
                    temperature: json.main.temp,
                    weatherCondition: json.weather[0].main,
                    isLoading: false
                  });
              });
              
            
    }

      updateSelectedDay(day){
          let tempDate = new Date(day.year, (day.month-1), day.day);
          counter = 0;
         this.setState({selectedDay: tempDate});
      }
    
    render() {
        if(counter < 3){
            this.fetchWeather();
            counter++;
        }
        console.log(this.state.weatherCondition);
        console.log(this.state.temperature);

        return(
            <View style={styles.container}>
            <Appbar.Header>
            <Appbar.BackAction onPress={() => this.props.navigation.navigate("home")} />
            <Appbar.Content title="Calendar" />
            </Appbar.Header>
            <ScrollView>
            <CalendarList
                testID = 'Calendar Date' //integration test
                //recieves start and end date for calendar from trip object
                minDate={this.props.trip.startDate}
                maxDate={this.props.trip.endDate}
                current={this.props.trip.startDate}
                hideExtraDays={true}
                horizontal={true}
                pagingEnabled={true}
                pastScrollRange={0}
                //sets scroll range to selected months
                futureScrollRange={(this.props.trip.endDate.getMonth()-this.props.trip.startDate.getMonth())}
                
                onDayPress={(day) => this.updateSelectedDay(day)}//just outputs day info to console for now
                theme={{
                    textMonthFontSize: 20,
                    textMonthFontFamily: 'Arial',
                    textDayFontFamily: 'Arial',
                    calendarBackground:'aliceblue',
                }}
                showScrollIndicator={true}
            />
             <Card>
                <Card.Title
                    title = {"Today's Weather"}

                />
            </Card>
            
                <Weather  weather={this.state.weatherCondition} temperature={this.state.temperature} />
            
            <Card>
                <Card.Title
                    title = {this.state.selectedDay.toLocaleDateString("en-US", this.state.options)}

                />
            </Card>
            
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
