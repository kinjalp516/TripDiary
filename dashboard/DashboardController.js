import React from 'react';
import { Appbar, Menu } from 'react-native-paper';
import firebase from '../Firebase.js';

export default class DashboardController extends React.Component {
    state = {
        showAppBarMenu: false
    }

    render() {
        return (
            <Appbar.Header>
                <Appbar.Content title="Dashboard" />
                <Menu
                    onDismiss={() => this.setState({showAppBarMenu: false})}
                    visible={this.state.showAppBarMenu}
                    anchor={
                        <Appbar.Action
                            color="white"
                            icon="dots-vertical"
                            onPress={() => this.setState({showAppBarMenu: true})}
                        />
                    }
                >
                    <Menu.Item icon="logout" title="Sign Out" onPress={() => firebase.auth().signOut()} />
                </Menu>
            </Appbar.Header>
        );
    }
}