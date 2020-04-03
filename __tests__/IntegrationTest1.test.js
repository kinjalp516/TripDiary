import React from 'react';
import renderer from 'react-test-renderer';

test('Making a trip with dates and viewing them in the Calendar' , async() => {
    const { getByText, getByTestId, getByTestId} = render(<App />);
     
    //click add trip
    Simulate.click(getByText('Add Trip'));

    //start date
    Simulate.click(getByText('Select Start Date'));
    getByTestId('Date start test').value = 'Date input start';

    //end date
    Simulate.click(getByText('Select End Date'));
    getByTestId('Date end test').value = 'Date input end';

    //click save trip
    Simulate.click(getByText('Save Trip'));

    //select trip
    Simulate.click(getByTestId('Trip ID'));

    //select calendar page
    Simulate.click(getByTestId('Calendar Test'));

    //expect the dates to be the ones input
    expect(getByTestId('Calendar Date').minDate.toEqual(getByText('Date input start')));
    expect(getByTestId('Calendar Date').maxDate.toEqual(getByText('Date input end')));


});
