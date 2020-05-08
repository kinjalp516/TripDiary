// written by: Samuel Minkin, Gaurav Sethi, Yash Shah
// tested by: Samuel Minkin, Gaurav Sethi, Yash Shah
// debugged by: Samuel Minkin, Gaurav Sethi, Yash Shah

import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

import firebase from '../Firebase.js';

export default class PinDetailView extends React.Component {

    // pass in a pin through props
    render() {
        let hasPhoto = this.props.pin.photoUrl !== null;
        return (
            <View style={hasPhoto ? styles.containerPhoto : styles.container}>
                <Card style={hasPhoto ? styles.tripCardPhoto : styles.tripCard}>
                    <Card.Title title={this.props.pin.title} />
                    <Card.Content>
                        <Paragraph>{this.props.pin.description}</Paragraph>
                    </Card.Content>
                    {hasPhoto &&
                        <Card.Cover style={styles.photo} source={{ uri: this.props.pin.photoUrl }} />
                    }
                </Card>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
            </View>
        );
      }
}

const styles = StyleSheet.create({
    containerPhoto: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        width: 300,
        height: 300,
        borderRadius: 3,
        borderColor: 'black'
    },
    container: {
        width: 150,
        height: 100,
    },
    bubble: {
        width: 300,
        height: 300,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#4da2ab',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 6,
        borderColor: '#007a87',
        borderWidth: 0.5,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: 'white',
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: 'white',
        alignSelf: 'center',
        marginTop: -0.5,
    },
    tripCardPhoto: {
        width: 300,
        height: 280,
    },
    tripCard: {
        width: 150,
        height: 80,
    },
    photo: {
        padding: 10,
        height: 200,
        backgroundColor: 'white',
    }
  });