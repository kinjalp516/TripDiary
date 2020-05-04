import '../mocks/Firebase.mock';
import '../mocks/Photo.mock';
import '../mocks/expo-location.mock';
import '../mocks/expo-permissions.mock';
import '../mocks/react-native-maps.mock';

jest.mock('../../map/model/Pin', () => {
    return {
        fetchPins: async function(tripId) {
            return [];
        },
    }
});

jest.mock('../../attractions/Model/Retrieve', () => {
    return {
        fetchAttractions: async function(tripId) {
            return [];
        },
    }
});

import React from 'react';
import renderer from 'react-test-renderer';
import MapPage from '../../map/MapPage';


test('Expect Activity loader when map page renders', () => {
    const tree = renderer.create(<MapPage trip={{id: 4}} />).toJSON();
    const activityView = tree.children[1];

    expect(activityView.type).toBe('View');
    expect(activityView.children[0].type).toBe('ActivityIndicator');
});

test('Expect map to be rendered after location is given', () => {
    const map = renderer.create(<MapPage trip={{id: 4}} />);
    const instance = map.getInstance();

    instance.setState({mapRegion : {
        latitude: 40.828237,
        longitude: -74.596885,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }});
    const tree = map.toJSON();
    const mapView = tree.children[1];

    expect(mapView.type).toBe('MapView');
});