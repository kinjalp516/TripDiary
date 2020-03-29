import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Menu, Card, FAB, Paragraph, ActivityIndicator } from 'react-native-paper';
import firebase from '../../Firebase.js';
import {fetchBudget} from '../model/Budget.js';

export default class BudgetPage extends React.Component{
    state = {
        budget: ''
    }

    componentDidMount() {
        let tripId = firebase.auth().tripId;

        fetchBudget(tripId).then((budget) => this.setState({budget}));

        this.props.navigation.addListener(
            'willFocus', 
            () => fetchBudget(tripId).then((budget) => this.setState({budget}))
        );
    } 

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

    budgetCard: {
        marginTop: 24,
        marginLeft: 24,
        marginRight: 24,
        backgroundColor: '#A4D7DF',
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      }
});
