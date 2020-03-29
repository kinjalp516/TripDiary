import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';

import firebase from '../Firebase.js'; 
import { Pin } from './model/Pin';

export default class AddPinPage extends React.Component {

    state = {
        userId: null,
        tripdId: this.props.navigation.getParam('trip').id,
        coords: this.props.navigation.getParam('coords'),
        title: null,
        description: null,
        titleError: false,
        descriptionError: false,
        pins: this.props.navigation.getParam('pins')
    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
        this.setState({userId: user.uid});
    }

    async submitPin() {
        let numErrors = 0;

        if (this.state.title == null) {
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
            if (pinCoords.latitude == this.state.coords.latitude && pinCoords.longitude == this.state.coords.longitude) {
               this.props.navigation.goBack();
            }
        }

        if (numErrors == 0 && this.state.userId != null) {
            let pin = new Pin({
                id: "",
                tripId: this.state.tripdId,
                userId: this.state.userId,
                coords: this.state.coords,
                title: this.state.title,
                description: this.state.description
            });

            await pin.storePin();

            this.props.navigation.goBack();
        }

        // Display Error
 
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