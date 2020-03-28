import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CreateTripPage from './view/CreateTripPage';
import MyTripsPage from './view/MyTripsPage';
import TripDetailController from './trip_detail/TripDetailController'
import AddPhotosPage from '../photos/AddPhotosPage';
import CalendarPage from '../trips/view/CalendarPage';
import JournalPage from '../trips/view/JournalPage';
import addJournalPage from '../trips/view/AddJournalPage';

const TripsController = createStackNavigator(
    {
        home: MyTripsPage,
        create: CreateTripPage,
        trip: TripDetailController,
        calendar: CalendarPage,
        addPhotos: AddPhotosPage,
        viewJournals: JournalPage,
        addJournal: addJournalPage
    },
    {
        initialRouteName: 'home',
        headerMode: 'none'
    }
);

export default TripsController;