const Login = () => {
    return(
        <>
            <div className="container min-vh-100 d-flex justify-content-center align-items-center">
                <form className="card p-5 login-form shadow" action="#" method="post">
                    <h2 className="text-center mb-4">Вход</h2>
                    <div className="mb-3">
                        <label htmlFor="userEmail" className="form-label form-text">Адрес электронной почты</label>
                        <input type="email" name="email" className="form-control" id="userEmail"
                               aria-describedby="emailHelp" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label form-text">Пароль</label>
                        <input type="password" name="password" className="form-control" id="exampleInputPassword1"
                               required/>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <button type="submit" className="btn btn-dark mb-3 from-text">Войти</button>
                        <a href="#" className="register-link form-text">Зарегистрироваться</a>
                    </div>
                </form>
            </div>
        </>
    )
};

export default Login;