import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCVmVSCvYnzgPi53eo4992qHoivH1qrrWo",
  authDomain: "trip-diary-696f8.firebaseapp.com",
  databaseURL: "https://trip-diary-696f8.firebaseio.com",
  projectId: "trip-diary-696f8",
  storageBucket: "trip-diary-696f8.appspot.com",
  messagingSenderId: "640672912982",
  appId: "1:640672912982:web:52eb070764d04128900df7",
  measurementId: "G-2F6C1GQ2EL"
};

export default class App extends React.Component {

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);  
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Trip Diary</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
