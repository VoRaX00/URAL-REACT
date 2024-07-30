class User {

    constructor() {
        this.id = "";
        this.name = "";
        this.email = "";
        this.aboutMe = "";
        this.phoneNumber = "";
        this.image = "";
    }

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setEmail(email) {
        this.email = email;
    }

    setAboutMe(aboutMe) {
        this.aboutMe = aboutMe;
    }

    setPhoneNumber(number) {
        this.phoneNumber = number;
    }

    setImage(image) {
        this.image = image;
    }
}

export default User;