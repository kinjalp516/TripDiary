import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Button } from 'react-native';
import { Appbar } from 'react-native-paper';
import CategoryCard from './CategoryCard';
import {getInformation, setSavedState} from '../Model/Retrieve';

import firebase from '../../Firebase.js'; 
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class Category extends React.Component{

  constructor(props){
    super(props);
    this.state= {categories: [
        {name: 'Restaurants', key: '1'},
        {name: 'Museums', key: '2'},
        {name: 'Parks', key: '3'},
        {name: 'Bars', key: '4'},
      ]};
  }

  componentDidMount(){

    console.log("dollars burning");
    console.log(this.props.trip);

    this.getLocation().then(loc => getInformation(loc, this.props.trip.id).then((item) => setSavedState(item)));

  //   getInformation().then((item) => {

  //     setSavedState(item);
      
  // })
  }

  async getLocation() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') return;

    let location = await Location.getCurrentPositionAsync({});
    return location;
  }

  pressHandler = () => {

    this.props.navigation.navigate('Items');
  }

  toSavedAttractions= () => {
    this.props.navigation.navigate('Saved', {tripId: this.props.trip.id});
  }

  render(){

    return (
      <View style={styles.viewContainer}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.navigate("home")} />
          <Appbar.Content title="Categories" />
        </Appbar.Header>
        <FlatList style={styles.listContainer}
          vertical
          showsVerticalScrollIndicator={false}
          data={this.state.categories}
          renderItem={ ({item}) => (
            <View>
              <TouchableOpacity
              onPress={this.pressHandler}
              >
                <CategoryCard 
                  title={item.name}
                /> 
              </TouchableOpacity>
            </View>
          )}

        />
        <Button title='Saved Items' onPress={this.toSavedAttractions}></Button>
        {/* <CategoryCard/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  cardContainer: {
   
    marginHorizontal: 20,
    
  },

  viewContainer: {
    backgroundColor: '#f4f4f4',
    flex: 1
  },

  listContainer: {

    marginHorizontal: 20,
    marginBottom: 50
  }

});
