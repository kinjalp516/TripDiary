import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper'


export default class CategoryCard extends React.Component{

    
    render() {
        return(
            <Card style={styles.cardContainer}>
            <Card.Title title={this.props.title}
              subtitle='Near Me'
            />
            
          </Card>
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
     
    }
});