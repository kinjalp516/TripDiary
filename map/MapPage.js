import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import { Appbar, Menu, Card, FAB, Text } from 'react-native-paper';

import firebase from '../Firebase.js'; 
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class MapPage extends React.Component {

    state = {
        pins: [], 
        mapRegion: null, 
        hasLocationPermissions: false, 
        locationResult: null
    };

    componentDidMount() {
        this.getLocationAsync();

        // fetch the pins from the database
    }

    async getLocationAsync() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') this.setState({locationResult: 'Permission to access location was denied'});
        else this.setState({hasLocationPermissions: true});

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ locationResult: JSON.stringify(location)});

        // center the map on the location that we just received
        this.setState({mapRegion: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }});
    }

    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate("home")} />
                    <Appbar.Content title="Map" />
                </Appbar.Header>
                {
                    this.state.locationResult === null ?
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" />
                    </View> :
                    this.state.hasLocationPermissions === false ?
                        <Text>Location permissions are not granted.</Text> :
                        this.state.mapRegion === null ?
                        <Text>Map region doesn't exist</Text> :
                        <MapView
                            style={styles.mapStyle}
                            region={this.state.mapRegion}
                        >
                            <Marker
                                coordinate={{latitude: this.state.mapRegion.latitude, longitude: this.state.mapRegion.longitude}}
                                title={'Home'}
                                description={'Me at home, self-quarantining'}
                            />
                        </MapView>
                }
                {
                    this.state.mapRegion === null ? null :
                        <FAB
                            style={styles.fab}
                            icon="plus"
                            label="Add Pin"
                            onPress={() => this.props.navigation.navigate("addPin")}
                        />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    fab: {
        position: 'absolute',
        margin: 25,
        right: 0,
        bottom: 0
    }
});