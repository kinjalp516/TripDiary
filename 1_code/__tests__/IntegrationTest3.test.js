import './Firebase.mock';

const mockNavigation = {
    addListener: function(event, callback) {
        return;
    }
};

import React from 'react';
import renderer from 'react-test-renderer';

import { Trip } from '../trips/model/Trip';
import { Budget } from '../budget/model/Budget';
import BudgetPage from '../budget/view/BudgetPage';
import AddBudget from '../budget/view/AddBudget';

//trip constant used for testing
//trip constant used for testing
const trip = new Trip({
    id: "",
    name: "",
    userId: "",
    location: "",
    startDate: new Date(2020, 3, 17),
    endDate: new Date(2020, 3, 25)
});

test('Integration test: Adds new budget and checks that the budget appears on budget page', () => {
    const props = { prop: jest.fn()};
    //render add budget page and add new budget
    let tree = renderer.create(<AddBudget props={props}/>).getInstance();
    tree.state.budgetval = '1000';
    budget = new Budget({
        id: "",
        userId: "",
        amount: tree.state.budgetval 
    })

    //pass budget created into budget page
    let tree2 = renderer.create(<BudgetPage trip={trip} navigation={mockNavigation} />).getInstance();
    tree2.state.budget[0] = budget;


    //test if budget is correct
    expect(tree2.state.budget[0].amount).toBe('1000');
})
