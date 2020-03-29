import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';

import firebase from "../../Firebase.js";
import {Journal} from '../model/Journal.js';

export default class AddJournalPage extends Component{
    
    constructor (props) {
        super(props);
        this.state = {
            title: '',
            note: ''
        }
        
        this.createNote = this.createNote.bind (this);
    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
        this.setState({userId: user.uid});
    }

    async createNote () {

        const {title, note, userId} = this.state;

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

        if  (this.state.userId != null) {
            let journal = new Journal ({
                id: "",
                userId: userId,
                title: title,
                note: note
            });

            await journal.storeJournal();
        }
        
        this.setState ({
            title: '',
            note: ''
        })

        this.props.navigation.goBack(null);
        
    }

    backToJournal = () => {

        this.setState ({
            title: '',
            note: ''
        })
        this.props.navigation.goBack(null);
    }

    render() {

        return (
            
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress ={() => this.props.navigation.goBack()} />
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