import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import PhotosPage from '../../photos/PhotosPage';
import CalendarPage from '../view/CalendarPage';
import JournalPage from '../../journal/view/JournalPage';

export default class TripDetailController extends React.Component {

    trip = this.props.navigation.getParam('trip');

    state = {
        index: 0,
        routes: [
            { key: 'photos', title: 'Photos', icon: 'camera-burst' },
            { key: 'calendar', title: 'Calendar', icon: 'calendar'},
            { key: 'journal', title: 'Journal', icon: 'book'}

        ]
    }

    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        photos: () => <PhotosPage trip={this.trip} navigation={this.props.navigation} />,
        calendar: () => <CalendarPage trip={this.trip} navigation={this.props.navigation}/>,
        journal: () => <JournalPage trip={this.trip} navigation={this.props.navigation}/>
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