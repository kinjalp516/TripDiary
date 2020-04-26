import firebase from "../../Firebase.js";

export async function fetchBudget(tripId) {
    let query = firebase.firestore().collection("budget").where("tripId", "==", tripId);
    let result = await query.get();
    return result.docs.map(
        (snapshot) => new Budget(snapshot.data(), true)
    );
}

export async function updateBudget(docId, newAmount) {
    firebase.firestore().collection("budget").doc(docId).update ({
        amount: newAmount
    })
}

export class Budget{

    constructor({id, userId, tripId, amount}, fromFirestore=false) {
        this.id = id;
        this.userId = userId;
        this.tripId = tripId;
        this.amount = amount;
        //this.perDay = tripId
    }

    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            amount: this.amount
        };
    }

    storeBudget() {
        let budgetRef = firebase.firestore().collection("budget").doc();
        this.id = budgetRef.id;
        return budgetRef.set(this.toJSON());
    }
}