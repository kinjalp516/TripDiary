import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Category from './view/Category';
import Attractions from './view/Attractions';
import SavedAttractions from './view/SavedAttractions';
import Header from './view/Header';
import React from 'react';
const screens = {


    Home: {
        screen: Category,
        navigationOptions: {
            header: () =>  <Header />,
        }
    },

    Items: {
        screen: Attractions
    },

    Saved: {
        screen: SavedAttractions
    }

    

}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);