import React from 'react';
import { StyleSheet, View, Image, FlatList } from 'react-native';
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
                <Text>Map View!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});