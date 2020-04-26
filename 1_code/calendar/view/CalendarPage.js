import React from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import { Appbar, Menu, Card, FAB, Paragraph } from 'react-native-paper';
import { Calendar,CalendarList,Agenda, CalendarProvider, ExpendableCalendar } from 'react-native-calendars';
//import CalendarStrip from 'react-native-calendar-strip';



import Weather from '../Weather';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import firebase from "../../Firebase.js";
import { firestore } from 'firebase';
import { SafeAreaView } from 'react-navigation';
import { Journal } from '../../journal/model/Journal';
import { Photo } from '../../photos/model/Photo';
import CachedImage from '../../photos/CachedImage'


const API_KEY = "197e39b5b7deb39fe1e512c297a198d9";
var counter = 0;

export default class CalendarPage extends React.Component{

    state ={
        tripID : this.props.trip.id,
        startDay: this.props.trip.startDate,
        endDay: this.props.trip.endDate,
        selectedDay:{
         day: this.props.trip.startDate,
         selected: true
        },
        options : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        error: null,
        weatherCondition: null,
        temperature: 0,
        city: null,
        latitude: null,
        longitude: null,
        locationResult: null,
        photos: [],
        loading: false,
        journals: []
    }
    async getLocationAsync() {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== 'granted') {
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
        counter = 0;
        
        /*this.fetchJournals(this.props.trip.id).then((journals) => this.setState({journals}));


        this.fetchPhotos(day).then(
          (photos) => {
            this.setState({ photos: photos, loading: false })
          }
        ).catch(
          (error) => console.error("Fetching Photos Error", error)
        );*/
      }
    
    fetchWeather() {
      /* console.log(this.state.latitude);
       console.log(this.state.longitude);
       console.log(counter);*/
       
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
                 // console.log(json);
                  this.setState({
                    temperature: json.main.temp,
                    weatherCondition: json.weather[0].main,
                    city: json.name,
                    isLoading: false
                  });
              });
              
            
    }

      updateSelectedDay(day){
          let tempDate = new Date(day.year, (day.month-1), day.day);
          counter = 0;
          this.setState({selectedDay: {
              day: tempDate
          }});
         // let timeStampStart = toTimestamp(day.year,(day.month - 1), day.day, 0, 0, 0);
         // let timeStampEnd = toTimestamp(day.year, (day.month-1), day.day, 23,59,59);

          this.fetchJournals(this.props.trip.id).then((journals) => this.setState({journals}));


          this.fetchPhotos(day).then(
            (photos) => {
              this.setState({ photos: photos, loading: false })
            }
          ).catch(
            (error) => console.error("Fetching Photos Error", error)
          );
          
      }

       async fetchJournals(tripId) {
        let query = firebase.firestore().collection("journals")
        .where("tripId", "==", tripId);
        let result = await query.get(); // This returns a result of type QuerySnapshot
        return result.docs.map(
            (snapshot) => new Journal(snapshot.data(), true)   // Within each QuerySnapshot, there is an array of
                                                                // documents of type DocumentSnapshot. We are taking
                                                                // these json objects from DocumentSnapshot and assigning
                                                                // them to our Journals class so that we can use them easily
                                                                // in other components.
        );
    }
      async fetchPhotos(day){
          //timestamps for start and end of day
        let timeStampStart = toTimestamp(day.year,(day.month), day.day, 0, 0, 0);
        let timeStampEnd = toTimestamp(day.year, (day.month), day.day, 23,59,59);

      //  console.log("Date 1: ", timeStampStart);
       // console.log("Date2: ", timeStampEnd);
        //fetch photos  from database
        let query = firebase.firestore().collection("photos")
        .where('tripId','==', this.props.trip.id)
        .where('dateTaken', '>', timeStampStart)
        .where('dateTaken','<', timeStampEnd);

        let result = await query.get();
        return result.docs.map(
          (snapshot) => new Photo(snapshot.data())
      );  

      }
    
    render() {
        console.log(this.state.startDay);
        if(counter < 3){
            this.fetchWeather();
            counter++;
        }
       // console.log(this.state.weatherCondition);
       // console.log(this.state.temperature);

        return(
            <View style={styles.container}>
            <Appbar.Header>
            <Appbar.BackAction onPress={() => this.props.navigation.navigate("home")} />
            <Appbar.Content title="Calendar" />
            </Appbar.Header>
            <ScrollView>
            <CalendarList
                //recieves start and end date for calendar from trip object
                minDate={this.props.trip.startDate}
                maxDate={this.props.trip.endDate}
                current={this.props.trip.startDate}
                hideExtraDays={true}
                pagingEnabled={true}
                pastScrollRange={0}
                horizontal={true}
                //sets scroll range to selected months
                futureScrollRange={(this.props.trip.endDate.getMonth()-this.props.trip.startDate.getMonth())}
                markedDates={
                    {[this.state.selectedDay.day.toISOString().slice(0,10)]: { selected: true },
                    }}
                onDayPress={(day) => this.updateSelectedDay(day)}//just outputs day info to console for now
                theme={{
                    textMonthFontSize: 25,
                    textMonthFontFamily: 'Kailasa',
                    textDayFontFamily: 'Arial',
                    textMonthFontWeight: 'bold',
                    textSectionTitleColor: 'black',
                    textDayHeaderFontSize: 14, 
                    selectedDayBackgroundColor: 'red',
                    
                }}
                showScrollIndicator={true}
            />
            
             <Card style={styles.card}>
                <Card.Title
                    title = {"Today's Weather"}
                     />
            </Card>
                <Card style={styles.card}>
                <Weather  weather={this.state.weatherCondition} temperature={this.state.temperature} name={this.state.city} />
                </Card>
            
            <Card style={styles.card}>
                <Card.Title style={styles.cardText}
                    title = {this.state.selectedDay.day.toLocaleDateString("en-US", this.state.options)}

                />
            </Card>
            
            <Card style={styles.card, {backgroundColor: 'skyblue'}}>
                <Card.Title
                    title = "Photos"
                   // subtitle = "[# of photos]"
                    //left={(props) => <Avatar rounded reverse size="small" icon= "md-photos" onPress={() => console.log("This will bring you to all photos for this day!")}/>} 
                />
            </Card>
            {this.state.photos.map((item) => {
                return( 
                    console.log(item),
                    <View style={styles.photoComp}>
                        <CachedImage
                          style={styles.photo} 
                          source={{ uri: item.photoUrl }} 
                        />
                    </View>
                );
            })
            }
            <Card style={styles.card, {backgroundColor: 'deepskyblue'}}>
                <Card.Title
                    title = "Journals"
                />
            </Card>
            {this.state.journals.map((item) => {
                return(
                    <Card style={styles.card}>
                        <Card.Title title = {item.title} />
                        <Card.Content>
                            <View>
                                <Text>{item.note}</Text>
                            </View>
                        </Card.Content>
                    </Card>
                );})

            }
            <Card style ={styles.card, {backgroundColor: 'royalblue'}}>
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
      flex: 1,
      
    },
    card: {
        flex: 20,
        padding: 5,
        shadowOpacity: 20,
        shadowRadius: 5,
        marginHorizontal:10,
        marginVertical: 5
        
    },
    cardText:{
        fontSize: 20,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        padding: 5,
        alignContent: 'center'
    },
    photoComp: {
        padding: 10
      },
    photo: {
        width: 185,
        height: 150
      },
  });

  function toTimestamp(year,month,day,hour,minute,second){
    var datum = new Date(Date.UTC(year,month-1,day,hour,minute,second));
    return datum.getTime()/1000;
   }
