import firebase from '../../Firebase.js';

export async function getInformation(loc, tripId) {

    //fetch and process information from api
      return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc.coords.latitude},${loc.coords.longitude}&rankby=distance&type=restaurant&keyword=cruise&key=AIzaSyB4f8HruyOxAlhEP6-FK6vGoJ9Qu643M9w`)
            .then((response) => response.json())
            .then((data) => {
                return data.results.map(item => {
                    let photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&maxheight=200&photoreference=${item.photos[0].photo_reference}&key=AIzaSyB4f8HruyOxAlhEP6-FK6vGoJ9Qu643M9w`
                    return new Retrieve(item.name, item.price_level, item.rating, item.vicinity, item.opening_hours, false, 
                    item.place_id, 'Save', photoUrl, {latitude: item.geometry.location.lat, longitude: item.geometry.location.lng}, tripId);
                })
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                 // ADD THIS THROW error
                  throw error;
                });
}

var savedItemsWrapper = {
    savedItems: [],
    savedState: []
}

export async function fetchAttractions(tripId) {
    let query = firebase.firestore().collection("attractions").where("tripId", "==", tripId);
    let result = await query.get();
    return result.docs.map(
        (snapshot) =>  {
            let data = snapshot.data();
            return new Retrieve(data.name, data.price, data.rating, data.address, data.opening_hours, data.saved, data.id, data.buttonText, data.photoRef, data.coords, data.tripId);
        }
    );
}


export function addSavedItems(state){

    savedItemsWrapper.savedItems.push(state);

}

export function setSavedItems(state){
    savedItemsWrapper.savedItems = state;
}

export function getSavedItems(){
    return savedItemsWrapper.savedItems;
}

export function setSavedState(state){
    savedItemsWrapper.savedState = state;
}

export function getSavedState(){
    return savedItemsWrapper.savedState;
}



//class for storing different result items
export class Retrieve{
    constructor(name, price, rating, address, opening_hours, saved, id, buttonText, photoRef, coords, tripId) {
        this.name = name;
        this.price = price;
        this.rating = rating; 
        this.address = address;
        this.opening_hours = opening_hours;
        this.id = id;
        this.saved = saved;
        this.buttonText = buttonText;
        this.photoRef = photoRef;
        this.coords = coords;
        this.tripId = tripId;

        if(opening_hours == undefined || (Object.keys(opening_hours).length === 0)){
            var opening = {
                open_now: 'N/A'
            }

            this.opening_hours = opening;
        } else {
         this.opening_hours = opening_hours;
        }

        if(price == undefined){
            this.price = "N/A";
        } else {
         this.price = price;
        }
    }

    toJSON() {
        return {
            name: this.name,
            price: this.price,
            rating: this.rating,
            address: this.address,
            opening_hours: this.opening_hours,
            id: this.id,
            saved: this.saved,
            buttonText: this.buttonText,
            photoRef: this.photoRef,
            coords: this.coords,
            tripId: this.tripId
        }
    }

    async storeAttraction() {
        let ref = firebase.firestore().collection("attractions").doc();
        this.id = ref.id;
        return ref.set(this.toJSON());
    }
    
}

