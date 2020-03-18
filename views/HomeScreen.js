import React, {useState} from "react";
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
//import { createStackNavigator } from '@react-navigation/stack';
//import { NavigationContainer } from '@react-navigation/native';

export default function HomeScreen({navigation}) {

    const pressHandler = () => {
        navigation.navigate('CreateTrip');
    }
    //these are hardcoded for now 
    //ideally input array of current trips
    const [trip, setTrip] = useState([
      { name: 'Spain', key: 1 },
      { name: 'Greece', key: 2 },
      { name: 'Beach Vacation', key: 3},
      { name: 'California', key: 4},
      { name: 'Thailand', key: 5},
      { name: 'Spring Break', key: 6 },
    ])
  
    return (
      <View style={styles.container}>
      <ScrollView>
      <Text style={styles.header}>Your Trips</Text>
      <Button title = 'Create Trip + ' onPress={pressHandler} />
      { trip.map((item) => {
        return(
          <View key ={item.key}>
            <Text style={styles.item}>{item.name}</Text>
          </View>
        )
      })}
      </ScrollView>
      
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
     // paddingTop: 40,
     // paddingHorizontal: 20
      //alignItems: 'center',
     // justifyContent: 'center',
    },
    item: {
      marginTop: 24,
      marginBottom: 24,
      padding: 30,
      backgroundColor: 'pink',
      fontSize: 24,
    },
    header: {

      marginBottom: 24,
      padding: 30,
      backgroundColor: 'purple',
      fontSize: 30,
      fontStyle: 'italic',
      fontWeight: 'bold',
      color: '#fff',
      alignItems: 'center',

    }
  
  });