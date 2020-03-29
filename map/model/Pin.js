import firebase from '../../Firebase.js';

export async function fetchPins(tripId) {
    let query = firebase.firestore().collection("pins").where("tripId", "==", tripId);
    let result = await query.get();
    return result.docs.map(
        (snapshot) => new Pin(snapshot.data())
    );
}

export class Pin {
    constructor({id, tripId, userId, coords, title, description}) {
        this.id = id;
        this.tripId = tripId;
        this.userId = userId;
        this.coords = coords;
        this.title = title;
        this.description = description;
    }

    toJSON() {
        return {
            id: this.id,
            tripId: this.tripId,
            userId: this.userId,
            coords: this.coords,
            title: this.title,
            description: this.description
        }
    }

    async storePin() {
        let ref = firebase.firestore().collection("pins").doc();
        this.id = ref.id;
        return ref.set(this.toJSON());
    }
}