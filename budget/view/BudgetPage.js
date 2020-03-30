import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Card, FAB } from 'react-native-paper';
import firebase from '../../Firebase.js';
import {fetchBudget} from '../model/Budget.js';

export default class BudgetPage extends React.Component{
    state = {
        budget: []
    }

    componentDidMount() {
        let user = firebase.auth().currentUser;
        let userId = user.uid;

        //for initial load
        fetchBudget(userId).then((budget) => this.setState({budget}));
        
        this.props.navigation.addListener(
          'willFocus', () => fetchBudget(userId).then((budget) => this.setState({ budget }))
        );
    }

    render(){
        return(
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('home')} />
                    <Appbar.Content title="Budget" />
                </Appbar.Header>

                <ScrollView>
                    { this.state.budget.map((item, index) => {
                        return (<Card 
                            key={`budget-${index}`} style={styles.budgetCard}
                            //goes to wherever you want after you press on the card, rn its set to null
                            onPress={() => null}
                        >
                            <Card.Title 
                                title={item.amount}
                                //you can add a subtitle if you'd like, but as of now there's only 1 thing to display
                                //subtitle={item.location}
                            />
                        </Card>);
                    }) }
                </ScrollView>

                <FAB
                    style={styles.fab}
                    label = "Create New Budget"
                    onPress={() => this.props.navigation.navigate('addBudget')}
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
