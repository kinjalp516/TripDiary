import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import {navigate, navigation} from 'react-navigation';
export default class HomeScreen extends React.Component{

  constructor(props){
    super(props);
    //hardcoded for now
    //pass in current trips
    //this.state = { name: null, key: null };
  this.tripArray = [{name: 'Cali', key: 1}, {name: 'Spain', key: 2}];
  }

    render(){

      return (
      <View style={styles.container}>
      <ScrollView>
      <Text style={styles.header}>Your Trips</Text>
      <Button title = 'Create Trip + ' onPress={() => {
                        this.props.navigation.navigate('CreateTrip');
                    }} />
      { this.tripArray.map((item) => {
        return(
          <View key ={item.key}>
            <Text style={styles.item}>{item.name}</Text>
          </View>
        )
      })}
      </ScrollView>

        </View>
      )

    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
