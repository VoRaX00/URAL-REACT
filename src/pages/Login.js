import React from "react";
import '../styles/css/Login.css'
import {NavLink, useNavigate} from "react-router-dom";
import {SyntheticEvent} from "react";
import {useAuth} from "../context/AuthContext";
import {ip} from "../env/env";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate()
    const {login} = useAuth()

    const submit = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            const response = await fetch(`http://${ip}/api/User/Login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            });
            if (response.ok) {
                const token = await response.text();
                if (token) {
                    login(token)
                    navigate("/")
                }
            }
        }
        catch(error) {
            console.error(`Error with login: ${error}`)
        }
    }

    return(
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <form className="card p-5 login-form login__shadow" method="post" onSubmit={submit}>
                <h2 className="text-center mb-4">Вход</h2>
                <div className="mb-3">
                    <label htmlFor="userEmail" className="form-label login__form-text">Адрес электронной почты</label>
                    <input type="email" name="email" className="form-control" id="userEmail"
                           aria-describedby="emailHelp" required
                    onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label login__form-text">Пароль</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" required
                    onChange={e  => setPassword(e.target.value)}/>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <button type="submit" className="btn btn-dark mb-3 login__form-text">Войти</button>
                    <NavLink to={"/registration"} className="register-link login__form-text">Зарегистрироваться</NavLink>
                </div>
            </form>
        </div>
    )
};

export default Login;