import {getSavedItems, setSavedItems, setSavedState} from '../../attractions/Model/Retrieve';
import Attractions from '../../attractions/view/Attractions';
import renderer from 'react-test-renderer';
import React from 'react';
import SavedAttractions from '../../attractions/view/SavedAttractions';


test('Attraction Displays Information Passed to it', () => {
    
    const testItem = {name: 'a', price: '2', rating: '3.5', address:'a', opening_hours: {open_now: false}, saved: false, id: '1', buttonText: 'Save'};
    setSavedState([testItem]);
    let attractionInstance = renderer.create(<Attractions />).getInstance();
    expect(attractionInstance.state.attractions[0].name).toBe('a');
    expect(attractionInstance.state.attractions[0].price).toBe('2');
    expect(attractionInstance.state.attractions[0].rating).toBe('3.5');
    expect(attractionInstance.state.attractions[0].address).toBe('a');
    expect(attractionInstance.state.attractions[0].opening_hours.open_now).toBe(false);
    expect(attractionInstance.state.attractions[0].saved).toBe(false);
    expect(attractionInstance.state.attractions[0].id).toBe('1');
    expect(attractionInstance.state.attractions[0].buttonText).toBe('Save');


});

test('Running Save Call Back Saves Item', () => {

    const testItem = {name: 'a', price: '2', rating: '3.5', address:'a', opening_hours: {open_now: false}, saved: false, id: '1', buttonText: 'Save'};
    setSavedItems([]);
    let attractionInstance = renderer.create(<Attractions />).getInstance();
    attractionInstance.state.attractions = [testItem];
    expect(attractionInstance.saveItem(testItem).length).toBe(1);

});

test('Trying to Save item twice only saves one instance', () => {

    const testItem = {name: 'a', price: '2', rating: '3.5', address:'a', opening_hours: {open_now: false}, saved: false, id: '1', buttonText: 'Save'};
    setSavedItems([]);
    let attractionInstance = renderer.create(<Attractions />).getInstance();
    attractionInstance.state.attractions = [testItem];
    attractionInstance.saveItem(testItem);
    expect(attractionInstance.saveItem(testItem).length).toBe(1);
    
});

test('Deleting Saved Item', () => {

    const testItem = {name: 'a', price: '2', rating: '3.5', address:'a', opening_hours: {open_now: false}, saved: false, id: '1', buttonText: 'Save'};
    setSavedItems([]);
    setSavedItems([testItem]);
    let savedAttractionInstance = renderer.create(<SavedAttractions/>).getInstance();
    savedAttractionInstance.deleteHandler(testItem);
    expect(getSavedItems().length).toBe(0);
});



