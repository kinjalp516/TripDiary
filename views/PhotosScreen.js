import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class PhotosScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: null};
    }

    settheUser(newUser) {
        this.setState({user: newUser});
    }

    render() {
        return (
            <View>
                <Text>Welcome to the photos view!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({});