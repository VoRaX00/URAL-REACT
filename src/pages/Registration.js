import '../styles/css/Registration.css'

const Registration = () => {
    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <form className="card p-5 register-form shadow" action="#" method="post">
                <h2 className="text-center mb-4">Регистрация</h2>

                <div className="mb-3">
                    <label htmlFor="userName" className="form-label form-text">Имя</label>
                    <input type="text" name="name" className="form-control" id="userName" required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="userEmail" className="form-label form-text">Адрес электронной почты</label>
                    <input type="email" name="email" className="form-control" id="userEmail" aria-describedby="emailHelp" required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label form-text">Пароль</label>
                    <input type="password" name="password" className="form-control" id="InputPassword" required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="AccessInputPassword" className="form-label form-text">Подтвердить пароль</label>
                    <input type="password" name="password" className="form-control" id="AccessInputPassword" required/>
                </div>

                <div className="d-flex flex-column align-items-center">
                    <button type="submit" className="btn btn-dark mb-3 from-text">Зарегистрироваться</button>
                </div>
            </form>
        </div>
    );
};

export default Registration;