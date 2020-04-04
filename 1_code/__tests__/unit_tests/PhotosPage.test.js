import '../mocks/Firebase.mock';
import '../mocks/Photo.mock';

import React from 'react';
import renderer from 'react-test-renderer';
import PhotosPage from '../../photos/PhotosPage';

test('Photos page renders help text when no photos exist', () =>{
    const tree = renderer.create(<PhotosPage trip={{id: null}} />).toJSON();

    const photoGrid = tree.children[1];
    expect(photoGrid.children.length).toBe(1);
    expect(photoGrid.children[0].type).toBe('Text');
    
    const textView = photoGrid.children[0];
    expect(textView.children.length).toBe(1);
    expect(textView.children[0]).toBe('Press the (+) button to add photos.');
});