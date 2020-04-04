import './Firebase.mock';

const mockNavigation = {
    addListener: function(event, callback) {
        return;
    }
};

import React from 'react';
import renderer from 'react-test-renderer';

import { Trip } from '../trips/model/Trip';
import MyTripsPage from '../trips/view/MyTripsPage';
import CalendarPage from '../calendar/view/CalendarPage';

//trip constant used for testing
const trip = new Trip({
    id: "",
    name: "",
    userId: "",
    location: "",
    startDate: null,
    endDate: null
});


test('Integration test: Checks date set in MyTrips is set correctly in Calendar', () => {
    //render MyTrip page and create Trip -> set start and end date
    let tree = renderer.create(<MyTripsPage navigation={mockNavigation} />).getInstance();
    tree.state.trips[0] = trip;
    tree.state.trips[0].startDate = new Date(2020, 3, 25 );
    tree.state.trips[0].endDate = new Date(2020, 3, 30 );

    //pass trip created into calendar page
    let tree2 = renderer.create(<CalendarPage trip={tree.state.trips[0]} />).getInstance();


    //test if dates are correct
    expect(tree2.state.startDay).toStrictEqual(new Date(2020, 3, 25 ));
    expect(tree2.state.endDay).toStrictEqual(new Date(2020, 3, 30 ));
})
