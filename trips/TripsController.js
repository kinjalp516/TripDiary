import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CreateTripPage from './view/CreateTripPage';
import MyTripsPage from './view/MyTripsPage';

const TripsController = createStackNavigator(
    {
        home: MyTripsPage,
        create: CreateTripPage
    },
    {
        initialRouteName: 'home',
        headerMode: 'none'
    }
);

export default TripsController;