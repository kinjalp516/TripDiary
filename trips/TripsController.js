import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CreateTripPage from './view/CreateTripPage';
import MyTripsPage from './view/MyTripsPage';
import TripDetailController from './trip_detail/TripDetailController'
import CalendarPage from '../trips/view/CalendarPage';
import JournalPage from '../journal/view/JournalPage';
import addJournalPage from '../journal/view/AddJournalPage';
import AddPinPage from '../map/AddPinPage';

const TripsController = createStackNavigator(
    {
        home: MyTripsPage,
        create: CreateTripPage,
        trip: TripDetailController,
        calendar: CalendarPage,
        viewJournals: JournalPage,
        addJournal: addJournalPage,
        addPin: AddPinPage
    },
    {
        initialRouteName: 'home',
        headerMode: 'none'
    }
);

export default TripsController;