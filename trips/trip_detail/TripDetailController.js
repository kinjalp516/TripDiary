import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import PhotosPage from '../../photos/PhotosPage';
import MapPage from '../../map/MapPage';

export default class TripDetailController extends React.Component {

    trip = this.props.navigation.getParam('trip');

    state = {
        index: 0,
        routes: [
            { key: 'photos', title: 'Photos', icon: 'camera-burst' },
            { key: 'map', title: 'Map', icon: 'map'}
        ]
    };

    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        photos: () => <PhotosPage trip={this.trip} navigation={this.props.navigation} />,
        map: () => <MapPage trip={this.trip} navigation={this.props.navigation} />
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