import React from 'react';
import renderer from 'react-test-renderer';


import { Trip } from '../trips/model/Trip';
import { Journal } from '../journal/model/Journal';
import JournalPage from '../journal/view/JournalPage';
import AddJournalPage from '../journal/view/AddJournalPage';

//trip constant used for testing
const trip = new Trip({
    id: "",
    name: "",
    userId: "",
    location: "",
    startDate: new Date(2020, 3, 17),
    endDate: new Date(2020, 3, 25)
});

//journal constant used for testing
const journal = new Journal({
    id: "",
    userId: "",
    title: "",
    note: ""
});

test('Integration test: Checks journal entry made shows up correctly on Journal Page', () => {

    const navigation = { navigate: jest.fn() };

    //render add journal page and add journal entry
    let tree = renderer.create(<AddJournalPage navigation = {navigation}/>).getInstance();
    tree.state.title = 'Testing Title';
    tree.state.note = 'Testing Note';
    journal = new Journal({
        id: "",
        userId: "",
        title: tree.state.title,
        note: tree.state.note
    })

    //pass the journal entry to the journal page from add journal page
    let tree2 = renderer.create(<JournalPage trip = {trip} />).getInstance();
    tree2.state.journals[0] = journal;

    //test if journal on journal page is correct
    expect(tree2.state.journals[0].title).toBe('Testing Title');
    expect(tree2.state.journals[0].note).toBe('Testing Note');
})
