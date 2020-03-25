import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';
import { ImageBrowser } from 'expo-image-picker-multiple';

export default class ViewPhotosPage extends React.Component {
    render() {
        return (
            <View style={styles.textStyle}>
                <Text>View Photos Page!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})