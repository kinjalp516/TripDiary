class Trip {
    constructor(name, location, start, end) {
        this.theCalendar = null;
        this.name = name;
        this.location = location;
        this.startDate = start;
        this.endDate = end;
    }

    get theTrip() {
        return this;
    }
    
}

export default Trip;