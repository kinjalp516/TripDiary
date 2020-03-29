import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper'

//quick prototype still needs improvements
export default class SavedAttractions extends React.Component {

    constructor(props){
        super(props);

        this.state = { attractions: [
    
        ]};

    }
    componentDidMount(){
        var SavedItem = {
            name: this.props.navigation.getParam('name'), 
            rating:this.props.navigation.getParam('rating'), 
            price: this.props.navigation.getParam('price'), 
            opening_hours: this.props.navigation.getParam('opening_hours'),
            address: this.props.navigation.getParam('address'),
            id: this.props.navigation.getParam('id'),
        }

        var arr = this.state.attractions;
        arr.push(SavedItem);
        this.setState({attractions: arr});
        
    
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
                              <Button onPress={() => this.saveItem(item)}>Delete</Button> 
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