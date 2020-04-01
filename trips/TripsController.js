import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CreateTripPage from './view/CreateTripPage';
import MyTripsPage from './view/MyTripsPage';
import TripDetailController from './trip_detail/TripDetailController'
import ViewPhotoPage from '../photos/ViewPhoto';
import CalendarPage from '../calendar/view/CalendarPage';
import ViewJournal from '../journal/view/ViewJournal';
import addJournalPage from '../journal/view/AddJournalPage';
import AddPinPage from '../map/AddPinPage';
import AddBudget from '../budget/view/AddBudget';
import BudgetPage from '../budget/view/BudgetPage';

const TripsController = createStackNavigator(
    {
        home: MyTripsPage,
        create: CreateTripPage,
        trip: TripDetailController,
        viewPhoto: ViewPhotoPage,
        calendar: CalendarPage,
        viewJournal: ViewJournal,
        addJournal: addJournalPage,
        addPin: AddPinPage,
        viewBudget: BudgetPage,
        addBudget: AddBudget
    },
    {
        initialRouteName: 'home',
        headerMode: 'none'
    }
);

export default TripsController;