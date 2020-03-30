import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';

import firebase from "../../Firebase.js";
import {Budget} from '../model/Budget.js';

export default class AddBudget extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            budgetval: ''
        }
        
        this.createBudget = this.createBudget.bind (this);
    }

    componentDidMount() {
        let trip = firebase.auth().trip;
        this.setState({tripId: trip});
    }

    async editBudget(docId, amount) {
        updateBudget(docId, amount);
        this.props.navigation.goBack(null);
    }

    async createBudget () {

        const {budgetval, tripId} = this.state;

        if (budgetval == '') {
            alert ('Please Add New Budget');
            return;
        } else if (isNaN(budgetval) || parseInt(budgetval,10)<=0) {
            alert ('Please Enter Valid Number As Budget');
            return;
        }

        if  (this.state.tripId != null) {
            let budget = new Budget ({
                id: '',
                tripId: tripId,
                amount: budget
            });

            await budget.storeBudget();
        }
        
        this.setState ({
            budgetval: ''
        })

        this.props.navigation.goBack(null);
        
    }

    viewBudget = () => {

        this.setState ({
            budgetval: ''
        })
        this.props.navigation.goBack(null);
    }

    render(){
        return(
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress ={this.viewBudget} />
                    <Appbar.Content title="Add New Budget"/>
                    <Appbar.Action icon="check" onPress = {this.createBudget} />
                </Appbar.Header>

                <TextInput
                    placeholder = 'Budget'
                    onChangeText={(budgetval) => this.setState({budgetval})}
                    value={this.state.budgetval}
                />

            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});