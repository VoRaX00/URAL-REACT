import "../styles/css/EditProfile.css";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import {ip} from "../env/env";

const getUser = async (token) => {
    const object = jwtDecode(token);
    const response = await axios.get(`http://${ip}/api/User/Get/` + object.Id, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    return response.data;
};

const EditProfile = () => {
    const token = new Cookies().get("jwt_authorization");
    const [user, setUser] = useState({});
    const [redirect, setRedirect] = useState(false);

    const fetchData = async () => {
        try {
            const userData = await getUser(token);
            setUser(userData);
        }
        catch (error){
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const submit = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            console.log(user)
            await fetch(`http://${ip}/api/User/Update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                body: JSON.stringify({
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    aboutMe: user.aboutMe,
                    image: user.image,
                })
            });
            setRedirect(true);
        }
        catch (error) {
            console.log(error);
        }
    };

    if (redirect) {
        return <Navigate to="/profile" />;
    }

    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <form className="card p-5" encType="multipart/form-data" method="post" onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label form-text">Имя</label>
                    <input
                        type="text"
                        name="name"
                        value={user.userName || ''}
                        className="form-control"
                        id="exampleInputName"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label form-text">Адрес электронной почты</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email || ''}
                        className="form-control"
                        id="InputEmail"
                        aria-describedby="emailHelp"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPhone" className="form-label form-text">Номер телефона</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={user.phoneNumber || ''}
                        className="form-control"
                        id="InputPhone"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label form-text">Загрузите изображение</label>
                    <br />
                    <input
                        type="file"
                        className="form-control-file"
                        id="image"
                        name="image"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="aboutMe" className="form-label form-text">Обо мне</label>
                    <textarea
                        className="form-control form-text"
                        id="aboutMe"
                        name="aboutMe"
                        rows="5"
                        value={user.aboutMe || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-dark form-text">Изменить</button>
            </form>
        </div>
    );
};

export default EditProfile;