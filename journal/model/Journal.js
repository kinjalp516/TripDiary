import firebase from "../../Firebase.js";

// This function is an example of how to build a query in firestore and execute it.
// Useful links:
// https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference
// https://firebase.google.com/docs/reference/js/firebase.firestore.QuerySnapshot
// https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot

export async function fetchJournals(userId) {
    let query = firebase.firestore().collection("journals").where("userId", "==", userId);
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

export async function updateJournal(docId, newTitle, newNote) {
    firebase.firestore().collection("journals").doc(docId).update ({
        title: newTitle,
        note: newNote
    })
    //firebase.firestore().collection("journals").doc(docId).delete();
}

export class Journal {
    constructor({id, userId, title, note}, fromFirestore=false) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.note = note;
    }

    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            title: this.title,
            note: this.note        
        }
    }

    storeJournal() {
        // Let's start by creating a DocumentReference for a new journals object
        // We need to do this to get an automatically generated ID for this new journal
        // (look at links above for further reference)
        let newJournalReference = firebase.firestore().collection("journals").doc();

        // now we can set the id field for our object
        this.id = newJournalReference.id;

        // now let's store the object in our database
        return newJournalReference.set(this.toJSON());
    }
}