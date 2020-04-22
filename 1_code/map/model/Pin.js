import firebase from '../../Firebase.js';

const mode = 'driving';
const APIKEY = 'AIzaSyAcCFMyoLheBKHhQ5Hj_murJb7tDP1QiPk';

export async function fetchPins(tripId) {
    let query = firebase.firestore().collection("pins").where("tripId", "==", tripId);
    let result = await query.get();
    return result.docs.map(
        (snapshot) => new Pin(snapshot.data())
    );
}

function decode(t,e){for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}

export async function getRoute(origin, destination) {

    return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`)
        .then(response => response.json())
        .then(responseJSON => {
            //console.log(responseJSON);
            if (responseJSON.routes.length) {
                let route = this.decode(responseJSON.routes[0].overview_polyline.points);
                console.log(route);
                return route;
            }
        }).catch(e => console.log(e));
}

export class Pin {
    constructor({id, tripId, userId, coords, title, description, photoUrl}) {
        this.id = id;
        this.tripId = tripId;
        this.userId = userId;
        this.coords = coords;
        this.title = title;
        this.description = description;
        this.photoUrl = photoUrl;
    }

    toJSON() {
        return {
            id: this.id,
            tripId: this.tripId,
            userId: this.userId,
            coords: this.coords,
            title: this.title,
            description: this.description,
            photoUrl: this.photoUrl
        }
    }

    async storePin() {
        let ref = firebase.firestore().collection("pins").doc();
        this.id = ref.id;
        return ref.set(this.toJSON());
    }
}