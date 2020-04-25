import React from 'react';
import { StyleSheet, View, FlatList, Alert, TouchableHighlight, Dimensions, SafeAreaView, ImageBackground } from 'react-native';
import { Appbar, Text, ActivityIndicator } from 'react-native-paper';
import * as MediaLibrary from 'expo-media-library'
import moment, { relativeTimeRounding } from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import CachedImage from './CachedImage';

import firebase from '../Firebase.js'; 
import { Photo, fetchPhotos } from './model/Photo.js';

const { width } = Dimensions.get('window')

export default class PhotosPage extends React.Component {

  state = {
    loading: false,
    photos: [],
  };

  componentDidMount() {
    this.getPhotos();
  }

  getPhotos = async () => {
    this.setState({loading: true});

    let permission = await MediaLibrary.requestPermissionsAsync();
    if(!permission.granted) {
      this.setState({loading: false});
      return;
    }
    
    let mediaAssets = await MediaLibrary.getAssetsAsync({ 
      first: 500, 
      mediaType: MediaLibrary.MediaType.photo, 
      sortBy: [[MediaLibrary.SortBy.creationTime, true]] 
    });

    let devicePhotos = mediaAssets.assets.map((asset) => {
      let photo = new Photo({
        id: "", deviceId: asset.id, uri: asset.uri,
        tripId: this.props.trip.id, userId: firebase.auth().currentUser.uid,
        location: [], city: "", state: "",
        creationTime: asset.creationTime, tags: []
      });
      photo.uploaded = false;
      return photo;
    });

    let uploadedPhotos = await fetchPhotos(this.props.trip.id);
    uploadedPhotos = uploadedPhotos.filter(uploadedPhoto => {
      let index = devicePhotos.findIndex((devicePhoto) => devicePhoto.deviceId == uploadedPhoto.deviceId);
      if(index > -1) {
        devicePhotos[index].uploaded = true;
        devicePhotos[index].city = uploadedPhoto.city;
        devicePhotos[index].state = uploadedPhoto.state;
        return false;
      } else {
        uploadedPhoto.uploaded = true;
      }
      return true;
    });

    let photos = [...devicePhotos, ...uploadedPhotos];
    photos = photos.sort((a, b) => a.creationTime - b.creationTime);

    this.setState({loading: false, photos: photos});
  }

  uploadPhoto = async (photo) => {
    // Fetch additional photo metadata
    let assetInfo = await MediaLibrary.getAssetInfoAsync(photo.deviceId);

    // Fetch & store location data for photo
    if(!assetInfo.location) {
      Alert.alert("Missing Location Data", "No GPS coordinates found in image metadata. You can only upload images with location data.");
      return;
    }
    photo.location = new firebase.firestore.GeoPoint(assetInfo.location.latitude, assetInfo.location.longitude);
    let reverseGeocodeResult = await Location.reverseGeocodeAsync(assetInfo.location);
    if(reverseGeocodeResult.length < 1) {
      Alert.alert("Invalid GPS Coordinates", "Location data found in photo is invalid.");
      return;
    }
    photo.city = reverseGeocodeResult[0].city;
    photo.state = reverseGeocodeResult[0].region;

    // Store photo in bucket & get url
    let assetData = await fetch(photo.uri);
    let assetBlob = await assetData.blob();
    let storageRef = firebase.storage().ref(photo.userId).child(photo.tripId).child(Date.now().toString());
    let uploadResult = await storageRef.put(assetBlob).then();
    photo.uri = await uploadResult.ref.getDownloadURL()
    
    // Upload Photo to Firebase
    await photo.storePhoto();
    photo.uploaded = true;
    this.setState({loading: false});
  }

  getItemLayout = (data, index) => {
    let length = width / 3
    return { length, offset: length * index, index }
  }

  renderImageTile = ({ item, index }) => {
    return (
      <TouchableHighlight
        style={{ opacity: item.uploaded ? 1.0 : 0.6 }}
        underlayColor='transparent'
        onPress={
          () => item.uploaded ? this.props.navigation.navigate("viewPhoto", {photo: item}) : this.uploadPhoto(item)
        }>
        <View style={{ position: 'relative' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <CachedImage
              isBackground
              isFilesystemUri={!item.uploaded}
              style={{ width: width / 3, height: width / 3 }}
              source={{ uri: item.uri }} >
              {!item.uploaded &&
                <MaterialCommunityIcons name="cloud-upload" size={32} color="white" style={styles.countBadge} />
              }
            </CachedImage>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  renderEmpty = () => {
    return (
      <View style={styles.emptyContent}>
        <Text style={styles.emptyText}>{this.props.emptyText ? this.props.emptyText : 'No photos found.'}</Text>
      </View>
    );
  }
  
  render () {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.navigate("home")} />
          <Appbar.Content title="Photos" />
        </Appbar.Header>
        {this.state.loading && (
          <View style={styles.loading}>
              <ActivityIndicator size="large" />
          </View>
        )}
        {!this.state.loading && (
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={this.state.photos}
            numColumns={3}
            renderItem={this.renderImageTile}
            keyExtractor={(_, index) => index}
            ListEmptyComponent={this.renderEmpty}
            initialNumToRender={24}
            getItemLayout={this.getItemLayout}
          />
        )}
      </View>
    )
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
    width: 185,
    height: 150
  },
  photoComp: {
    padding: 1
  },
  header: {
    width: width,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 19
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: '#bbb',
    fontSize: 20
  },
  countBadge: {
    position: 'absolute',
    right: 10,
    bottom: 5,
    justifyContent: 'center'
  },
});
