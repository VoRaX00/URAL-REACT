class User {
    constructor(id, name, email, aboutMe, phoneNumber, image) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.aboutMe = aboutMe;
        this.phoneNumber = phoneNumber;
        this.image = image;
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