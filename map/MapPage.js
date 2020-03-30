import React from 'react';
import MapView, { Marker, Circle } from 'react-native-maps';
import { StyleSheet, View, Dimensions, ActivityIndicator, Alert, Image } from 'react-native';
import { Appbar, Menu, Card, FAB, Text } from 'react-native-paper';

import firebase from '../Firebase.js'; 
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { Pin, fetchPins } from './model/Pin';
import { fetchPhotos } from '../photos/model/Photo';

export default class MapPage extends React.Component {

    state = {
        pins: [], 
        photos: [],
        mapRegion: null,
        initialRegion: null, 
        hasLocationPermissions: false, 
        locationResult: null,
        deleteMode: false,
        selectedMarker: null
    };

    componentDidMount() {
        this.getLocationAsync();
    
        // fetch the pins from the database
        fetchPins(this.props.trip.id).then((pins) => this.setState({ pins }));
        this.props.navigation.addListener(
            'didFocus', () => {
                fetchPins(this.props.trip.id).then((pins) => this.setState({ pins }));
                fetchPhotos(this.props.trip.id).then((photos) => {
                    this.setState({ photos });
                    console.log("photos", photos);
                });
            }
        );
    }

    async getLocationAsync() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            this.setState({locationResult: 'Permission to access location was denied'});
            return;
        }
        else this.setState({hasLocationPermissions: true});

        let location = await Location.getCurrentPositionAsync({});
        let initialRegion = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        };
        this.setState({ initialRegion });
        this.setState({ locationResult: JSON.stringify(location) });

        // center the map on the location that we just received
        this.setState({mapRegion: initialRegion});
    }

    doDelete() {
        Alert.alert(
            'Delete Pin',
            'Would you like to delete this pin?',
            [
                {text: 'Yes', onPress: () => {
                    let pins = this.state.pins;
                    let coords = this.state.selectedMarker;
                    this.setState({pins: pins.filter((currVal, index) => {
                        let isPinToDelete = currVal.coords.latitude === coords.latitude && 
                            currVal.coords.longitude === coords.longitude;
                        if (isPinToDelete) firebase.firestore().collection("pins").doc(pins[index].id).delete();
                        return !isPinToDelete;
                    })});
                }},
                {text: 'Cancel'}
            ]
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate("home")} />
                    <Appbar.Content title={this.state.deleteMode ? "Delete Pins" : "Map"} />
                    <Appbar.Action icon="delete" onPress={
                        () => this.setState({deleteMode: !this.state.deleteMode})
                    } />
                </Appbar.Header>
                {
                    this.state.mapRegion === null ?
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" />
                        </View> :
                        <MapView
                            style={styles.mapStyle}
                            region={this.state.mapRegion}
                            onPress={(coords) => this.setState({ mapRegion: {
                                latitude: coords.nativeEvent.coordinate.latitude,
                                longitude: coords.nativeEvent.coordinate.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                            } })}
                        >
                            {this.state.pins.map((pin, index) => (
                                <Marker
                                    key={index}
                                    coordinate={pin.coords}
                                    title={pin.title}
                                    pinColor="green"
                                    description={pin.description}
                                    onPress={(e) => {
                                        if (this.state.deleteMode) {
                                            this.setState({selectedMarker: e.nativeEvent.coordinate});
                                            this.doDelete();
                                        }
                                    }}
                                >
                                    {pin.photoUrl === null ? null : <Image style={styles.photo} source={{uri: pin.photoUrl}} />}
                                </Marker>
                            ))}
                            {this.state.photos.map((photo, index) => (
                                <Marker
                                    key={index}
                                    coordinate={{latitude: photo.location.latitude, longitude: photo.location.longitude}}
                                    title="Photo"
                                    pinColor="blue"
                                    description="Picture taken at this location"
                                />
                            ))}
                        </MapView>
                }
                {
                    this.state.mapRegion === null ? null :
                    <FAB
                        style={styles.fab}
                        icon="plus"
                        label="Add Pin"
                        onPress={() => this.props.navigation.navigate("addPin", {
                            coords: {
                                latitude: this.state.mapRegion.latitude,
                                longitude: this.state.mapRegion.longitude
                            },
                            trip: this.props.trip,
                            pins: this.state.pins
                        })}
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
    },
    photo: {
        height: 35,
        width: 35
    }
});