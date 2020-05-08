// written by: Samuel Minkin, Gaurav Sethi, Yash Shah
// tested by: Samuel Minkin, Gaurav Sethi, Yash Shah
// debugged by: Samuel Minkin, Gaurav Sethi, Yash Shah

import firebase from '../../Firebase.js';

export async function fetchPins(tripId) {
    let query = firebase.firestore().collection("pins").where("tripId", "==", tripId);
    let result = await query.get();
    return result.docs.map(
        (snapshot) => new Pin(snapshot.data())
    );
}

export function attrToPin(arr) {

    return arr.map((attr) => new Pin({
        id: attr.id,
        tripId: attr.tripId,
        userId: firebase.auth().currentUser.uid,
        coords: attr.coords,
        title: attr.name,
        description: `This attraction has a rating of ${attr.rating}`,
        photoUrl: attr.photoRef
    }));
}

export class Pin {
    constructor({id, tripId, userId, coords, title, description, photoUrl}) {
        this.id = id;
        this.tripId = tripId;
        this.userId = userId;
        this.coords = coords;
        this.title = title;
        this.description = description;
        this.photoUrl = photoUrl;
    }

    toJSON() {
        return {
            id: this.id,
            tripId: this.tripId,
            userId: this.userId,
            coords: this.coords,
            title: this.title,
            description: this.description,
            photoUrl: this.photoUrl
        }
    }

    async storePin() {
        let ref = firebase.firestore().collection("pins").doc();
        this.id = ref.id;
        return ref.set(this.toJSON());
    }
}