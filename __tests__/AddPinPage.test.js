import React from 'react';
import renderer from 'react-test-renderer';
import  AddPinPage, { getDistance } from '../map/AddPinPage';


test('test distance function', () => {
    let c1 = { latitude: 40.400367983574654, longitude: -74.26662245470531 };
    let c2 = { latitude: 43.13181352863725, longitude: -75.20958559454716 };

    let distance = getDistance(c1, c2);

    expect(distance).toBeCloseTo(194.88);
});

test('test if there are no images', () => {
    let pinInstance = renderer.create(<AddPinPage navigation={{getParam: (name) => {id: null}}}/>).getInstance();
    let photoUrl = pinInstance.getImage();

    expect(photoUrl).toBeNull();
});

test('test numErrors equals 1 when title is null', () => {
    let pinInstance = renderer.create(<AddPinPage />).getInstance();

    return pinInstance.submitPin().then(numErrors => {
        expect(numErrors).toBe(1);
        expect(pinInstance.state.titleError).toBe(true);
    });
});