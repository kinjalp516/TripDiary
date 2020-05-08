// written by: Yash Shah
// tested by: Yash Shah
// debugged by: Yash Shah

import React from "react";
import { StyleSheet, View, Platform, ScrollView } from 'react-native';
import { Appbar, TextInput, Subheading, Button, Divider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import firebase from "../../Firebase.js";
import { Trip } from '../model/Trip.js';

export default class CreateTripPage extends React.Component {
    
    state = {
        userId: null,
        name: null, 
        location: null, 
        start: undefined, 
        end: undefined,
        nameError: false,
        locationError: false,
        showStart: false,
        showEnd: false
    };

    now = new Date(Date.now());

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
                startDate: this.state.start?.valueOf() ?? this.now.valueOf(),
                endDate: this.state.end?.valueOf() ?? this.now.valueOf()
            });

            await trip.storeTrip();
            console.log("trip stored", trip.id);
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
                    <ScrollView>
                    <Divider />
                    {this.state.showStart && !this.state.showEnd && (
                        <DateTimePicker
                            value={this.state.start ?? this.now}
                            mode="date"
                            minimumDate={this.now}
                            testID = 'Date start test'  //for integration testing
                            onChange={(event, selectedDate) => {
                                this.setState({ showStart: Platform.OS === 'ios'}); 
                                this.setState({ start: new Date(selectedDate) });
                            }}
                        />
                    )}
                    {!this.state.showEnd && (    
                        <Button 
                            mode={this.state.showStart ? "contained" : "outlined"} 
                            style={{marginBottom: 20}}
                            onPress={() => {
                                if(this.state.showStart) {
                                    if(!this.state.start) {
                                        this.setState({ showStart: false, start: this.now })
                                    } else {
                                        this.setState({ showStart: false });
                                    }
                                } else {
                                    this.setState({ showStart: true });
                                }
                            }} 
                        >
                            {this.state.showStart ? "Save Start Date" : this.state.start ? "START: " + moment(this.state.start).format('MMMM Do, YYYY') : "Select Start Date"}
                        </Button>
                    )}
                    <Divider />
                    {this.state.showEnd && !this.state.showStart && (
                        <DateTimePicker
                            value={this.state.end ?? this.now}
                            mode="date"
                            minimumDate={this.state.start ?? this.now}
                            testId = 'Date end test' //for integration testing
                            onChange={(event, selectedDate) => {
                                this.setState({ showEnd: Platform.OS === 'ios'});
                                this.setState({ end: new Date(selectedDate) });
                            }}
                        />
                    )}
                    {!this.state.showStart && (
                        <Button 
                            mode={this.state.showEnd ? "contained" : "outlined"} 
                            style={{marginBottom: 20}}
                            onPress={() => {
                                if(this.state.showEnd) {
                                    if(!this.state.end) {
                                        this.setState({ showEnd: false, end: this.state.start ?? this.now })
                                    } else {
                                        this.setState({ showEnd: false });
                                    }
                                } else {
                                    this.setState({ showEnd: true });
                                }
                            }} 
                        >
                            {this.state.showEnd ? "Save End Date" : this.state.end ? "END: " + moment(this.state.end).format('MMMM Do, YYYY') : "Select End Date"}
                        </Button>
                    )}
                    <Divider />
                    <Button mode="contained" disabled={this.state.showStart || this.state.showEnd} onPress={() => this.submitTrip()}>
                        Save Trip
                    </Button>
                    </ScrollView>
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
