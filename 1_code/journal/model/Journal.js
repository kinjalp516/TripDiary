import firebase from "../../Firebase.js";

// This function is an example of how to build a query in firestore and execute it.
// Useful links:
// https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference
// https://firebase.google.com/docs/reference/js/firebase.firestore.QuerySnapshot
// https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot

export async function fetchJournals(tripId) {
    let query = firebase.firestore().collection("journals").where("tripId", "==", tripId);
    let result = await query.get(); // This returns a result of type QuerySnapshot
    return result.docs.map(
        (snapshot) => new Journal(snapshot.data(), true)   // Within each QuerySnapshot, there is an array of
                                                            // documents of type DocumentSnapshot. We are taking
                                                            // these json objects from DocumentSnapshot and assigning
                                                            // them to our Journals class so that we can use them easily
                                                            // in other components.
    );
}

export async function deleteJournal(docId) {
    firebase.firestore().collection("journals").doc(docId).delete();
}

export async function updateJournal(docId, newTitle, newNote, newLocations, newUrl) {
    firebase.firestore().collection("journals").doc(docId).update ({
        title: newTitle,
        note: newNote,
        locations: newLocations,
        url: newUrl
    })
}

export class Journal {
    constructor({id, tripId, userId, title, note, locations, url}, fromFirestore=false) {
        this.id = id;
        this.tripId = tripId;
        this.userId = userId;
        this.title = title;
        this.note = note;
        this.locations = locations;
        this.url = url;
    }

    toJSON() {
        return {
            id: this.id,
            tripId: this.tripId,
            userId: this.userId,
            title: this.title,
            note: this.note,
            locations: this.locations,  
            url: this.url     
        }
    }

    storeJournal() {
        let newJournalReference = firebase.firestore().collection("journals").doc();
        this.id = newJournalReference.id;
        return newJournalReference.set(this.toJSON());
    }
}