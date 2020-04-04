import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Card, FAB } from 'react-native-paper';
import firebase from '../../Firebase.js';
import {fetchBudget} from '../model/Budget.js';

export default class BudgetPage extends React.Component{
    state = {
        budget: [],
        showButton: true
    }

    
    componentDidMount() {
        let user = firebase.auth().currentUser;
        if(user != null){
            let userId = user.uid;

            //for initial load
            fetchBudget(userId).then((budget) => this.setState({budget}));
            
            this.props.navigation.addListener(
              'willFocus', () => fetchBudget(userId).then((budget) => this.setState({ budget }))
            );
        } 
        
        
    }

    async checkBudget(){
        this.props.navigation.navigate('addBudget')
        this.setState({showButton: false})
    }

    render(){
        return(
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('home')} />
                    <Appbar.Content title="Budget" />
                </Appbar.Header>

                
                    { this.state.budget.map((item, index) => {
                        return (<Card 
                            key={`budget-${index}`} style={styles.budgetCard}
                            //goes to wherever you want after you press on the card, rn its set to null
                            onPress={() => null}
                        >
                            <Card.Title 
                                title = 'Remaining Budget'
                                subtitle={item.amount}
                                //you can add a subtitle if you'd like, but as of now there's only 1 thing to display
                                //subtitle={item.location}
                                //{this.state.budget == null? 
                                //: null }

                            />
                        </Card>);
                    }) }
            
                { this.state.showButton && 
  
                <FAB
                    style={styles.fab}
                    label = "Create New Budget"
                    onPress={() => this.checkBudget()}
                    
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
