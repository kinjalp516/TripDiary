import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Appbar, FAB, Card} from 'react-native-paper';
import {StackActions} from 'react-navigation';

import firebase from "../../Firebase.js";
import {fetchJournals} from '../model/Journal.js';

export default class JournalPage extends Component{

    state = {
        journals: []
    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
        let userId = user.uid;

        //for initial load
        fetchJournals(userId).then((journals) => this.setState({journals}));

        this.props.navigation.addListener(
            'willFocus', 
            () => fetchJournals(userId).then((journals) => this.setState({journals}))
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('home')} />
                    <Appbar.Content title="Journal" />
                </Appbar.Header>

                <ScrollView>
                    {this.state.journals.map((item, index) => {
                        return (
                            <Card 
                                key = {`journals-${index}`} 
                                style = {styles.journalCard}
                                onPress = {() => {
                                    this.props.navigation.navigate('viewJournal', {
                                        title: item.title,
                                        note: item.note,
                                        itemId: item.id
                                })}}
                            >

                            <Card.Title 
                                title = {item.title}
                                subtitle = {item.note}
                            />
                        </Card>);
                    })}
                </ScrollView>

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

    journalCard: {
        marginTop: 24,
        marginLeft: 24,
        marginRight: 24,
        backgroundColor: '#A4D7DF',
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      }
});