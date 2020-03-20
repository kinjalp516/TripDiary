import React from "react";
import { StyleSheet, View } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';

import { Trip } from '../model/Trip.js';

export default class CreateTripPage extends React.Component {
    
    state = {
        name: null, 
        location: null, 
        start: null, 
        end: null
    };

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
                        onChangeText={name => this.setState({ name })}
                    />
                    <TextInput
                        label='Location'
                        value={this.state.location}
                        style={styles.input}
                        onChangeText={location => this.setState({ location })}
                    />
                    <Button mode="contained">
                        Save
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
