import React from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: null, password: null};
    }

    render() {
        return (
            <View style={styles.screen}>
                <Text>Welcome to the login page!</Text>
                <View style={styles.inputs}>
                    <Text>Username: </Text>
                    <TextInput
                        style={styles.border} 
                        onChangeText={(text) => {
                            this.setState({username: text});
                        }} 
                    />
                </View>
                <View style={styles.inputs}>
                    <Text>Password: </Text>
                    <TextInput 
                        style={styles.border}
                        onChangeText={(text) => {
                            this.setState({password: text});
                        }} 
                    />
                </View>
                <Button
                    title="Submit"
                    onPress={() => {
                        this.props.navigation.navigate('Basic');
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        padding: 50
    },
    inputs: {
        padding: 15
    },
    border: {
        borderColor: 'black',
        borderWidth: 1
    },
    buttons: {
        padding: 10,
    }


});