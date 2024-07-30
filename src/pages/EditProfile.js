import "../styles/css/EditProfile.css"
import React, {SyntheticEvent, useState} from "react";
import {NavLink} from "react-router-dom";
import {pem as jwt} from "node-forge";
import axios from "axios";

const EditProfile = ({token}) => {
    const [redirect, setRedirect] = useState(false);

    const object = jwt.decode(token);

    const user = axios.get("http://localhost:5036/api/User/Get", {
        params: {
            id: object.Id
        },
    });

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await fetch("http://localhost:5036/api/User/Update", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: user.id,
                password: user.password,
                userName: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                aboutMe: user.aboutMe,
                image: user.image,
            })
        });
        setRedirect(true);
    }

    if(redirect) {
        return <NavLink to={"/profile"}/>
    }

    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <form className='card p-5' action="#" encType="multipart/form-data" method="post" onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label form-text">Имя</label>
                    <input type="text" name='name' value={user.name} className="form-control" id="exampleInputName"
                           onChange={e => user.setName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label form-text">Адрес электронной почты</label>
                    <input type="email" value={user.email} name='email' className="form-control" id="InputEmail" aria-describedby="emailHelp"
                           onChange={e => user.setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail" className="form-label form-text">Номер телефона</label>
                    <input type="tel" value={user.phoneNumber} name='phone' className="form-control" id="InputPhone"
                            onChange={e => user.setPhoneNumber(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label form-text">Загрузите изображение</label>
                    <br/>
                    <input type="file" className="form-control-file" id="image" name="image" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="aboutMe" className="form-label form-text">Обо мне</label>
                    <textarea className="form-control form-text" id="aboutMe" name="aboutMe" rows="5"
                              onChange={e => user.setAboutMe(e.target.value)}>{user.aboutMe}</textarea>
                </div>
                <button type="submit" className="btn btn-dark form-text">Изменить</button>
            </form>
        </div>
    );
}

export default EditProfile;