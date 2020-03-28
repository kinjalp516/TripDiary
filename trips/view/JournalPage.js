import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';

const JournalPage = ({navigation}) => {
    return <View style={styles.container}>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.navigate('home')} />
            <Appbar.Content title="Journal" />
        </Appbar.Header>

        <Text>Journal Page</Text>

        <FAB
            style={styles.fab}
            icon="plus"
            label="Add Entry"
            onPress={() => navigation.navigate('addJournal')}
        />

    </View>
};

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

export default JournalPage;