import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Menu, Card, FAB, Paragraph, ActivityIndicator } from 'react-native-paper';
import firebase from '../../Firebase.js';

export default class BudgetPage extends React.Component{

    render(){
        return(
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('home')} />
                    <Appbar.Content title="Budget" />
                </Appbar.Header>

                <FAB
                    style={styles.fab}
                    //icon="bar-graph"
                    //label="View Budget Statistics"
                    label = "Create New Budget"
                    onPress={() => this.props.navigation.navigate('addBudget')}
                    //onPress={() => this.props.navigation.navigate('viewBudgetStatistics')}
                />

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
