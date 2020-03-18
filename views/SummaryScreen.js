import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

export default class SummaryScreen extends React.Component {
    render() {
        return (
            <View>
                <Button 
                    title="Go to Photos" 
                    onPress={() => {
                        this.props.navigation.navigate('Photos');
                    }} 
                />
                <Button 
                    title="Go to Map" 
                    onPress={() => {
                        this.props.navigation.navigate('Map');
                    }} 
                />
            </View>
        );
    }
}