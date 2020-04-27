import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Appbar, Card, FAB } from 'react-native-paper';
import firebase from '../../Firebase.js';
import {fetchBudgetItems} from '../model/BudgetItem.js';
import trip from '../../trips/model/Trip';
import { fetchBudget } from '../model/Budget.js';

export default class BudgetPage extends React.Component{
    state = {
        budgetitems: [],
        budget: '',
        perDay: '',
        showBudgetButton: true,
        showItemButton: false
    }

    
    componentDidMount() {
        let user = firebase.auth().currentUser;
        if(user != null){
            let tripId = user.tripId;

            //for initial load
            fetchBudgetItems(tripId).then((budgetitems) => this.setState({budgetitems}));
            fetchBudget(tripId).then((budget) => this.setState({budget}));
            
            this.props.navigation.addListener(
              'willFocus', () => fetchBudgetItems(tripId).then((budgetitems) => this.setState({budgetitems})),
              'willFocus', () => fetchBudget(tripId).then((budget) => this.setState({budget}))
            );
        } 
        
        
    }

    async checkBudgetPerDay(){
        startDate = Date.now();
        endDate = trip.state.endDate;
        diff = endDate.toTime() - startDate.toTime();
        days = Math.floor(diff/(1000 * 60 * 60 * 24));
        x = this.state.budget/days;
        this.setState({perDay: x})
    }

    async checkBudgetItem(){
        this.props.navigation.navigate('addBudgetItem');
        if (this.budgetitems[budgetitems.length-1] > 0){
            this.setState({budget: budget - budgetitems[budgetitems.length-1]})
        }

        //need to keep track of date of purchase in budget item, need to adjust spending per day based on that
    }

    async checkBudget(){
        this.props.navigation.navigate('addBudget')
        if (!isNaN(this.state.budget)){
            this.setState({showBudgetButton: false});
            this.setState({showItemButton: true});
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('home')} />
                    <Appbar.Content 
                        title="Budget History"
                        subtitle= {this.state.budget} 
                    />
                </Appbar.Header>
                
                    { this.state.budgetitems.map((item, index) => {
                        return (<Card 
                            key={`budgetitems-${index}`} 
                            style={styles.budgetCard}
                            //needs to go to add budget item screen to edit budget items
                            onPress={() => null}

                        >
                            <Card.Title 
                                title = {item.amount}
                                subtitle={item.type}
                            />
                        </Card>);
                    }) }
                
                {this.state.showItemButton &&
                    <Text style={styles.budgetAndDay}>
                        My Budget: {this.state.budget}
                    </Text>
                }

                {this.state.showItemButton &&
                    <Text style={styles.budgetAndDay}>
                        Spending Goals: {this.state.perDay} /Day
                    </Text>
                }
            
                { this.state.showBudgetButton && 
  
                <FAB
                    style={styles.fab}
                    label = "Create New Budget"
                    onPress={() => this.checkBudget()}
                    
                />
                
                }

                { this.state.showItemButton && 
  
                <FAB
                    style={styles.fab}
                    label = "Add New Purchase"
                    onPress={() => this.checkBudgetItem()}
      
                />
  
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    budgetCard: {
        marginTop: 40,
        marginLeft: 24,
        marginRight: 24,
        backgroundColor: '#A4D7DF',
    },

    budgetAndDay: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      }
});
