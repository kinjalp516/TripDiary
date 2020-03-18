import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from 'react-native';
import { TextInput } from "react-native-gesture-handler";

export default function CreateTripScreen(){
    const [ name, setName ] = useState();
    return(
        //location?
        //also set dates - limit of how long a trip they can set?
        <View style={styles.container}>
            <Text style={styles.header}>Enter Name of Trip: </Text>
            <TextInput style={styles.input}
            placeholder = 'e.g. Beach Vacation'
             onChangeText={(val) => setName(val)}/>
             <Text>Updated name: {name} </Text>
            
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    },
    header: {
        backgroundColor: 'pink',
        fontSize: 30,
        fontWeight: 'bold',
        
    }
});