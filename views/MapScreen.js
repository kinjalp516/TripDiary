import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class MapScreen extends React.Component {
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
                <Text>Welcome to the map view!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({});