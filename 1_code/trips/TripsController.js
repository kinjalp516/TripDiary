import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CreateTripPage from './view/CreateTripPage';
import MyTripsPage from './view/MyTripsPage';
import TripDetailController from './trip_detail/TripDetailController'
import ViewPhotoPage from '../photos/ViewPhoto';
import CalendarPage from '../calendar/view/CalendarPage';
import addJournalPage from '../journal/view/AddJournalPage';
import AddPinPage from '../map/AddPinPage';
import AddBudgetItem from '../budget/view/AddBudgetItem';
import BudgetPage from '../budget/view/BudgetPage';
import Category from '../attractions/view/Category';

const TripsController = createStackNavigator(
    {
        home: MyTripsPage,
        create: CreateTripPage,
        trip: TripDetailController,
        viewPhoto: ViewPhotoPage,
        calendar: CalendarPage,
        addJournal: addJournalPage,
        addPin: AddPinPage,
        viewBudget: BudgetPage,
        addBudgetItem: AddBudgetItem,
        category: Category
    },
    {
        initialRouteName: 'home',
        headerMode: 'none'
    }
);

export default TripsController;