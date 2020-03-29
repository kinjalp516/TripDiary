import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import CategoryCard from './CategoryCard';
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

  pressHandler = () => {
    this.props.navigation.navigate('Items');
  }

  render(){

    return (
      <View style={styles.viewContainer}>
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
