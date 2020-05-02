import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Appbar, Chip } from 'react-native-paper';
import {addSavedItems, getSavedItems, getDetails} from '../Model/Retrieve'
import { Card, Title, Paragraph, Button } from 'react-native-paper'
import {getSavedState} from '../Model/Retrieve';
import { StackNavigator } from 'react-navigation';
import InformationWindow from './InformationWindow';

export default class Attractions extends React.Component{

    constructor(props){
        super(props);
      
        this.state = { 
          attractions: [
          
          ],
          
          sortP: 0,

          sortR: 0
          
      };
    }
    componentDidMount(){
      this.setState({attractions: getSavedState()});
    }

    //change 'saved' field upon clicking 'save', send item to SavedAttractions
    saveItem = (item) => {
      if(item.saved == false && item.id != null){

        var dummyObj = this.state.attractions;

        dummyObj.map( (a) => {
          if(a.id === item.id){
            a.saved = true;
            a.buttonText = 'Saved';
            addSavedItems(item); 
            a.storeAttraction();
          }
        });

        this.setState({
          attractions: dummyObj,
      
        });

        
    } 

    return getSavedItems();
  }

  sortPrice = () => {
    var state = this.state.attractions;
    var filteredPrice = state.filter(a => a.price !== "N/A");
    var noPrice = state.filter(a => a.price == "N/A");
  if(this.state.sortP == 0){
    filteredPrice.sort(this.priceCompare);
    this.setState({sortP: 1});
  } else {
    filteredPrice.sort(this.revPriceCompare);  
    this.setState({sortP: 0});
  }
    noPrice.map(a => filteredPrice.push(a));
    this.setState({attractions: filteredPrice});
  }

  sortRating = () => {
    var state = this.state.attractions;
    if(this.state.sortR == 0){
      state.sort(this.ratingCompare);
      this.setState({sortR: 1});
    } else {
      state.sort(this.revRatingCompare);  
      this.setState({sortR: 0});
    }
    this.setState({attractions: state});
  }

  priceCompare = (a,b) => {
    var p1 = a.price;
    var p2 = b.price;
    let comparison = 0;
    if(p1>p2){
      comparison=1;
    } else if(p1 < p2){
      comparison=-1;
    } 
    return comparison;
  }
  revPriceCompare = (a,b) => {
    var p1 = a.price;
    var p2 = b.price;
    let comparison = 0;
    if(p1>p2){
      comparison=1;
    } else if(p1 < p2){
      comparison=-1;
    } 
    return -comparison;
  }
  ratingCompare = (a,b) => {
    var p1 = a.rating;
    var p2 = b.rating;
    let comparison = 0;
    if(p1>p2){
      comparison=1;
    } else if(p1 < p2){
      comparison=-1;
    } 
    return comparison;
  }
  revRatingCompare = (a,b) => {

    var p1 = a.rating;
    var p2 = b.rating;
    let comparison = 0;
    if(p1>p2){
      comparison=1;
    } else if(p1 < p2){
      comparison=-1;
    } 
    return -comparison;

  }

  convertToDollars = (price) =>{
    var temp; 
    switch(price) {
      case 1:
        temp = "$";
        break;
      case 2:
        temp = "$$"; 
        break;
      case 3:
        temp = "$$$";
        break;
      case 4:
        temp = "$$$$";
        break;
      case 5:
        temp = "$$$$$";
        break;
      default: temp="N/A";
  }
      return temp;
}

toInformationWindow = (item) => {

  console.log("Im Trying Here");
  this.props.navigation.navigate('Info', {Details: getDetails(item.id), name: item.name, price: item.price, rating: item.rating, address: item.address, id:item.id});

}

    render(){ 
        
        return(
          <View>
              <Appbar.Header>
                  <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                  <Appbar.Content title="Attractions" />
              </Appbar.Header>

              <Chip mode="flat" icon="cash-multiple" style={styles.chip} selectedColor='#3498db' onPress={this.sortPrice}>Price</Chip>
              <Chip mode="flat" icon="heart-box" style={styles.chip} selectedColor='#3498db' onPress={this.sortRating}>Rating</Chip>
              <FlatList 
              keyExtractor={(item) => item.id}
              style={styles.listContainer}
              vertical
              showsVerticalScrollIndicator={false}
              data={this.state.attractions}
                renderItem={ ({item}) => (
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Info', {Details: getDetails(item.id), name: item.name, price: item.price, rating: item.rating, address: item.address, id:item.id})}> 
                        <Card style={styles.cardContainer}>
                          <Card.Title title={item.name}/>
                          <Card.Content>
                            <Title>{item.rating}</Title>
                            <Paragraph>
                              Price: {this.convertToDollars(item.price)} | {' '} 
                              Open: {item.opening_hours.open_now.toString()} | {' '}
                              Address: {item.address}
                            
                            </Paragraph>
                          </Card.Content>

                          <Card.Actions>
                              <Button onPress={() => this.saveItem(item)}>{item.buttonText}</Button> 
                          </Card.Actions>
                        </Card>
                        
                    </TouchableOpacity>
                )}
    
              />

                <Text></Text>
          </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    cardContainer: {
      
      marginHorizontal: 20,
      marginTop: 50,
     
    },

    viewContainer: {

        backgroundColor: '#f4f4f4',
        flex: 1

     },
    
    listContainer: {

        marginHorizontal: 20,
        marginBottom: 50

    },

    text: {
      marginTop: 100
    
    },

    cardContainer: {
      marginHorizontal: 20,
      marginTop: 50,
    },
});