import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Appbar, List, Banner, Divider} from 'react-native-paper';
import moment from 'moment';
import CachedImage from './CachedImage';

import firebase from '../Firebase.js'; 

export default class ViewPhotoPage extends React.Component {

    photo = this.props.navigation.getParam('photo');

    componentDidMount() {
        let user = firebase.auth().currentUser;
    }

    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title="View Photo" />
                </Appbar.Header>
                <CachedImage
                    isBackground
                    resizeMode="contain"
                    style={styles.photo} 
                    source={{uri: this.photo.photoUrl}}
                />
                <List.Section>
                    <List.Subheader style={styles.label}>Image Properties</List.Subheader>
                    <List.Item
                        title={moment.unix(this.photo.dateTaken).calendar()}
                        titleStyle={styles.label}
                        style={{padding: 0}}
                        left={() => <List.Icon color="white" icon="clock" />}
                    />
                    <List.Item
                        title={`${this.photo.location.latitude}, ${this.photo.location.longitude}`}
                        titleStyle={styles.label}
                        style={{padding: 0}}
                        left={() => <List.Icon color="white" icon="map" />}
                    />
                </List.Section>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    banner: {
        backgroundColor: 'white',
    },
    photo: {
        width: '100%',
        height: 400
    },
    label: {
        color: 'white',
    },
    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});