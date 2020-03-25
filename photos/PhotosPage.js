import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Menu, Card, FAB } from 'react-native-paper';

import firebase from '../Firebase.js';

export default class PhotosPage extends React.Component{

  state = {
  }

  componentDidMount() {
    let user = firebase.auth().currentUser;
    let userId = user.uid;
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Photos" />
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
