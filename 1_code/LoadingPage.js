import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from './Firebase.js';

/*
LoadingPage is the first page loaded at the start of our application.
It is responsible for any initialization and checking for an existing
logged in user to determine if user should be directed to the Login Page
or directly to My Trips Page.
 */

export default class LoadingPage extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'trips' : 'login')
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});