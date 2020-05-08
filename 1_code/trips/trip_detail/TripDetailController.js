// written by: Samuel Minkin, Gaurav Sethi, Yash Shah
// tested by: Samuel Minkin, Gaurav Sethi, Yash Shah
// debugged by: Samuel Minkin, Gaurav Sethi, Yash Shah

import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import PhotosPage from '../../photos/PhotosPage';
import CalendarPage from '../../calendar/view/CalendarPage';
import JournalPage from '../../journal/view/JournalPage';
import BudgetPage from '../../budget/view/BudgetPage';
import MapPage from '../../map/MapPage';
import Category from '../../attractions/view/Category';

//import DailySummary from '../view/DailySummaryPage'

export default class TripDetailController extends React.Component {

    trip = this.props.navigation.getParam('trip');

    state = {
        index: 0,
        routes: [
            { key: 'photos', title: 'Photos', icon: 'camera-burst' },
            { key: 'calendar', title: 'Calendar', icon: 'calendar', testID: 'Calendar Test'},
            { key: 'journal', title: 'Journal', icon: 'book'},
            { key: 'budget', title: 'Budget', icon: 'bank'},
            { key: 'map', title: 'Map', icon: 'map'},
            { key: 'category', title: 'Category' , icon:'glass-cocktail'}
           // { key: 'daily', title: 'DailySummary', icon: 'view-day'}
        ]
    };

    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        photos: () => <PhotosPage trip={this.trip} navigation={this.props.navigation} />,
        calendar: () => <CalendarPage trip={this.trip} navigation={this.props.navigation}/>,
        journal: () => <JournalPage trip={this.trip} navigation={this.props.navigation}/>,
        budget: () => <BudgetPage trip={this.trip} navigation={this.props.navigation}/>,
        map: () => <MapPage trip={this.trip} navigation={this.props.navigation} />, 
        category: () => <Category trip={this.trip} navigation={this.props.navigation} />,
        //daily: () => <DailySummary trip={this.trip} navigation={this.props.navigation} />
    });

    render() {
        return (
            <BottomNavigation
                navigationState={this.state}
                onIndexChange={this._handleIndexChange}
                renderScene={this._renderScene}
            />
        );
    }
}