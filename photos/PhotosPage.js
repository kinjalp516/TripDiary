import React from 'react';
import { StyleSheet, View, Image, FlatList } from 'react-native';
import { Appbar, Menu, Card, FAB, Text } from 'react-native-paper';

import firebase from '../Firebase.js'; 
import { Photo, fetchPhotos } from './model/Photo.js';

export default class PhotosPage extends React.Component {

  state = {
    photos: [
    {
      id: 1,
      photoUrl: 'https://picsum.photos/698',
      tripId: 1,
      userId: 1,
      location: 'Hawaii',
      dateTaken: new Date(2020, 3, 23, 4, 50, 7, 12)
    },
    {
      id: 2,
      photoUrl: 'https://picsum.photos/699',
      tripId: 2,
      userId: 2,
      location: 'Hawaii',
      dateTaken: new Date(2020, 3, 23, 5, 50, 7, 12),
    },
    {
      id: 3,
      photoUrl: 'https://picsum.photos/700',
      tripId: 3,
      userId: 3,
      location: 'Hawaii',
      dateTaken: new Date(2020, 3, 23, 4, 49, 7, 12)
    },
    {
      id: 4,
      photoUrl: 'https://picsum.photos/701',
      tripId: 4,
      userId: 4,
      location: 'Hawaii',
      dateTaken: new Date(2020, 3, 23, 4, 50, 6, 12)
    },
    {
      id: 5,
      photoUrl: 'https://picsum.photos/702',
      tripId: 5,
      userId: 5,
      location: 'Hawaii',
      dateTaken: new Date(2020, 3, 23, 4, 50, 7, 14)
    },
    {
      id: 6,
      photoUrl: 'https://picsum.photos/703',
      tripId: 6,
      userId: 6,
      location: 'Hawaii',
      dateTaken: new Date(2020, 3, 23, 4, 50, 7, 8)
    },
    {
      id: 7,
      photoUrl: 'https://picsum.photos/704',
      tripId: 7,
      userId: 7,
      location: 'Hawaii',
      dateTaken: new Date(2020, 3, 23, 4, 51, 7, 14)
    },
    {
      id: 8,
      photoUrl: 'https://picsum.photos/705',
      tripId: 8,
      userId: 8,
      location: 'Hawaii',
      dateTaken: new Date(2020, 3, 23, 4, 46, 7, 14)
    },
    {
      id: 9,
      photoUrl: 'https://picsum.photos/706',
      tripId: 9,
      userId: 9,
      location: 'Hawaii',
      dateTaken: new Date(2020, 3, 23, 4, 32, 7, 14)
    },
    {
      id: 10,
      photoUrl: 'https://picsum.photos/707',
      tripId: 10,
      userId: 10,
      location: 'Hawaii',
      dateTaken: new Date(2020, 3, 23, 4, 50, 7, 45)
    },
    {
      id: 11,
      photoUrl: 'https://picsum.photos/708',
      tripId: 11,
      userId: 11,
      location: 'Hawaii',
      dateTaken: new Date(2020, 3, 23, 4, 50, 8, 14)
    },
    {
      id: 12,
      photoUrl: 'https://picsum.photos/709',
      tripId: 12,
      userId: 12,
      location: 'Hawaii',
      dateTaken: new Date(2020, 3, 23, 4, 50, 3, 14)
    }
  ]
  };

  sortByDate() {
    let arr = this.state.photos.slice();
    arr.sort((a, b) => {
      let dateOne = a.dateTaken, dateTwo = b.dateTaken;
      if (dateOne.getHours() != dateTwo.getHours()) return dateOne.getHours() - dateTwo.getHours();
      else if (dateOne.getMinutes() != dateTwo.getMinutes()) return dateOne.getMinutes() - dateTwo.getMinutes();
      else if (dateOne.getSeconds() != dateTwo.getSeconds()) return dateOne.getSeconds() - dateTwo.getSeconds();
      else if (dateOne.getMilliseconds() != dateOne.getMilliseconds()) dateOne.getMilliseconds() - dateTwo.getMilliseconds();
      return 1;
    });
    this.setState({photos: arr})
  }

  componentDidMount() {
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    let trip = this.props.trip;

    this.sortByDate();

    // use fetchPhotos to get all photos and store it in state
  }

  render() {

    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.navigate("home")} />
          <Appbar.Content title="Photos" />
          <Appbar.Action icon="cloud-upload" onPress={
            () => this.props.navigation.navigate("addPhotos")
          } />
        </Appbar.Header>
        <FlatList
          data={this.state.photos}
          renderItem={({item}) => {
              return (
                <View style={styles.photoComp}>
                  <Image style={styles.photo} source={{uri: item.photoUrl}} />
                </View>
              );
            }
          }
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  photo: {
    width: 195,
    height: 150
  },
  photoComp: {
    padding: 5
  },
});
