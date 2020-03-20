import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Menu, Card, FAB } from 'react-native-paper';
import firebase from '../../Firebase.js';

import { Trip } from '../model/Trip.js';

export default class MyTripsPage extends React.Component{

  state = {
    showAppBarMenu: false,
    trips: [
      new Trip("Spring Break", "Miami, Florida", Date.now(), Date.now()),
      new Trip("Europe Trip", "Madrid, Spain", Date.now(), Date.now())
    ]
  }

  componentDidMount() {
    // TODO: Add Firestore logic here to fetch trips from user id
    let user = firebase.auth().currentUser;
    let userId = user.uid;
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="My Trips" />
          <Menu
            onDismiss={() => this.setState({showAppBarMenu: false})}
            visible={this.state.showAppBarMenu}
            anchor={
              <Appbar.Action
                  color="white"
                  icon="dots-vertical"
                  onPress={() => this.setState({showAppBarMenu: true})}
              />
            }
          >
              <Menu.Item icon="logout" title="Sign Out" onPress={() => firebase.auth().signOut()} />
          </Menu>
        </Appbar.Header>
        <ScrollView>
          { this.state.trips.map((item, index) => (
              <Card key={`trip-${index}`} style={styles.tripCard}>
                <Card.Title 
                  title={item.name}
                  subtitle={item.location}
                />
              </Card>
          )) }
        </ScrollView>
        <FAB
          style={styles.fab}
          icon="plus"
          label="Add Trip"
          onPress={() => this.props.navigation.navigate("create")}
        />
      </View>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    fab: {
      position: 'absolute',
      margin: 35,
      right: 0,
      bottom: 0,
    },
    tripCard: {
      marginTop: 24,
      marginLeft: 24,
      marginRight: 24,
      backgroundColor: 'pink',
    }
  });
