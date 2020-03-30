import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import {addSavedItems} from '../model/Retrieve'
import { Card, Title, Paragraph, Button } from 'react-native-paper'


export default class Attractions extends React.Component{

    constructor(props){
        super(props);

        this.state = { 
          attractions: [
          
          ]
          
      };
    }

// 
    componentDidMount(){

      this.setState({attractions: this.props.navigation.getParam('attractions')});
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
          }
        });

        this.setState({
          attractions: dummyObj,
      
        });

        
    } 
  }


    render(){ 
        
        return(
          <View>
               
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