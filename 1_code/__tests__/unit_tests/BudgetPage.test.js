import '../mocks/Firebase.mock';

const mockNavigation = {
  addListener: function(event, callback) {
    return;
  }
};

import React from 'react';
import renderer from 'react-test-renderer';

import BudgetPage from '../../budget/view/BudgetPage';
import { Trip } from '../../trips/model/Trip';

const trip = new Trip({
    id: "",
    name: "",
    userId: "",
    location: "",
    startDate: new Date(2020, 3, 17),
    endDate: new Date(2020, 3, 25)
});


test('Budget Page renders correctly', () =>{
  const tree = renderer.create(<BudgetPage trip={trip} navigation={mockNavigation} />).toJSON();
  expect(tree).toMatchSnapshot();
});
