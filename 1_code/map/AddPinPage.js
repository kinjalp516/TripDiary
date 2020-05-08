// written by: Samuel Minkin, Gaurav Sethi, Yash Shah
// tested by: Samuel Minkin, Gaurav Sethi, Yash Shah
// debugged by: Samuel Minkin, Gaurav Sethi, Yash Shah

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';

import firebase from '../Firebase.js'; 
import { Pin } from './model/Pin';
import { fetchPhotos } from '../photos/model/Photo';

export function getDistance(c1, c2) {
    let R = 3958.8;
    let rlat1 = c1.latitude * (Math.PI/180);
    let rlat2 = c2.latitude * (Math.PI/180);
    let difflat = rlat2-rlat1;
    let difflon = (c1.longitude - c2.longitude) * (Math.PI/180);

    let d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
}

export default class AddPinPage extends React.Component {

    state = {
        userId: null,
        coords: null,
        title: null,
        description: null,
        photoUrl: null, 
        titleError: false,
        descriptionError: false,
        pins: [],
        photos: []
    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
        if (user != null) {
            this.setState({userId: user.uid});
            this.setState({coords: this.props.navigation.getParam('coords')});
            this.setState({pins: this.props.navigation.getParam('pins')});
            fetchPhotos(this.props.navigation.getParam('trip').id).then((photos) => this.setState({ photos }));
        }
    }

    getImage() {
        let photos = this.state.photos;
        for (let i = 0; i < photos.length; i++) {
            let coords = photos[i].location;
            let distance = getDistance(this.state.coords, coords);
            let photoUrl = photos[i].uri;
            if (distance < 5) {
                return photoUrl;
            } 
        }
        return null;
    }

    async submitPin() {
        let numErrors = 0;

        if (this.state.title === null) {
            this.setState({titleError: true});
            numErrors++;
        } else {
            this.setState({nameError: false});
        }

        if (this.state.description == null) {
            this.setState({descriptionError: true});
            numErrors++;
        } else {
            this.setState({descriptionError: false});
        }

        for (let i = 0; i < this.state.pins.length; i++) {
            let pinCoords = this.state.pins[i].coords;
            if (getDistance(pinCoords, this.state.coords) < 5) {
                this.props.navigation.goBack();
            }
        }

        let photoUrl = this.getImage();

        if (numErrors == 0 && this.state.userId != null) {
            let pin = new Pin({
                id: "",
                tripId: this.props.navigation.getParam('trip').id,
                userId: this.state.userId,
                coords: this.state.coords,
                title: this.state.title,
                description: this.state.description,
                photoUrl: photoUrl
            });

            await pin.storePin();

            this.props.navigation.goBack();
        }

        return numErrors;
    }

    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title="Add Pin" />
                </Appbar.Header>
                <TextInput
                    label='Title'
                    value={this.state.title}
                    style={styles.input}
                    error={this.state.titleError}
                    onChangeText={title => this.setState({ title })}
                />
                <TextInput
                    label='Description'
                    value={this.state.description}
                    style={styles.input}
                    error={this.state.descriptionError}
                    onChangeText={description => this.setState({ description })}
                />
                <Button mode="contained" onPress={() => this.submitPin()}>
                    Save Pin
                </Button>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        marginBottom: 24,
        marginLeft: 10,
        marginRight: 10
    }
});