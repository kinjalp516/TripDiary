class User {
    constructor() {
        this.isTraveling = false;
        this.numOfTrips = 0;
        this.trips = [];
    }

    addTrip(trip) {
        this.trips.push(trip);
    }

    removeTrip(trip) {
        this.trips = this.trips.filter(item => {
            return item !== trip;
        })
    }
}