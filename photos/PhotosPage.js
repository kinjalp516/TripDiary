import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Menu, Card, FAB } from 'react-native-paper';

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
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.navigate("home")} />
          <Appbar.Content title="Photos" />
          <Appbar.Action icon="cloud-upload" onPress={
            () => this.props.navigation.navigate("addPhotos")
          } />
        </Appbar.Header>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
