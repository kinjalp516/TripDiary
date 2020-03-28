import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Appbar, Menu, Card, FAB, Text } from 'react-native-paper';

import firebase from '../Firebase.js'; 

export default class MapPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header>
                <Appbar.BackAction onPress={() => this.props.navigation.navigate("home")} />
                <Appbar.Content title="Map" />
                </Appbar.Header>
                <MapView style={styles.mapStyle} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});