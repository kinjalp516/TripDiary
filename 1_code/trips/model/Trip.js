import firebase from "../../Firebase.js";

// This function is an example of how to build a query in firestore and execute it.
// Useful links:
// https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference
// https://firebase.google.com/docs/reference/js/firebase.firestore.QuerySnapshot
// https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot

export async function fetchTrips(userId) {
    let query = firebase.firestore().collection("trips").where("userId", "==", userId);
    let result = await query.get(); // This returns a result of type QuerySnapshot
    return result.docs.map(
        (snapshot) => new Trip(snapshot.data(), true)   // Within each QuerySnapshot, there is an array of
                                                        // documents of type DocumentSnapshot. We are taking
                                                        // these json objects from DocumentSnapshot and assigning
                                                        // them to our Trips class so that we can use them easily
                                                        // in other components.
    );
}

export class Trip {
    constructor({id, name, userId, location, startDate, endDate}, fromFirestore=false) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            name: this.name,
            location: this.location,
            startDate: this.startDate,
            endDate: this.endDate
        }
    }

    storeTrip() {
        // Let's start by creating a DocumentReference for a new trips object
        // We need to do this to get an automatically generated ID for this new trip
        // (look at links above for further reference)
        let newTripReference = firebase.firestore().collection("trips").doc();
        console.log("new ref", newTripReference)
        // now we can set the id field for our object
        this.id = newTripReference.id;

        // now let's store the object in our database
        return newTripReference.set(this.toJSON());
    }
}