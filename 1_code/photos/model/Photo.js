// written by: Yash Shah
// tested by: Yash Shah
// debugged by: Yash Shah

import firebase from '../../Firebase.js';

export async function fetchPhotos(tripId) {
    let query = firebase.firestore().collection("photos").where("tripId", "==", tripId);
    let result = await query.get();
    return result.docs.map(
        (snapshot) => new Photo(snapshot.data())
    );
}

export class Photo {
    constructor({id, deviceId, uri, tripId, userId, location, city, state, creationTime, tags}) {
        this.id = id;
        this.deviceId = deviceId;
        this.uri = uri;
        this.tripId = tripId;
        this.userId = userId;
        this.location = location;
        this.city = city;
        this.state = state;
        this.creationTime = creationTime;
        this.tags = tags;
    }

    toJSON() {
        return {
            id: this.id,
            deviceId: this.deviceId,
            uri: this.uri,
            tripId: this.tripId,
            userId: this.userId,
            location: this.location,
            city: this.city,
            state: this.state,
            creationTime: this.creationTime,
            tags: this.tags
        };
    }

    async storePhoto() {
        let ref;
        if(this.id.length < 1) {
            ref = firebase.firestore().collection("photos").doc();
            this.id = ref.id;
        } else {
            ref = firebase.firestore().collection("photos").doc(this.id);
        }
        return ref.set(this.toJSON());
    }
}