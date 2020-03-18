class Calendar {
    constructor(numOfDays) {
        this.numOfDays = numOfDays;
        this.dailySummarys = [];
    }

    get theCalendar() {
        return this;
    }
}

export default Calendar;