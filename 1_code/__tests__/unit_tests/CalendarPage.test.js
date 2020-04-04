import '../mocks/Firebase.mock';

import React from 'react';
import renderer from 'react-test-renderer';

import CalendarPage from '../../calendar/view/CalendarPage';
import { Trip } from '../../trips/model/Trip';

//constant used for testing
const trip = new Trip({
    id: "",
    name: "",
    userId: "",
    location: "",
    startDate: new Date(2020, 3, 17),
    endDate: new Date(2020, 3, 25)
});

//tests if rendered page matches snapshot 
test('Calendar Page renders correctly', () =>{
  const tree = renderer.create(<CalendarPage trip={trip}  />).toJSON();
  expect(tree).toMatchSnapshot();
});
