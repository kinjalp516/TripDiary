class Pin {
    constructor(latitude, longitude) {
        this.lat = latitude;
        this.lng = longitude;
    }

    get thePin() {
        return this;
    }
}

export default Pin;