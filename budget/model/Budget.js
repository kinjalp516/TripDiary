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

    constructor({id, tripId, amount}) {
        this.id = id;
        this.tripId = tripId;
        this.amount = amount;
    }

    toJSON() {
        return {
            id: this.id,
            tripId: this.tripId,
            amount: this.amount
        };
    }

    storeBudget() {
        let budgetRef = firebase.firestore().collection("budget").doc();
        this.id = budgetRef.id;
        return budgetRef.set(this.toJSON());
    }
}