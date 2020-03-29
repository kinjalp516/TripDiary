import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Menu, Card, FAB, Paragraph, ActivityIndicator } from 'react-native-paper';
import firebase from '../../Firebase.js';

export default class BudgetStatisticsPage extends React.Component{

    render(){
        return(
            <View style={styles.container}>
                <Appbar.Header>
                <Appbar.BackAction onPress={() => this.props.navigation.navigate('viewBudget')} />
                    <Appbar.Content title="Budget Statistics" />
                </Appbar.Header>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      }
});