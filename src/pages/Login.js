import React from "react";
import '../styles/css/Login.css'
import {NavLink} from "react-router-dom";
import {SyntheticEvent} from "react";

const Login = (props: { setName: (name: string) => void}) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [redirect, setRedirect] = React.useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5036/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        const content = await response.json();

        setRedirect(true);
        props.setName(content.name);
    }

    if(redirect) {
        return <NavLink to={"/"}/>;
    }

    return(
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <form className="card p-5 login-form login__shadow" method="post" onSubmit={submit}>
                <h2 className="text-center mb-4">Вход</h2>
                <div className="mb-3">
                    <label htmlFor="userEmail" className="form-label form-text">Адрес электронной почты</label>
                    <input type="email" name="email" className="form-control" id="userEmail"
                           aria-describedby="emailHelp" required
                    onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label form-text">Пароль</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" required
                    onChange={e  => setPassword(e.target.value)}/>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <button type="submit" className="btn btn-dark mb-3 from-text">Войти</button>
                    <NavLink to={"/registration"} className="register-link form-text">Зарегистрироваться</NavLink>
                </div>
            </form>
        </div>
    )
};

export default Login;