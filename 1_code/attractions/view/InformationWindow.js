import React from 'react';
import { StyleSheet, View,FlatList, ActivityIndicator} from 'react-native';
import { Card, Paragraph, Title, Appbar } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
export default class InformationWindow extends React.Component{

   
    constructor(props){
        super(props);
    this.state = {
      place_id:"placeholder", 
      name: "placeholder", 
      rating: "placeholder", 
      price:"placeholder", 
      address:"placeholder", 
      loaded: false,
      Details:[{photos:{photo_reference: "None"}}]};
    
    }
    

     async componentDidMount(){    
      console.log("Mounting");  
       await this.props.navigation.getParam("Details").then(item => this.setState({Details: item}));
        this.setState({place_id: this.props.navigation.getParam("id")});
        this.setState({name: this.props.navigation.getParam("name")});
        this.setState({rating: this.props.navigation.getParam("rating")});
        this.setState({address: this.props.navigation.getParam("address")});
        this.setState({loaded: true});
        switch(this.props.navigation.getParam("price")) {
          case 1:
            this.setState({price:"$"});
            break;
          case 2:
              this.setState({price:"$$"});
            break;
          case 3:
              this.setState({price:"$$$"});
            break;
          case 4:
              this.setState({price:"$$$$"});
            break;
          case 5:
              this.setState({price:"$$$$$"});
            break;
          default: this.setState({price:"N/A"});  
        }
    }

    _renderItem = ({item, index}) => {
      return (
          <View>
              <Card>                        
                <Card.Content >  
                <Card.Cover source={{ uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1920&photoreference='+item.photo_reference+""+'&key=AIzaSyB4f8HruyOxAlhEP6-FK6vGoJ9Qu643M9w' }} />
                </Card.Content>                   
              </Card>
          </View>
      );
  }

   content = () => {

      return(

        <View>  

            <Appbar.Header>
                  <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                  <Appbar.Content title="Attractions" />
              </Appbar.Header>          
             <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.Details.photos}
              renderItem={this._renderItem}
              sliderWidth={400}
              itemWidth={400}
            /> 
        
            <Card>
                      <Card.Content>
                        <Title>{this.state.rating}/5</Title>
                        <Paragraph>
                          Price: {this.state.price} | {' '}        
                          Phone: {this.state.Details.number + ""} | {'\n'} 
                          Address: {this.state.address + ""} | {'\n'}
                          Website: {this.state.Details.website +"\n"}
                          Category: {this.state.Details.types + ""}
                        </Paragraph>
                      </Card.Content>
            </Card>   
            <FlatList     
              style={styles.listContainer}
              keyExtractor={(item) => item.author_name}
              vertical
              snapToAlignment={"start"}
              snapToInterval={230}
              decelerationRate={"fast"}
              showsVerticalScrollIndicator={false}
              data={this.state.Details.reviews}
              renderItem={({item}) => (
                  <Card style={styles.reviewContainer}>
                      <Card.Title title={item.relative_time_description} subtitle={item.rating + "/5"}/>
                      <Card.Content >  
                        <Title>{item.author_name}</Title>
                        <Paragraph>{item.text}</Paragraph>
                      </Card.Content>                      
                  </Card>
              )}
          />  
        </View>
      );
    }

    loading = () => {
      return(
        <View>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      );
    }

  

    render(){

      return (
        <View>
          {this.state.loaded ? this.content() : this.loading()}
        </View>
        );

    }

}

const styles = StyleSheet.create({
    container: {
      
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    cardContainer: {
      
      flex: 1,
      flexDirection: 'row',
      alignItems:"center",
      padding:0
     
    },

    reviewContainer: {
        marginTop: 0
    },

    viewContainer: {

        flex: 1,
        flexDirection: "column",
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',

     },
    
     listContainer: {
        height: 200,
        overflow:'hidden'

    },

    text: {
      marginTop: 100
    
    },

    
});