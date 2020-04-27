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
        
        this.createBudgetItem = this.createBudgetItem.bind (this);
    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
    }

    async createBudgetItem () {

        const {budgetval} = this.state;
        if (budgetval == ''){
            alert('Please Enter a Budget');
            return;
        }

        else if (isNaN(budgetval) || parseInt(budgetval,10)<=0) {
            alert ('Please Enter Valid Number As Budget');
            return;
        }

        if(this.state.userId != null) {
            let budget = new Budget({
                id: "",
                userId: this.state.userId,
                amount: budgetval
            });

            await budget.storeBudget();
        }

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
                    <Appbar.Content title="Create New Budget"/>
                    <Appbar.Action icon="check" onPress = {this.createBudgetItem} />
                </Appbar.Header>

                <View style={styles.textInputContainer}>
                    <TextInput
                        mode = 'outlined'
                        keyboardType = 'numeric'
                        placeholder = 'My Budget'
                        onChangeText={(budgetval) => this.setState({budgetval})}
                        value={this.state.budgetval}
                    />

                </View>

            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    textInputContainer: {
        marginLeft: 15,
        marginRight: 15
    },
});