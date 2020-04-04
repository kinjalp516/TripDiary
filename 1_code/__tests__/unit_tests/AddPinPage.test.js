import '../mocks/Firebase.mock';
import '../mocks/Photo.mock';

const mockNavigation = {
    getParam: function(param) {
        if(param == 'trip') return {id: null};
        else if(param == 'coords') return [];
        else return [];
    }
};

import React from 'react';
import renderer from 'react-test-renderer';
import  AddPinPage, { getDistance } from '../../map/AddPinPage';

test('test distance function', () => {
    let c1 = { latitude: 40.400367983574654, longitude: -74.26662245470531 };
    let c2 = { latitude: 43.13181352863725, longitude: -75.20958559454716 };

    let distance = getDistance(c1, c2);

    expect(distance).toBeCloseTo(194.88);
});

test('test if there are no images', () => {
    let pinInstance = renderer.create(<AddPinPage navigation={mockNavigation} />).getInstance();
    let photoUrl = pinInstance.getImage();

    expect(photoUrl).toBeNull();
});

test('test numErrors equals 1 when title is null', () => {
    let pinInstance = renderer.create(<AddPinPage navigation={mockNavigation} />).getInstance();
    pinInstance.state.description = 'test';

    return pinInstance.submitPin().then(numErrors => {
        expect(numErrors).toBe(1);
        expect(pinInstance.state.titleError).toBe(true);
    });
});

test('test numErrors equals 1 when description is null', () => {
    let pinInstance = renderer.create(<AddPinPage navigation={mockNavigation} />).getInstance();
    pinInstance.state.title = 'test';

    return pinInstance.submitPin().then(numErrors => {
        expect(numErrors).toBe(1);
        expect(pinInstance.state.descriptionError).toBe(true);
    });
});

test('test numErrors equals 2 when description and title are null', () => {
    let pinInstance = renderer.create(<AddPinPage navigation={mockNavigation} />).getInstance();

    return pinInstance.submitPin().then(numErrors => {
        expect(numErrors).toBe(2);
        expect(pinInstance.state.descriptionError).toBe(true);
        expect(pinInstance.state.titleError).toBe(true);
    });
});
