import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import MapScreen from '../views/MapScreen';
import PhotosScreen from '../views/PhotosScreen';
import LoginScreen from '../views/LoginScreen';

const BasicNavigator = createStackNavigator({
    Login: LoginScreen,
    Photos: PhotosScreen,
    Map: MapScreen
});

export default createAppContainer(BasicNavigator);