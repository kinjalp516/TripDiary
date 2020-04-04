import React, {Component} from 'react';
import {Appbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';

export default class Header extends React.Component{

    constructor(props){
        super(props);
    }


    render(){

        return(
            <Appbar.Header style = {styles.header}>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('home')} />
                    <Appbar.Content title="Attractions" />
            </Appbar.Header>
        );
    }



}

const styles = StyleSheet.create({

    header: {
        width: '100%'
    }
});