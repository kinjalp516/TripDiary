import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import {getSavedItems, setSavedItems, setSavedState, getSavedState, fetchAttractions} from '../Model/Retrieve';

//quick prototype still needs improvements
export default class SavedAttractions extends React.Component {

    constructor(props){
        super(props);

        this.state = { attractions: [
    
        ]};

    }

    //Load in saved items from retrieve model
    componentDidMount(){

      console.log('HERE:');
      console.log(this.props.navigation.getParam('tripId'));

      fetchAttractions(this.props.navigation.getParam('tripId')).then((attractions) => {
        this.setState({ attractions })
      });
      this.props.navigation.addListener('didFocus', () => {
        fetchAttractions(this.props.navigation.getParam('tripId')).then((attractions) => {
          this.setState({ attractions })
        });
      });
      
    }

    //Warn user item is being deleted
    alertHandler = (item) => {

      Alert.alert('Delete this item?', 'This action cannot be undone.', [
        {text: 'Cancel', onPress: () => console.log('Closed')},
        {text: 'Delete', onPress: () => this.deleteHandler(item)}
      
      ]);

    }

    //Filter pressed item, change saved and button text attributes in retrieve model to false and 'save'
    deleteHandler = (item) => {
      var currentItemsArr = this.state.attractions;

      var filteredArr = currentItemsArr.filter(a => a.id != item.id);

      var currentStateArr = getSavedState();

      currentStateArr.map((a) => {

        if(a.id === item.id){
          a.saved = false;
          a.buttonText = 'Save';
        }

      });

      this.setState({attractions: filteredArr});
      setSavedState(currentStateArr);
      setSavedItems(filteredArr);

    }

   
    render(){
        return(
          <View>
            <Appbar.Header>
              <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
              <Appbar.Content title="Saved Items" />
            </Appbar.Header>
            <FlatList 
              keyExtractor={(item) => item.id}
              style={styles.listContainer}
              vertical
              showsVerticalScrollIndicator={false}
              data={this.state.attractions}
                renderItem={ ({item}) => {
                  console.log("ATRACTION:");
                  console.log(item);
                  return (
                    <TouchableOpacity onLongPress={() => this.alertHandler(item)}>
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

                          {/* <Card.Actions>
                              <Button onPress={() => this.deleteHandler(item)}>Delete</Button> 
                          </Card.Actions> */}
                        </Card>
                        
                    </TouchableOpacity>
                       
                )}}
            />
          </View>
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