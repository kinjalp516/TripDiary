import firebase from "../../Firebase.js";

export async function fetchBudgetItems(tripId) {
    let query = firebase.firestore().collection("budgetitems").where("tripId", "==", tripId);
    let result = await query.get(); 
    return result.docs.map(
        (snapshot) => new BudgetItem(snapshot.data(), true)   
    );
}

export async function deleteBudgetItem(docId) {
    firebase.firestore().collection("budgetitems").doc(docId).delete();
}

export async function updateBudgetItems(docId, newAmount, newType) {
    firebase.firestore().collection("budgetitems").doc(docId).update ({
        amount: newAmount,
        type: newType
    })
}

export class BudgetItem {
    constructor({id, tripId, userId, amount, type}, fromFirestore=false) {
        this.id = id;
        this.tripId = tripId;
        this.userId = userId;
        this.amount = amount;
        this.type = type;
    }

    toJSON() {
        return {
            id: this.id,
            tripId: this.tripId,
            userId: this.userId,
            amount: this.amount,
            type: this.type      
        }
    }

    storeBudgetItem() {
        let newBudgetItemReference = firebase.firestore().collection("budgetitems").doc();
        this.id = newBudgetItemReference.id;
        return newBudgetItemReference.set(this.toJSON());
    }
}