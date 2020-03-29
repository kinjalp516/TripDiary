import React from 'react';
import { StyleSheet, View, Image, FlatList } from 'react-native';
import { Appbar, Menu, Card, FAB, Text, ActivityIndicator } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';

import firebase from '../Firebase.js'; 
import { Photo, fetchPhotos } from './model/Photo.js';

export default class PhotosPage extends React.Component {

  state = {
    loading: true,
    photos: []
  };

  componentDidMount() {
    this.props.navigation.addListener(
      'willFocus', () => fetchPhotos(this.props.trip.id).then((photos) => this.setState({ photos: photos, loading: false }))
    );
  }

  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      exif: true
    });

    if(result && !result.cancelled && result.type=="image") {
      this.setState({loading: true});
      const response = await fetch(result.uri);
      const blob = await response.blob();

      let userId = firebase.auth().currentUser?.uid ?? "";

      var ref = firebase.storage().ref(userId).child(this.props.trip.id).child(Date.now().toString());
      const uploadTask = ref.put(blob);

      uploadTask.then(async (snapshot) => {
        let photoUrl = await snapshot.ref.getDownloadURL()
        let dateTaken = moment(result.exif["DateTimeOriginal"], 'YYYY:MM:DD hh:mm:ss').unix();
        let latitude = result.exif["GPSLatitude"] * (result.exif["GPSLatitudeRef"] == "N" ? 1 : -1);
        let longitude = result.exif["GPSLongitude"] * (result.exif["GPSLongitudeRef"] == "E" ? 1 : -1);
        let location = new firebase.firestore.GeoPoint(latitude, longitude);

        let newPhoto = new Photo({
          id: "", 
          photoUrl: photoUrl, 
          tripId: this.props.trip.id, 
          userId: userId, 
          location: location, 
          dateTaken: dateTaken
        });

        await newPhoto.storePhoto();
        
        fetchPhotos(this.props.trip.id).then((photos) => this.setState({ photos: photos, loading: false }));       
      }).catch((error) => console.error("Error uploading image", error));
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.navigate("home")} />
          <Appbar.Content title="Photos" />
          <Appbar.Action icon="image-plus" onPress={
            () => this.pickImage()
          } />
        </Appbar.Header>
        {this.state.loading && (
          <View style={styles.loading}>
              <ActivityIndicator size="large" />
          </View>
        )}
        {!this.state.loading && <FlatList
          data={this.state.photos}
          renderItem={({item}) => {
              return (
                <View style={styles.photoComp}>
                  <Image style={styles.photo} source={{uri: item.photoUrl}} />
                </View>
              );
            }
          }
          keyExtractor={item => item.id}
          numColumns={2}
        />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width: 195,
    height: 150
  },
  photoComp: {
    padding: 5
  },
});
