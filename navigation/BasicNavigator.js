import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MapScreen from '../views/MapScreen';
import PhotosScreen from '../views/PhotosScreen';
import LoginScreen from '../views/LoginScreen';
import SummaryScreen from '../views/SummaryScreen';
//import CreateTripScreen from '../views/CreateTripScreen';
import HomeScreen from '../views/HomeScreen';

const BasicNavigator = createStackNavigator({
    
    Summary: SummaryScreen,
    Photos: PhotosScreen,
    Map: MapScreen,
    Home: HomeScreen,
    //CreateTrip: CreateTripScreen
});

const MainNavigator = createSwitchNavigator({
    Login: LoginScreen,
    Basic: BasicNavigator,

})

export default createAppContainer(MainNavigator);