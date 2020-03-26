import React from 'react';
import { StyleSheet, View, Image, FlatList } from 'react-native';
import { Appbar, Menu, Card, FAB, Text } from 'react-native-paper';

import firebase from '../Firebase.js';
import { Photo, fetchPhotos } from './model/Photo.js';

export default class PhotosPage extends React.Component {

  state = {
    photos: []
  }

  componentDidMount() {
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    let trip = this.props.trip;


    // use fetchPhotos to get all photos and store it in state
  }



  render() {

    let DATA = [
      { uri: 'https://picsum.photos/698', id: '1' },
      { uri: 'https://picsum.photos/699', id: '2' },
      { uri: 'https://picsum.photos/700', id: '3' },
      { uri: 'https://picsum.photos/701', id: '4' },
      { uri: 'https://picsum.photos/702', id: '5' },
      { uri: 'https://picsum.photos/703', id: '6' }
    ];

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
          data={DATA}
          renderItem={({item}) => {
              return (
                <View style={styles.photoComp}>
                  <Image style={styles.photo} source={{uri: item.uri}} />
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
