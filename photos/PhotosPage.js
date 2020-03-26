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
    }
  ]
  };

  componentDidMount() {
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    let trip = this.props.trip;

    this.sortByDate();

    // use fetchPhotos to get all photos and store it in state
  }

  /**
   * Sorts the array of photos by date before displaying them. Each photo was taken on the same day
   * so we sort by hours, minutes, seconds, and then milliseconds.
   */
  sortByDate() {
    let arr = this.state.photos.slice();
    arr.sort((a, b) => {
      let dateOne = a.dateTaken, dateTwo = b.dateTaken;
      if (dateOne.getHours() != dateTwo.getHours()) return dateOne.getHours() - dateTwo.getHours();
      else if (dateOne.getMinutes() != dateTwo.getMinutes()) return dateOne.getMinutes() - dateTwo.getMinutes();
      else if (dateOne.getSeconds() != dateTwo.getSeconds()) return dateOne.getSeconds() - dateTwo.getSeconds();
      return dateOne.getMilliseconds() - dateTwo.getMilliseconds();
    });
    this.setState({photos: arr})
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
              console.log(item.photoUrl);
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoComp: {
    width: 150,
    height: 100,
    marginTop: 24,
    marginLeft: 30,
    marginRight: 24
  }
});
