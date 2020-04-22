import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

import firebase from '../Firebase.js';

export default class PinDetailView extends React.Component {

    // pass in a pin through props
    render() {
        return (
            <Card style={this.props.pin.photoUrl !== null ? styles.tripCardPhoto : styles.tripCard}>
                <Card.Title title={this.props.pin.title} />
                <Card.Content>
                    <Paragraph>{this.props.pin.description}</Paragraph>
                </Card.Content>
                {this.props.pin.photoUrl !== null &&
                    <Card.Cover style={styles.photo} source={{ uri: this.props.pin.photoUrl }} />
                }
            </Card>
        );
      }
}

const styles = StyleSheet.create({
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