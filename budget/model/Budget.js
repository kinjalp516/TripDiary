import firebase from "../../Firebase.js";

export async function fetchBudget(tripId) {
    let query = firebase.firestore().collection("budgets").where("tripId", "==", tripId);
    let result = await query.get();
    return result.docs.map(
        (snapshot) => new Budget(snapshot.data())
    );
}

class Budget{

    constructor({id, tripId, userId, amount}) {
        this.id = id;
        this.tripId = tripId;
        this.userId = userId;
        this.amount = amount;
    }

    toJSON() {
        return {
            id: this.id,
            tripId: this.tripId,
            userId: this.userId,
            amount: this.amount
        };
    }

    async storeBudget() {
        let budgetRef = firebase.firestore().collection("budgets").doc();
        this.id = budgetRef.id;
        return budgetRef.set(this.toJSON());
    }
}