import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper'
import {getSavedItems} from '../model/Retrieve'
//quick prototype still needs improvements
export default class SavedAttractions extends React.Component {

    constructor(props){
        super(props);

        this.state = { attractions: [
    
        ]};

    }

    componentDidMount(){

      this.setState({attractions: getSavedItems()});
      console.log(getSavedItems());
    }

    deleteHandler = (item) => {
      var currentStateArr = this.state.attractions;

      var filteredArr = currentStateArr.filter(a => a.id != item.id);

      this.setState({attractions: filteredArr});

    }

   
    render(){
        return(
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
                            {console.log(this.state.attractions)}
                            </Paragraph>
                          </Card.Content>

                          <Card.Actions>
                              <Button onPress={() => this.deleteHandler(item)}>Delete</Button> 
                          </Card.Actions>
                        </Card>
                        
                    </TouchableOpacity>
                       
                )}
            />
        );
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