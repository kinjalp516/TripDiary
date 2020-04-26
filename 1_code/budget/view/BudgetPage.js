import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Card, FAB } from 'react-native-paper';
import firebase from '../../Firebase.js';
import {fetchBudgetItems} from '../model/BudgetItem.js';
import trip from '../../trips/model/Trip';
import { fetchBudget } from '../model/Budget.js';

export default class BudgetPage extends React.Component{
    state = {
        budgetitems: [],
        budget: 0,
        perDay: 0,
        showButton: true
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
        //startDate = Date.now();
        //endDate = trip.state.endDate;
        //diff = endDate.toTime() - startDate.toTime();
        //days = Math.floor(diff/(1000 * 60 * 60 * 24));
        //x = this.state.budget/days;
        //this.setState({perDay: x})
    }

    async checkBudgetItem(){
        this.props.navigation.navigate('addBudgetItem')
        //this.setState({showButton: false})
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
                            key={`budgetitems-${index}`} style={styles.budgetCard}
                            //goes to wherever you want after you press on the card, rn its set to null
                            onPress={() => null}
                        >
                            <Card.Title 
                                title = {item.amount}
                                subtitle={item.type}
                                //you can add a subtitle if you'd like, but as of now there's only 1 thing to display

                            />
                        </Card>);
                    }) }
            
                { this.state.showButton && 
  
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
