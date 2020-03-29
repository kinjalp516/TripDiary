import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar, Icon, Button, Paragraph, Appbar, Menu, Card, FAB } from 'react-native-paper';

import firebase from "../../Firebase.js";
import  Trip  from '../model/Trip.js';
import {fetchJournals} from '../model/Journal.js';
import {fetchPhotos} from './../photos/model/Photo.js';

export default class DailySummary extends React.Component{
    state ={
        photos: []
    }

    componentDidMount(){
        let user = firebase.auth().currentUser;
        let userID = user.uid;
        let trip = this.props.trip;
        let tripID = trip.id;

        fetchPhotos(userID).then((photos) => this.setState({photos}));

        this.props.navigation.addListener(
            'willFocus', 
            () => fetchPhotos(userID).then((photos) => this.setState({photos}))
        );
    }

    render(){
        return(
            <View style={styles.container}>
            <Appbar.Header>
            <Appbar.BackAction onPress={() => this.props.navigation.navigate("calendar")} />
            <Appbar.Content title="Daily Summary" />
            </Appbar.Header>
            <ScrollView>
            <Card>
                <Card.Title
                title="Photos"
                subtitle="[# of photos]"
                left={(props) => <Avatar rounded reverse size="small" icon= "md-photos" onPress={() => console.log("This will bring you to all photos for this day!")}/>} />
                <Card.Content>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
                        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
                    </View>
                </Card.Content>
            </Card>
            </ScrollView>
            </View>
        )
    }
}