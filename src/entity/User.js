class User {

    constructor() {
        this.id = "";
        this.name = "";
        this.email = "";
        this.aboutMe = "";
        this.phoneNumber = "";
        this.image = "";

        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPhoneNumber = this.setPhoneNumber.bind(this);
        this.setAboutMe = this.setAboutMe.bind(this);
        this.setImage = this.setImage.bind(this);
    }

    setName = (name) => {
        this.name = name;
    }

    setEmail = (email) => {
        this.email = email;
    }

    setAboutMe = (aboutMe) => {
        this.aboutMe = aboutMe;
    }

    setPhoneNumber = (number) => {
        this.phoneNumber = number;
    }

    setImage = (image) => {
        this.image = image;
    }
}

export default User;