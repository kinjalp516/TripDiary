import React from "react";
import { StyleSheet, View, Text, Button ,TextInput} from 'react-native';


export default class CreateTripScreen extends React.Component(){
    constructor(props){
        super(props);
        this.attributes = {tripName: null, location: null, start: null, end: null};
    }

    render(){
        return(
        //location?
        //also set dates - limit of how long a trip they can set?
       <View style={styles.container}>
            <Text style={styles.header}>Enter Name of Trip: </Text>
            <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            this.attributes({tripName: text});
                        }} />


        </View>

        )
    }
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
