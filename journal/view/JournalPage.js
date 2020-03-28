import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';
import firebase from "../../Firebase.js";

export default class JournalPage extends React.Component{

    constructor () {
        super();

        this.state = {
            entries: []
        }
    }

    componentDidMount() {
        //this.listenForChange();
    }

    fetchJournals(userId) {
        let query = firebase.firestore().collection("notes").where("userId", "==", userId);
        let result = query.get(); // This returns a result of type QuerySnapshot
        return result.docs.map(
            (snapshot) => new Trip(snapshot.data(), true)
        );
    }

    

    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('home')} />
                    <Appbar.Content title="Journal" />
                </Appbar.Header>

                <FAB
                    style={styles.fab}
                    icon="plus"
                    label="Add Entry"
                    onPress={() => this.props.navigation.navigate('addJournal')}
                />

            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      }
});