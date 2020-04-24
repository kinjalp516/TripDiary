import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import {addSavedItems, getSavedItems} from '../Model/Retrieve'
import { Card, Title, Paragraph, Button } from 'react-native-paper'
import {getSavedState} from '../Model/Retrieve';

export default class Attractions extends React.Component{

    constructor(props){
        super(props);

        this.state = { 
          attractions: [
          
          ]
          
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

    render(){ 
        
        return(
          <View>
              <Appbar.Header>
                  <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                  <Appbar.Content title="Attractions" />
              </Appbar.Header>
              <FlatList 
              keyExtractor={(item) => item.id}
              style={styles.listContainer}
              vertical
              showsVerticalScrollIndicator={false}
              data={this.state.attractions}
                renderItem={ ({item}) => (
                    <TouchableOpacity onPress={() => console.log(item.id)}>
                    
                        <Card style={styles.cardContainer}>
                          <Card.Title title={item.name}/>
                          <Card.Content>
                            <Title>{item.rating}</Title>
                            <Paragraph>
                              Price: {item.price} | {' '} 
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