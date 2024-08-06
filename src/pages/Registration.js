import React, {SyntheticEvent, useState} from "react";
import '../styles/css/Registration.css'
import {Navigate} from "react-router-dom";
import Phone from "../components/phone/Phone";
import {ip} from "../env/env";

const Registration = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordAccess, setPasswordAccess] = React.useState("");
    const [redirect, setRedirect] = React.useState(false);
    const [phone, setPhone] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            console.log(`${ip.string}`)
            const response = await fetch(`http://${ip}/api/User/Register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "clientUri": "http://bscar-go.ru/confirmEmail/",
                },
                body: JSON.stringify({
                    password: password,
                    userName: name,
                    email: email,
                    phoneNumber: phone,
                })
            });

            if (response.ok) {
                if (password === passwordAccess && password.length > 0)
                    setRedirect(true);
                else
                    throw "Пароли не совпадают"
            } else
                throw "Не удалось выполнить запрос"
        }
        catch (error) {
            console.log(error);
        }
    }

    if(redirect) {
        return <Navigate to={"/login"}/>
    }

    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <form className="card p-5 register-form shadow" action="#" method="post" onSubmit={submit}>
                <h2 className="text-center mb-4">Регистрация</h2>

                <div className="mb-3">
                    <label htmlFor="userName" className="form-label form-text">Имя</label>
                    <input type="text" name="name" className="form-control" id="userName" required
                           onChange={e => setName(e.target.value)}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="userEmail" className="form-label form-text">Адрес электронной почты</label>
                    <input type="email" name="email" className="form-control" id="userEmail"
                           aria-describedby="emailHelp" required
                           onChange={e => setEmail(e.target.value)}/>
                </div>

                <div className="mb-3">
                    <Phone value={phone} onChange={setPhone}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label form-text">Пароль</label>
                    <input type="password" name="password" className="form-control" id="InputPassword" required
                           onChange={e => setPassword(e.target.value)}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="AccessInputPassword" className="form-label form-text">Подтвердить пароль</label>
                    <input type="password" name="password" className="form-control" id="AccessInputPassword" required
                           onChange={e => setPasswordAccess(e.target.value)}/>
                </div>

                <div className="d-flex flex-column align-items-center">
                    <button type="submit" className="btn btn-dark mb-3 from-text">Зарегистрироваться</button>
                </div>
            </form>
        </div>
    );
};

export default Registration;