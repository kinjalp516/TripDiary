import {getSavedItems, setSavedItems, setSavedState, Retrieve} from '../../attractions/Model/Retrieve';
import Attractions from '../../attractions/view/Attractions';
import renderer from 'react-test-renderer';
import React from 'react';

import Category from '../../attractions/view/Category';


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

    //const testItem = {name: 'a', price: '2', rating: '3.5', address:'a', opening_hours: {open_now: false}, saved: false, id: '1', buttonText: 'Save'};
    const testItem = new Retrieve('a', '2', '3.5', 'a', {open_now: false}, false, '1', 'save', 'N/A', 'N/A', 'N/A');
    setSavedItems([]);
    let attractionInstance = renderer.create(<Attractions />).getInstance();
    attractionInstance.state.attractions = [testItem];
    expect(attractionInstance.saveItem(testItem).length).toBe(1);

});

test('Trying to Save item twice only saves one instance', () => {

  //  const testItem = {name: 'a', price: '2', rating: '3.5', address:'a', opening_hours: {open_now: false}, saved: false, id: '1', buttonText: 'Save'};
    const testItem = new Retrieve('a', '2', '3.5', 'a', {open_now: false}, false, '1', 'save', 'N/A', 'N/A', 'N/A');
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
    let categoryInstance = renderer.create(<Category />).getInstance();
    categoryInstance.deleteHandler(testItem);
    expect(getSavedItems().length).toBe(0);
});

test('Sort Price', () => {

    const testItem = 
                [{name: 'a', price: '1', rating: '1', address:'a', opening_hours: {open_now: false}, saved: false, id: '1', buttonText: 'Save'},
                {name: 'a', price: '2', rating: '2.3', address:'a', opening_hours: {open_now: false}, saved: false, id: '2', buttonText: 'Save'},
                {name: 'a', price: '2', rating: '2.3', address:'a', opening_hours: {open_now: false}, saved: false, id: '3', buttonText: 'Save'},
                {name: 'a', price: '3', rating: '3', address:'a', opening_hours: {open_now: false}, saved: false, id: '4', buttonText: 'Save'}];
    let attractionInstance = renderer.create(<Attractions/>).getInstance();
    attractionInstance.state.attractions = testItem;
    attractionInstance.sortPrice();
    var arr = attractionInstance.state.attractions;
    var flag = false;
    const limit = arr.length - 1;
        for (let i = 0; i < limit; i++) {
            const current = arr[i].price, next = arr[i + 1].price;
            if (current > next) { 
                flag = false; 
                break;
            } else{
                flag = true;
                
              }
          } 

    expect(flag).toBe(true);
    
});

test('Sort Descending Price', () => {

    const testItem = 
                [{name: 'a', price: '1', rating: '1', address:'a', opening_hours: {open_now: false}, saved: false, id: '1', buttonText: 'Save'},
                {name: 'a', price: '2', rating: '2.3', address:'a', opening_hours: {open_now: false}, saved: false, id: '2', buttonText: 'Save'},
                {name: 'a', price: '2', rating: '2.3', address:'a', opening_hours: {open_now: false}, saved: false, id: '3', buttonText: 'Save'},
                {name: 'a', price: '3', rating: '3', address:'a', opening_hours: {open_now: false}, saved: false, id: '4', buttonText: 'Save'}];
    let attractionInstance = renderer.create(<Attractions/>).getInstance();
    attractionInstance.state.attractions = testItem;
    attractionInstance.state.sortP = 1;
    attractionInstance.sortPrice();
    var arr = attractionInstance.state.attractions;
    var flag = false;
    const limit = arr.length - 1;
    
        for (let i = 0; i < limit; i++) {
            const current = arr[i].price, next = arr[i + 1].price;
          
            if (current >= next) { 
                flag = true; 
                
            } else {
                flag = false;
                break;
            }
          }
          

    expect(flag).toBe(true);
    
});

test('Sort Rating', () => {

    const testItem = 
                [{name: 'a', price: '1', rating: '1', address:'a', opening_hours: {open_now: false}, saved: false, id: '1', buttonText: 'Save'},
                {name: 'a', price: '2', rating: '2.3', address:'a', opening_hours: {open_now: false}, saved: false, id: '2', buttonText: 'Save'},
                {name: 'a', price: '2', rating: '2.3', address:'a', opening_hours: {open_now: false}, saved: false, id: '3', buttonText: 'Save'},
                {name: 'a', price: '3', rating: '3', address:'a', opening_hours: {open_now: false}, saved: false, id: '4', buttonText: 'Save'}];
    let attractionInstance = renderer.create(<Attractions/>).getInstance();
    attractionInstance.state.attractions = testItem;
    attractionInstance.sortRating();
    var arr = attractionInstance.state.attractions;
    var flag = false;
    const limit = arr.length - 1;
        for (let i = 0; i < limit; i++) {
            const current = arr[i].rating, next = arr[i + 1].rating;
            if (current > next) { 
                flag = false; 
                break;
            } else{
                flag = true;
                
              }
          } 

    expect(flag).toBe(true);
    
});

test('Sort Descending Rating', () => {

    const testItem = 
                [{name: 'a', price: '1', rating: '1', address:'a', opening_hours: {open_now: false}, saved: false, id: '1', buttonText: 'Save'},
                {name: 'a', price: '2', rating: '2.3', address:'a', opening_hours: {open_now: false}, saved: false, id: '2', buttonText: 'Save'},
                {name: 'a', price: '2', rating: '2.3', address:'a', opening_hours: {open_now: false}, saved: false, id: '3', buttonText: 'Save'},
                {name: 'a', price: '3', rating: '3', address:'a', opening_hours: {open_now: false}, saved: false, id: '4', buttonText: 'Save'}];
    let attractionInstance = renderer.create(<Attractions/>).getInstance();
    attractionInstance.state.attractions = testItem;
    attractionInstance.state.sortR = 1;
    attractionInstance.sortRating();
    var arr = attractionInstance.state.attractions;
    var flag = false;
    const limit = arr.length - 1;
    
        for (let i = 0; i < limit; i++) {
            const current = arr[i].rating, next = arr[i + 1].rating;
          
            if (current >= next) { 
                flag = true; 
                
            } else {
                flag = false;
                break;
            }
          }
          

    expect(flag).toBe(true);
    
});




