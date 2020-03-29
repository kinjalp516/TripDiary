import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Appbar} from 'react-native-paper';
import {StackActions} from 'react-navigation';

export default class ViewJournal extends Component {

    render() {
        const title = this.props.navigation.getParam('title', 'NO-title'); 
        const note = this.props.navigation.getParam('note', 'NO-note'); 

        return (
            <View style={styles.container}>
                <Appbar.Header>
                        <Appbar.BackAction onPress={() => this.props.navigation.navigate('viewJournals')} />
                        <Appbar.Content title = {title} />
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


