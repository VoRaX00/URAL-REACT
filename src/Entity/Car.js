class Car {

    constructor() {
        this.name = "";
        this.capacity = 0;
        this.volume = 0;
        this.length = 0;
        this.width = 0;
        this.height = 0;
        this.whereFrom = "";
        this.whereTo = "";
        this.readyFrom = "";
        this.readyTo = "";
        this.phoneNumber = "";
        this.comment = "";
        this.bodyTypes = [];
        this.loadingTypes = [];
    }

    setName(name) {
        this.name = name;
    }

    setCapacity(capacity) {
        this.capacity = capacity;
    }

    setVolume(volume) {
        this.volume = volume;
    }

    setLength(length) {
        this.length = length;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    setWhereFrom(where) {
        this.whereFrom = where;
    }

    setWhereTo(where) {
        this.whereTo = where;
    }

    setReadyFrom(readyFrom) {
        this.readyFrom = readyFrom;
    }

    setReadyTo(readyTo) {
        this.readyTo = readyTo;
    }

    setBodyTypes(bodyTypes) {
        this.bodyTypes = bodyTypes;
    }

    handleMultiSelectChangeBody(multiSelect) {
        this.setBodyTypes(multiSelect);
    }

    setLoadingTypes(loadingTypes) {
        this.loadingTypes = loadingTypes;
    }

    handleMultiSelectChangeLoading(multiSelect) {
        this.setLoadingTypes(multiSelect);
    }

    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    setComment(comment) {
        this.comment = comment;
    }
}

export default Car;