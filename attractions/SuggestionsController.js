import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Category from '../view/Category'
import Attractions from '../view/Attractions'
import SavedAttractions from '../view/SavedAttractions';
const screens = {


    Home: {
        screen: Category
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