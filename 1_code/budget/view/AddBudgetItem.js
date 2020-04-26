import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';

import firebase from "../../Firebase.js";
import {BudgetItem} from '../model/BudgetItem.js';

export default class AddBudgetItem extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            budgetval: '',
            typebudget: ''
        }
        
        this.createBudgetItem = this.createBudgetItem.bind (this);
    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
    }

    async createBudgetItem () {

        const {budgetval, typebudget} = this.state;
        if (budgetval == '' && typebudget == ''){
            alert('Please enter the amount and type of purchase');
            return;
        } else if (budgetval == '') {
            alert ('Purchase amount not entered!');
            return;
        } else if(typebudget == ' '){
            alert ('Purchase type not entered!');
            return;
        }
        else if (isNaN(budgetval) || parseInt(budgetval,10)<=0) {
            alert ('Please Enter Valid Number As Budget');
            return;
        }

        if(this.state.userId != null) {
            let budget = new BudgetItem({
                id: "",
                userId: this.state.userId,
                amount: budgetval,
                type: typebudget
            });

            await budget.storeBudget();
        }
        
        this.setState ({
            budgetval: '',
            typebudget: ''
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
                    <Appbar.Action icon="check" onPress = {this.createBudgetItem} />
                </Appbar.Header>

                <View style={styles.textInputContainer}>
                    <TextInput
                        mode = 'outlined'
                        keyboardType = 'numeric'
                        placeholder = 'Amount of Purchase'
                        onChangeText={(budgetval) => this.setState({budgetval})}
                        value={this.state.budgetval}
                    />

                    <TextInput
                        mode = 'outlined'
                        placeholder = 'Type of Purchase'
                        onChangeText={(typebudget) => this.setState({typebudget})}
                        value={this.state.typebudget}
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