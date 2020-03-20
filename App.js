import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'; 
import { Provider as PaperProvider } from 'react-native-paper';

import LoadingPage from './LoadingPage';
import LoginPage from './LoginPage';
import DashboardController from './dashboard/DashboardController';

/*
This is the entrypoint into our application, and this controller designates
the possible root-view components. These include (1) the loading page,
(2) the login page, and (3) the dashboard page.  These pages are navigated 
to based on changes in the authentication state. 
*/
const AppController = createAppContainer(createSwitchNavigator(
  {
    loading: LoadingPage,
    login: LoginPage,
    dashboard: DashboardController
  },
  {
    // We begin our application at the loading screen, which initializes 
    // Firebase connections, and checks for login from a previous user. 
    initialRouteName: 'loading'
  }
));

export default function App() {
  return (
    <PaperProvider>
      <AppController />
    </PaperProvider>
  );
}
