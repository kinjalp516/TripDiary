import React from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, View, Dimensions, ActivityIndicator, Alert, Image } from 'react-native';
import { Appbar, Menu, Card, FAB, Text } from 'react-native-paper';

import firebase from '../Firebase.js'; 
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { fetchPins, attrToPin } from './model/Pin';
import { fetchPhotos } from '../photos/model/Photo';
import { fetchAttractions } from '../attractions/Model/Retrieve';
import PinDetailView from './PinDetailView';

const API_KEY = 'AIzaSyAcCFMyoLheBKHhQ5Hj_murJb7tDP1QiPk';

export default class MapPage extends React.Component {

    state = {
        pins: [],
        photos: [],
        routes: [],
        mapRegion: null,
        initialRegion: null, 
        hasLocationPermissions: false, 
        locationResult: null,
        deleteMode: false,
        selectedMarker: null,
        numAutoPins: 0
    };

    componentDidMount() {
        this.getLocationAsync();

        // fetch attractions from the database
        fetchAttractions(this.props.trip.id).then((attr) => {
            let pins = attrToPin(attr);
            this.setState({numAutoPins: pins.length});
            this.setState({ pins });
            this.map.fitToElements(false);

            // fetch user pins from the database
            fetchPins(this.props.trip.id).then((userPins) => this.setState({ pins: this.state.pins.concat(userPins) }));

            this.props.navigation.addListener(
                'didFocus', () => {
                    fetchAttractions(this.props.trip.id).then((attr1) => {
                        let autoPins = attrToPin(attr1);
                        this.setState({numAutoPins: autoPins.length});
                        this.setState({pins: autoPins});
                        this.map.fitToElements(false);
                        
                        fetchPins(this.props.trip.id).then((userPins) => this.setState({ pins: this.state.pins.concat(userPins) }));
                        fetchPhotos(this.props.trip.id).then((photos) => this.setState({ photos }));
                    });
                }
            );
        });
    

        
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
                    let userPins = this.userPins.pins;
                    let coords = this.state.selectedMarker;
                    this.setState({userPins: userPins.filter((currVal, index) => {
                        let isPinToDelete = currVal.coords.latitude === coords.latitude && 
                            currVal.coords.longitude === coords.longitude;
                        if (isPinToDelete) firebase.firestore().collection("pins").doc(userPins[index].id).delete();
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
                            ref={ref => this.map = ref}
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
                                    onPress={(e) => {
                                        if (this.state.deleteMode) {
                                            this.setState({selectedMarker: e.nativeEvent.coordinate});
                                            this.doDelete();
                                        }
                                    }}
                                >
                                    <Callout tooltip>
                                        <PinDetailView pin={pin} />
                                    </Callout>
                                </Marker>
                            ))}
                            {this.state.pins.map((pin, index) => {
                                if (index < this.state.numAutoPins - 1 &&
                                    !((pin.coords.latitude == this.state.pins[index+1].coords.latitude) &&
                                        (pin.coords.longitude == this.state.pins[index+1].coords.longitude))) {
                                    return (
                                        <MapViewDirections
                                            key={pin.coords.latitude} 
                                            origin={pin.coords}
                                            destination={this.state.pins[index+1].coords}
                                            apikey={API_KEY}
                                            strokeWidth={4}
                                            strokeColor="hotpink"
                                        />
                                    );  
                                }
                            })
                            }
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
                            pins: this.state.userPins
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