import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';

import firebase from "../../Firebase.js";

const AddJournalPage = ({navigation}) => {
    
    const [title, setTitle] = useState('');
    const [entry, setEntry] = useState('');

    return <View style={styles.container}>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.navigate('viewJournals')} />
            <Appbar.Content title="Add Journal Entry"/>
            <Appbar.Action icon="check" onPress = {() => {}} />
        </Appbar.Header>

        <TextInput
            placeholder = 'Title'
            value = {title}
            onChangeText = {titleVal => setTitle(titleVal)}
        />

        <TextInput
            placeholder = 'Journal Entry'
            value = {entry}
            onChangeText = {entryVal => setEntry(entryVal)}
            multiline = {true}
            blurOnSubmit = {true}
        />

    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default AddJournalPage;

