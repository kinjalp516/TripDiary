import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

import firebase from '../Firebase.js';

export default class PinDetailView extends React.Component {

    // pass in a pin through props
    render() {
        return (
            <Card style={styles.tripCard}>
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
    tripCard: {
        // marginTop: 24,
        // marginLeft: 24,
        // marginRight: 24,
        width: 300,
        height: 280,
    },
    photo: {
        padding: 10,
        height: 200,
        backgroundColor: 'white',
    }
  });