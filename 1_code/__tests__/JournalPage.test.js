import './Firebase.mock';

const mockNavigation = {
    addListener: function(event, callback) {
        return;
    }
};

import React from 'react';
import renderer from 'react-test-renderer';
import {Appbar, FAB, Card} from 'react-native-paper';

import JournalPage from '../journal/view/JournalPage';
import { Trip } from '../trips/model/Trip';
//import firebase from '../Firebase.js';
//import admin from 'firebase-admin';
import { Journal } from '../journal/model/Journal';
//import functions from 'firebase-functions-test';

const trip = new Trip({
    id: "",
    name: "",
    userId: "",
    location: "",
    startDate: new Date(2020, 3, 17),
    endDate: new Date(2020, 3, 25)
});


test('Journal Page renders correctly', () =>{
    
        const tree = renderer.create(<JournalPage trip={trip} navigation={mockNavigation} />).toJSON();
        expect(tree).toMatchSnapshot();
      });

test('Added journal has title and note', () => {
    let tree = renderer.create(<JournalPage trip={trip} navigation={mockNavigation} />).getInstance();
    tree.state.journals[0] = new Journal({
        id: "",
        userId: "",
        title: "Title",
        note: "Hello"
    });

    expect(tree.state.journals[0].title).toBe('Title');
    expect(tree.state.journals[0].note).toBe('Hello');
})
