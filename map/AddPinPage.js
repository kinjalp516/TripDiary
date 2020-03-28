import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Appbar, Menu, Card, FAB, Text } from 'react-native-paper';

import firebase from '../Firebase.js'; 

export default class AddPinPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header>
                <Appbar.BackAction onPress={() => this.props.navigation.navigate("home")} />
                <Appbar.Content title="Add Pin" />
                </Appbar.Header>
                <Text>TODO: Add pin page</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});