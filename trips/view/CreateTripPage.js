import React from "react";
import { StyleSheet, View } from 'react-native';
import { Appbar, TextInput, Subheading, Button, Divider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import firebase from "../../Firebase.js";
import { Trip } from '../model/Trip.js';

export default class CreateTripPage extends React.Component {
    
    state = {
        userId: null,
        name: null, 
        location: null, 
        start: new Date(Date.now()), 
        end: new Date(Date.now()),
        nameError: false,
        locationError: false,
    };

    componentDidMount() {
        let user = firebase.auth().currentUser;
        this.setState({userId: user.uid});
    }

    async submitTrip() {
        let numErrors = 0;

        if(this.state.name == null) {
            this.setState({nameError: true});
            numErrors++;
        } else {
            this.setState({nameError: false});
        }

        if(this.state.location == null) {
            this.setState({locationError: true});
            numErrors++;
        } else {
            this.setState({locationError: false});
        }

        if(numErrors == 0 && this.state.userId != null) {
            let trip = new Trip({
                id: "",
                name: this.state.name,
                userId: this.state.userId,
                location: this.state.location,
                startDate: this.state.start || new Date(Date.now()),
                endDate: this.state.end || new Date(Date.now())
            });

            await trip.storeTrip();
            
            this.props.navigation.navigate("home");
        }
    }

    render() {
        return (
            <React.Fragment>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate("home")} />
                    <Appbar.Content title="Create New Trip" />
                </Appbar.Header>
                <View style={styles.container}>
                    <TextInput
                        label='Trip Name'
                        value={this.state.name}
                        style={styles.input}
                        error={this.state.nameError}
                        onChangeText={name => this.setState({ name })}
                    />
                    <TextInput
                        label='Location'
                        value={this.state.location}
                        style={styles.input}
                        error={this.state.locationError}
                        onChangeText={location => this.setState({ location })}
                    />
                    <Subheading>Select Start Date</Subheading>
                    <Divider />
                    <DateTimePicker
                        value={this.state.start}
                        mode="date"
                        minimumDate={Date.now()}
                        onChange={(event, selectedDate) => this.setState({ start: new Date(selectedDate) })}
                    />
                    <Subheading>Select End Date</Subheading>
                    <Divider />
                    <DateTimePicker
                        value={this.state.end}
                        mode="date"
                        minimumDate={this.state.start}
                        onChange={(event, selectedDate) => this.setState({ end: new Date(selectedDate) })}
                    />
                    <Button mode="contained" onPress={() => this.submitTrip()}>
                        Save Trip
                    </Button>
                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    input: {
        marginBottom: 24
    }
});
