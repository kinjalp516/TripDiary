import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CreateTripPage from './view/CreateTripPage';
import MyTripsPage from './view/MyTripsPage';
import TripDetailController from './trip_detail/TripDetailController'
import AddPhotosPage from '../photos/AddPhotosPage';

const TripsController = createStackNavigator(
    {
        home: MyTripsPage,
        create: CreateTripPage,
        trip: TripDetailController,
        addPhotos: AddPhotosPage
    },
    {
        initialRouteName: 'home',
        headerMode: 'none'
    }
);

export default TripsController;