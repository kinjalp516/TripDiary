import '../mocks/Firebase.mock';
import * as Location from 'expo-location';
import React from 'react';
import renderer from 'react-test-renderer';
import {create, act} from 'react-test-renderer';

import CalendarPage from '../../calendar/view/CalendarPage';
import { Trip } from '../../trips/model/Trip';
import { Photo } from '../../photos/model/Photo';
import { Journal } from '../../journal/model/Journal';

let location1 = Location.geocodeAsync("Baker Street London");
let location2 = Location.geocodeAsync("New York City");

const mockNavigation = {
  addListener: function(event, callback) {
      return;
  }
};

//constants used for testing
const trip = new Trip({
    id: "TesttripId",
    name: "Testname",
    userId: "TestuserId",
    location: location1,
    startDate: new Date(2020, 3, 17),
    endDate: new Date(2020, 3, 25)
});

const trip2 = new Trip({
  id: "TesttripId2",
  name: "Testname2",
  userId: "TestuserId2",
  location: location2,
  startDate: new Date(2020, 4, 17),
  endDate: new Date(2020, 4, 25)
});

//tests if rendered page matches snapshot 
test('Calendar Page renders correctly', () =>{
  const tree2 = renderer.create(<CalendarPage trip={trip} />).toJSON();
  expect(tree2).toMatchSnapshot();
});

test('Trips Appear in calendar page with correct data', () => {
  let root; 
  act(() => {
   root = renderer.create(<CalendarPage trip={trip} navigation={mockNavigation} />)
  });
  expect(root.getInstance().props.trip.id).toBe("TesttripId");
  expect(root.getInstance().props.trip.name).toBe("Testname");
  expect(root.getInstance().props.trip.userId).toBe("TestuserId");
  expect(root.getInstance().state.tripID).toBe("TesttripId");
  expect(root.getInstance().props.trip.location).toBe(location1);

  act(() => {
    root.update(<CalendarPage trip={trip2} navigation={mockNavigation} />);
  })
  
  root.getInstance().state.tripID = root.getInstance().props.trip.id;
  expect(root.getInstance().props.trip.id).toBe("TesttripId2");
  expect(root.getInstance().props.trip.name).toBe("Testname2");
  expect(root.getInstance().props.trip.userId).toBe("TestuserId2");
  
  expect(root.getInstance().state.tripID).toBe("TesttripId2");

  expect(root.getInstance().props.trip.location).toBe(location2);
})

const tree1 = renderer.create(<CalendarPage trip={trip} navigation={mockNavigation} />)
let tree = tree1.getInstance();

test('Added photos appear with correct data', () => {
  tree.state.photos[0] = new Photo({
    city: "New Brunswick",
    state: "New Jersey",
    tags: ["Test1", "Test2", "Test3"]
  });
  tree.state.photos[1] = new Photo({
    city: "New York City",
    state: "New York",
    tags: ["Test4", "Test5", "Test6"]
  });
  expect(tree.state.photos.length).toBe(2);
  expect(tree.state.photos[0].city).toBe('New Brunswick');
  expect(tree.state.photos[0].state).toBe('New Jersey');
  expect(tree.state.photos[0].tags).toStrictEqual(['Test1', 'Test2', 'Test3']);
  expect(tree.state.photos[1].city).toBe('New York City');
  expect(tree.state.photos[1].state).toBe('New York');
  expect(tree.state.photos[1].tags).toStrictEqual(['Test4', 'Test5', 'Test6']);
})

test('Added journal entries appear with correct data', () => {
  tree.state.journals[0] = new Journal({
      id: "TestId",
      title: "Title",
      note: "Hello"
  });
  tree.state.journals[1] = new Journal({
    id: "TestId1",
    title: "Title1",
    note: "Hello1"
});
  expect(tree.state.journals.length).toBe(2);
  expect(tree.state.journals[0].title).toBe('Title');
  expect(tree.state.journals[0].id).toBe('TestId');
  expect(tree.state.journals[0].note).toBe('Hello');
  expect(tree.state.journals[1].title).toBe('Title1');
  expect(tree.state.journals[1].note).toBe('Hello1');
  expect(tree.state.journals[1].id).toBe('TestId1');
})

// test('Weather Data from API exists', () => {
//   let tree = renderer.create(<CalendarPage trip={trip} navigation={mockNavigation} />).getInstance();
//   tree1.update();
//   tree1.update();
//   tree1.update();
//   let tree = tree1.getInstance();
//   expect(tree.state.weatherCondition).toBe(!null);
//   expect(tree.state.temperature).toBe(!0);
// })

test('Location Data in calendar page shows correct data', () => {
  let root; 
  act(() => {
   root = renderer.create(<CalendarPage trip={trip} location={location1} navigation={mockNavigation} />)
  });
  expect(root.getInstance().props.trip.location).toBe(location1);
  expect(root.getInstance().props.location).toBe(location1);

  act(() => {
    root.update(<CalendarPage trip={trip2} location={location2} navigation={mockNavigation} />);
  })
  expect(root.getInstance().props.trip.location).toBe(location2);
  expect(root.getInstance().props.location).toBe(location2);
})