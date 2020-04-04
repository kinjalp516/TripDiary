import firebase from "../../Firebase.js";

export async function fetchBudget(userId) {
    let query = firebase.firestore().collection("budget").where("userId", "==", userId);
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

    constructor({id, userId, amount}, fromFirestore=false) {
        this.id = id;
        this.userId = userId;
        this.amount = amount;
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