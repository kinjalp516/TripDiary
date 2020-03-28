import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';

export default class JournalPage extends React.Component{

    constructor () {
        super();

        this.state = {
            entries: []
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('home')} />
                    <Appbar.Content title="Journal" />
                </Appbar.Header>

                <FAB
                    style={styles.fab}
                    icon="plus"
                    label="Add Entry"
                    onPress={() => this.props.navigation.navigate('addJournal')}
                />

            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      }
});