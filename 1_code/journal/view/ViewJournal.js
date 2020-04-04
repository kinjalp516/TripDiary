import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Appbar} from 'react-native-paper';

import {deleteJournal} from '../model/Journal.js';

export default class ViewJournal extends Component {

    //deletes journal entry & navigates back to journal page
    delete = (itemId) => {
        deleteJournal(itemId);
        this.props.navigation.goBack();
    }

    render() {
        const title = this.props.navigation.getParam('title', 'NO-title'); 
        const note = this.props.navigation.getParam('note', 'NO-note'); 
        const id = this.props.navigation.getParam('itemId', 'NO-id');

        return (
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title={title} />
                    <Appbar.Action icon = "delete" onPress = {() => this.delete(id)} />
                </Appbar.Header>

            
                <Text style={styles.entryDetail}>{note}</Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    entryDetail: {
        marginTop: 24,
        marginLeft: 24,
        marginRight: 24,
        fontSize: 20
        
    }
});


