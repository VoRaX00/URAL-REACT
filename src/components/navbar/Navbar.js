import notify from "./../../img/notification.svg";
import user from "./../../img/user-regular.svg";
import "./../../styles/css/style.css";
import "./style.css";
import CustomDropdown from "../dropdown/Dropdown";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleDropdownChangeNotify = (selectedOption) => {
        navigate(selectedOption.url);
    };

    const handleDropdownChangeProfile = (selectedOption) => {
        if (selectedOption.action === 'logout') {
            logout();
            navigate("/login");
        } else {
            navigate(selectedOption.url);
        }
    };

    const menu = isAuthenticated ? (
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
                />
            </ul>
        </>
    ) : (
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
    );

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
};

export default Navbar;