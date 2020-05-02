import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Category from './view/Category';
import Attractions from './view/Attractions';
import InformationWindow from './view/InformationWindow';
import Header from './view/Header';
import React from 'react';
import SavedAttractions from './view/SavedAttractions';


const screens = {   
    
    Home: {
        screen: Category,
        navigationOptions: {
            header: () =>  <Header />,
        }
    },

    Info: {
        screen: InformationWindow
    },

    Items: {
        screen: Attractions
    },

    Saved: {
        screen: SavedAttractions
    },

};



const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);