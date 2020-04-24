import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
//import  {weatherConditions}  from './weatherConditions';
const weatherConditions = {
    Rain: {
      color: 'darkslateblue',
      title: 'Raining',
      icon: 'weather-rainy'
    },
    Clear: {
      color: 'deepskyblue',
      title: 'Clear',
      icon: 'weather-sunny'
    },
    Thunderstorm: {
      color: 'darkslateblue',
      title: 'Thunderstorm',
      icon: 'weather-lightning'
    },
    Clouds: {
      color: 'dodgerblue',
      title: 'Cloudy',
      icon: 'weather-cloudy'
    },
  
    Snow: {
      color: 'mintcream',
      title: 'Snow',
      icon: 'weather-snowy'
    },
    Drizzle: {
      color: 'lightblue',
      title: 'Drizzle',
      icon: 'weather-hail'
    },
    Haze: {
      color: 'powderblue',
      title: 'Haze',
      icon: 'weather-hail'
    },
    Mist: {
      color: 'lightblue',
      title: 'Mist',
      icon: 'weather-fog'
    }
  };
const Weather = ({ weather, temperature }) => {
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
            size={72}
            name={weatherConditions[weather].icon}
            color={'#fff'}
          />
          <Text style={styles.tempText}>{temperature}˚</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{weatherConditions[weather].title}</Text>
          <Text style={styles.subtitle}>
            {weatherConditions[weather].subtitle}
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
    fontSize: 72,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
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