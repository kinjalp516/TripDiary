import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';

import firebase from "../../Firebase.js";
import  Trip  from '../model/Trip.js';

export default class AddJournalPage extends Component{
    
    componentDidMount() {
        let user = firebase.auth().currentUser;
        let userId = user.uid;
        let trip = this.props.trip;
    }

    constructor (props) {
        super(props);
        this.state = {
            title: '',
            note: ''
        }
        
        this.createNote = this.createNote.bind (this);
    }

    createNote = () => {

        const {title, note} = this.state;

        if (title === '' && note === '') {
            alert ('Please Add a Title and Entry');
            return;
        } else if (title === '') {
            alert ('Please Add a Title');
            return;
        } else if (note === '') {
            alert  ('Please add an Entry');
            return;
        }

        
        firebase.firestore().collection('notes').add ({
            title: title,
            note: note
        });

        this.setState ({
            title: '',
            note: ''
        })

        this.props.navigation.navigate('viewJournals');
        
    }

    backToJournal = () => {

        this.setState ({
            title: '',
            note: ''
        })
        this.props.navigation.navigate('viewJournals')
    }

    render() {

        return (
            
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress ={this.backToJournal} />
                    <Appbar.Content title="Add Journal Entry"/>
                    <Appbar.Action icon="check" onPress = {this.createNote} />
                </Appbar.Header>

                <TextInput
                    placeholder = 'Title'
                    onChangeText={(title) => this.setState({title})}
                    value={this.state.title}
                />
                
                <TextInput
                    placeholder = 'Journal Entry'
                    onChangeText={(text) => this.setState({note:text})}
                    value={this.state.note}
                    multiline = {true}
                    blurOnSubmit = {true}
                />

            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});