import "../styles/css/EditProfile.css"
import React, {SyntheticEvent, useState} from "react";
import {NavLink} from "react-router-dom";

const EditProfile = (props: {user: User => void}) => {
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await fetch("http://localhost:5036/api/User/EditProfile", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                userName: props.user.name,
                email: props.user.email,
                phoneNumber: props.user.phoneNumber,
                aboutMe: props.user.aboutMe,
                image: props.user.image,
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
                    <input type="text" name='name' value={props.user.name} className="form-control" id="exampleInputName"
                           onChange={e => props.user.setName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label form-text">Адрес электронной почты</label>
                    <input type="email" value={props.user.email} name='email' className="form-control" id="InputEmail" aria-describedby="emailHelp"
                           onChange={e => props.user.setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail" className="form-label form-text">Номер телефона</label>
                    <input type="tel" value={props.user.phoneNumber} name='phone' className="form-control" id="InputPhone"
                            onChange={e => props.user.setPhoneNumber(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label form-text">Загрузите изображение</label>
                    <br/>
                    <input type="file" className="form-control-file" id="image" name="image" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="aboutMe" className="form-label form-text">Обо мне</label>
                    <textarea className="form-control form-text" id="aboutMe" name="aboutMe" rows="5"
                              onChange={e => props.user.setAboutMe(e.target.value)}>{props.user.aboutMe}</textarea>
                </div>
                <button type="submit" className="btn btn-dark form-text">Изменить</button>
            </form>
        </div>
    );
}

export default EditProfile;