import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { ImageBrowser } from 'expo-image-picker-multiple';

export default class AddPhotosPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title="Select Photos" />
                </Appbar.Header>
                <ImageBrowser
                    onChange={(callback) => {
                        console.log("callback", callback);
                    }}
                    callback={(num, onSubmit) => {
                        console.log("num", num);
                    }}
                />
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});