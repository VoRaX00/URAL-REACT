import notify from "./../../img/notification.svg"
import user from "./../../img/user-regular.svg"
import "./../../styles/css/style.css"
import "./style.css"
import CustomDropdown from "../dropdown/Dropdown";

import {NavLink} from "react-router-dom";

const notification = [
  { value: 'Мои уведомления', label: 'Мои уведомления', url: '/notifications' },
  { value: 'Мои отклики', label: 'Мои отклики', url: '/responses' },
  { value: 'Согласованные предложения', label: 'Согласованные предложения', url: '/match' },
];

const profile = [
  { value: 'Профиль', label: 'Профиль', url: '/profile' },
  { value: 'Выход', label: 'Выход', action: 'logout' },
];

const unauthorized = [
  { value: 'Вход', label: 'Вход', url: '/login' },
  { value: 'Регистрация', label: 'Регистрация', url: '/registration' },
];

const handleDropdownChangeNotify = (selectedOption) => {
  window.location.href = selectedOption.url;
};

const handleDropdownChangeProfile = (selectedOption) => {
    window.location.href = selectedOption.url;
}

const logout = async(props: {name: string, setName: (name: string) => void}) => {
        const response = await fetch("http://localhost:5036/api/Login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                password: "1111",
                userName: "Nikita",
                email: "nikita@gmail.com",
                phoneNumber: 79991259179,
            })
        })

        if(!response.ok)
            return;

        const content = await response.json();
        console.log(content);
        props.setName('');
    }

const Navbar = (props: {name: string, setName: (name: string) => void}) => {


    let menu;

    if (props.name === '') {
        menu = (
            <>
                <ul className="navbar-nav me-auto mb-2 mb-lg- top-menu">
                    <li className="nav-item">
                        <NavLink to={"/login"} className="nav-link">Найти машину</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/login"} className="nav-link">Найти груз</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/login"} className="nav-link">Разместить машину</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/login"} className="nav-link">Разместить груз</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <CustomDropdown
                        options={unauthorized}
                        onChange={handleDropdownChangeProfile}
                        dropdownIndicatorImg={user}
                    />
                </ul>
            </>
        )
    }
    else{
        menu = (
            <>
                <ul className="navbar-nav me-auto mb-2 mb-lg- top-menu">
                    <li className="nav-item">
                        <NavLink to={"/cars"} className="nav-link">Найти машину</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/cargo"} className="nav-link">Найти груз</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/add-car"} className="nav-link">Разместить машину</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/add-cargo"} className="nav-link">Разместить груз</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <CustomDropdown
                        options={notification}
                        onChange={handleDropdownChangeNotify}
                        dropdownIndicatorImg={notify}
                    />
                    <CustomDropdown
                        options={profile}
                        onChange={handleDropdownChangeProfile}
                        dropdownIndicatorImg={user}
                        logout={logout(props)}
                    />
                </ul>
            </>
        )
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark top-menu">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={"/"}>
                    BSCAR-GO
                </NavLink>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {menu}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;