import firebase from '../../Firebase.js';

export async function fetchPhotos(tripId) {
    let query = firebase.firestore().collection("photos").where("tripId", "==", tripId)
        .orderBy("dateTaken", "asc");   // Returns the result from earliest date to latest date. 
    let result = await query.get();
    return result.docs.map(
        (snapshot) => new Photo(snapshot.data())
    );
}

export class Photo {
    constructor({id, photoUrl, tripId, userId, location, dateTaken}) {
        this.id = id;
        this.photoUrl = photoUrl;
        this.tripId = tripId;
        this.userId = userId;
        this.location = location;
        this.dateTaken = dateTaken;
    }

    toJSON() {
        return {
            id: this.id,
            photoUrl: this.photoUrl,
            tripId: this.tripId,
            userId: this.userId,
            location: this.location,
            dateTaken: this.dateTaken
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