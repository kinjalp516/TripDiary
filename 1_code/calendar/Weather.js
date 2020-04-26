import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const weatherConditions = {
    Rain: {
      color: 'steelblue',
      title: 'Raining',
      icon: 'weather-rainy'
    },
    Clear: {
      color: 'steelblue',
      title: 'Clear',
      icon: 'weather-sunny'
    },
    Thunderstorm: {
      color: 'steelblue',
      title: 'Thunderstorm',
      icon: 'weather-lightning'
    },
    Clouds: {
      color: 'steelblue',
      title: 'Cloudy',
      icon: 'weather-cloudy'
    },
  
    Snow: {
      color: 'steelblue',
      title: 'Snow',
      icon: 'weather-snowy'
    },
    Drizzle: {
      color: 'steelblue',
      title: 'Drizzle',
      icon: 'weather-hail'
    },
    Haze: {
      color: 'steelblue',
      title: 'Haze',
      icon: 'weather-hail'
    },
    Mist: {
      color: 'steelblue',
      title: 'Mist',
      icon: 'weather-fog'
    },
    Fog: {
      color: 'steelblue',
      title: 'Fog',
      icon: 'weather-fog'
    }
  };
const Weather = ({ weather, temperature, name }) => {
  if (weather != null) {
    return (
      <View
        style={[
          styles.weatherContainer,
          { backgroundColor: weatherConditions[weather].color }
        ]}
      >
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            size={80}
            name={weatherConditions[weather].icon}
            color={'#fff'}

          />
           <Text style={styles.tempText}>{temperature}˚</Text>
        </View>
        <View style={styles.headerContainer}>
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.subtitle}>
            {name}
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Oh no, something went wrong</Text>
      </View>
    )
  };
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  tempText: {
    fontSize: 60,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
   // paddingLeft: 25,
    marginBottom: 20
  },
  title: {
    fontSize: 60,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  }
});

export default Weather;