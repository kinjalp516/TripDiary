import React, {Component} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Keyboard, Text, Dimensions} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';

import firebase from '../../Firebase.js';
import {fetchPins} from "../../map/model/Pin"
import {Journal, updateJournal} from '../model/Journal.js';
import AutoTags from '../AutoComplete.js';
  
export default class AddJournalPage extends Component{
    
    constructor (props) {
        super(props);

        if(this.props.navigation != null){
            this.state = {
                dbId: this.props.navigation.getParam('itemId', 'NO-id'),
                tripId: this.props.navigation.getParam('tripId', 'NO-trip'),
                title: this.props.navigation.getParam('title', 'NO-title'),
                note: this.props.navigation.getParam('note', 'NO-note'),
                editJournal: this.props.navigation.getParam('editJournal', 'NO-note'),
                tagsSelected: this.props.navigation.getParam('locations', 'NO-location'),
                pinsObjects: []
            }
        
            this.createNote = this.createNote.bind (this);
        }
        else{
             this.state ={
                dbId: null,
                tripId: null,
                title: null,
                note: null,
                editJournal: null,
                tagsSelected: [],
                pinsObjects: []
             }
        }
    }

    handleDelete = index => {
        //tag deleted, remove from our tags array
        let tagsSelected = this.state.tagsSelected;
        tagsSelected.splice(index, 1);
        this.setState({ tagsSelected });
      }
    
    handleAddition = locations => {
        //suggestion clicked, push it to our tags array
        this.setState({ tagsSelected: this.state.tagsSelected.concat([locations]) });
    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
        if (user != null){
            this.setState({userId: user.uid});
        }

        //gets pins from map
        let tripId = this.props.navigation.getParam('tripId');
        fetchPins(tripId).then((pinsObjects) => this.setState({pinsObjects}));
    }

    async editNote (dbId, title, note, locations) {
        //editing the journal entry
        updateJournal(dbId, title, note);
        this.props.navigation.goBack(null);
    }

    async createNote (userId, tripId, title, note, locations) {
        
        if  (this.state.userId != null) {
            let journal = new Journal ({
                id: "",
                tripId: tripId,
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

    extractTitle = () => {
        var pins = this.state.pinsObjects.map(function(value){
            return {name: value.title}; 
        })

        return pins;
    }

    onCustomTagCreated = userInput => {
        //user pressed enter, create a new tag from their input
        const locations = {
          name: userInput,
        };
        this.handleAddition(locations);
      };

    render() {

        return (
            //will allow keyboard to be dismissed + multiline text to be inputted in entries

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={[ styles.container, this.props.style ]}>

                    <Appbar.Header>
                        <Appbar.BackAction onPress ={() => this.props.navigation.goBack()} />
                        <Appbar.Content title="Journal Entry"/>
                        <Appbar.Action icon="check" onPress = {() => {

                            const {dbId, tripId, userId, title, note} = this.state;

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
                            
                            if (this.state.editJournal) {
                                this.editNote(dbId, title, note, this.state.tagsSelected);
                            } else {
                                console.log(tagsSelected);
                                this.createNote(userId, tripId, title, note, this.state.tagsSelected);
                            }
                        }} />
                    </Appbar.Header>

                    <View style={styles.autocompleteContainer}>
                        <Text style={styles.label}>
                            Recipients
                        </Text>
                    
                        <AutoTags
                            suggestions={this.extractTitle()}
                            tagsSelected={this.state.tagsSelected}
                            placeholder="Add a Location Tag"
                            handleAddition={this.handleAddition}
                            handleDelete={this.handleDelete}
                            onCustomTagCreated={this.onCustomTagCreated}
                            //tagStyles = {styles.custom}
                        />
                    </View>
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
                    />
                
                </View>
            </TouchableWithoutFeedback>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    autocompleteContainer: {
        left: 0,
        right: 0,
        zIndex: 2        
    },
    test: {
        backgroundColor: 'white',
        width: 500,
        right: 0,
    }
});