import React from 'react';
import { StyleSheet, View, FlatList, Alert, TouchableHighlight, Dimensions, SafeAreaView, ImageBackground } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import * as MediaLibrary from 'expo-media-library'
import moment, { relativeTimeRounding } from 'moment';
import CachedImage from './CachedImage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

  getItemLayout = (data, index) => {
    let length = width / 3
    return { length, offset: length * index, index }
  }

  renderHeader = () => {
    let headerText='Photos'

    return (
      <SafeAreaView forceInset={{ top: 'always' }} style={{ height: 52 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{headerText}</Text>
        </View>
      </SafeAreaView>
    )
  }

  renderImageTile = ({ item, index }) => {
    console.log("item", item)
    // return (
    //   <TouchableHighlight
    //     style={{ opacity: item.uploaded ? 1.0 : 0.6 }}
    //     underlayColor='transparent'>

    //     <View style={{ position: 'relative' }}>
    //       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //         <CachedImage
    //           isBackground
    //           isFilesystemUri={!item.uploaded}
    //           style={{ width: width / 3, height: width / 3 }}
    //           source={{ uri: item.uploaded ? item.uri : item.deviceUri }} >
    //           {!item.uploaded &&
    //             <MaterialCommunityIcons name="cloud-upload" size={32} color="white" style={styles.countBadge} />
    //           }
    //         </CachedImage>
    //       </View>
    //     </View>
    //   </TouchableHighlight>
    // );
  }

  renderEmpty = () => {
    return (
      <View style={styles.emptyContent}>
        <Text style={styles.emptyText}>{this.props.emptyText ? this.props.emptyText : 'No photos found.'}</Text>
      </View>
    );
  }

  renderImages = () => {
    return (
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
    )
  }
  
  render () {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.navigate("home")} />
          <Appbar.Content title="Photos" />
        </Appbar.Header>
        {this.renderImages()}
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
