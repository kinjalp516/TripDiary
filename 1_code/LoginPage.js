import React from 'react';
import { View, Button, StyleSheet } from 'react-native'

import * as Google from 'expo-google-app-auth';
import firebase from './Firebase.js';

/*
LoginPage deals with the presentation and controller logic of allowing
a user to login to our application using their Google credentials. We 
employ google sign-in as opposed to a traditional username, password
form due to the fact that we are able to automatically fetch a user's
name, photo, and other verified details without explicitly needing to
store it.
 */
export default class LoginPage extends React.Component {
    async signIn() {
        const config = {
            iosClientId: "640672912982-sjkd3s2luptsfrcm8ss344el2igp11ei.apps.googleusercontent.com",
            androidClientId: "640672912982-e6d9dgbc2dja2pfpev2ogr34etsk6ois.apps.googleusercontent.com",
            iosStandaloneAppClientId: "640672912982-bpjtb8nbdt9jihjst4gebq9q30ai4p3b.apps.googleusercontent.com",
            androidStandaloneAppClientId: "640672912982-3ops35e5pkj4sgmgba79pvgdng4aomlk.apps.googleusercontent.com",
        };
        const { type, accessToken, idToken } = await Google.logInAsync(config);
        if (type === 'success') {
            const credential = 
                firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            
            firebase.auth().signInWithCredential(credential).catch(
                (error) => console.error("Error - signInWithCredential", error)
            );
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="Login with Google"
                    onPress={() => this.signIn()}
                />
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