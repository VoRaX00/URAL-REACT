class Cargo {

    constructor() {
        this.name = "";
        this.length = 0;
        this.width = 0;
        this.height = 0;
        this.weight = 0;
        this.volume = 0;
        this.countPlace = 0;
        this.loadingDate = "";
        this.unloadingDate = "";
        this.phoneNumber = "";
        this.loadingPlace = "";
        this.unloadingPlace = "";
        this.cash = false;
        this.cashless = false;
        this.cashlessNds = false;
        this.cashlessWithoutNds = false;
        this.priceCash = 0;
        this.priceCashNds = 0;
        this.priceCashWithoutNds = 0;
        this.requestPrice = false;
        this.comment = "";

        this.setName = this.setName.bind(this);
        this.setLength = this.setLength.bind(this);
        this.setWidth = this.setWidth.bind(this);
        this.setHeight = this.setHeight.bind(this);
        this.setWeight = this.setWeight.bind(this);
        this.setCountPlace = this.setCountPlace.bind(this);
        this.setLoadingDate = this.setLoadingDate.bind(this);
        this.setUnloadingDate = this.setUnloadingDate.bind(this);
        this.setPhoneNumber = this.setPhoneNumber.bind(this);
        this.setCash = this.setCash.bind(this);
        this.setCashless = this.setCashless.bind(this);
        this.setCashlessNds = this.setCashlessNds.bind(this);
        this.setCashlessWithoutNds = this.setCashlessWithoutNds.bind(this);
        this.setPriceCash = this.setPriceCash.bind(this);
        this.setPriceCashNds = this.setPriceCashNds.bind(this);
        this.setPriceCashWithoutNds = this.setCashlessWithoutNds.bind(this);
        this.setRequestPrice = this.setRequestPrice.bind(this);
        this.setComment = this.setComment.bind(this);
    }

    setName = (name) => {
        this.name = name;
    }

    setLength = (length) => {
        this.length = length;
    }

    setWidth = (width) => {
        this.width = width;
    }

    setHeight = (height) => {
        this.height = height;
    }

    setWeight = (weight) => {
        this.weight = weight;
    }

    setVolume = (volume) => {
        this.aboutMe = volume;
    }

    setCountPlace = (countPlace) => {
        this.countPlace = countPlace;
    }

    setLoadingDate = (loadingDate) => {
        this.loadingDate = loadingDate;
    }

    setUnloadingDate = (unloadingDate) => {
        this.unloadingDate = unloadingDate;
    }

    setLoadingPlace = (loadingPlace) => {
        this.loadingPlace = loadingPlace;
    }

    setUnloadingPlace = (unloadingPlace) => {
        this.unloadingPlace = unloadingPlace;
    }

    setPhoneNumber = (phoneNumber) => {
        this.phoneNumber = phoneNumber;
    }

    setCash = (cash) => {
        this.cash = cash;
    }

    setCashless = (cashless) => {
        this.cashless = cashless
    }

    setCashlessNds = (cashlessNds) => {
        this.cashlessNds = cashlessNds
    }

    setCashlessWithoutNds = (cashlessWithoutNds) => {
        this.cashlessWithoutNds = cashlessWithoutNds;
    }

    setPriceCash = (priceCash) => {
        this.priceCash = priceCash;
    }

    setPriceCashNds = (priceCashNds) => {
        this.priceCashNds = priceCashNds;
    }

    setPriceCashWithoutNds = (priceCashWithoutNds) => {
        this.priceCashWithoutNds = priceCashWithoutNds;
    }

    setRequestPrice = (requestPrice) =>{
        this.requestPrice = requestPrice;
    }

    setComment = (comment) =>{
        this.comment = comment;
    }
}

export default Cargo;