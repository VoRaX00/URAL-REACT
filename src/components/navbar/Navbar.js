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
  { value: 'Выход', label: 'Мои отклики', url: '/logout' },
];

const handleDropdownChangeNotify = (selectedOption) => {
  window.location.href = selectedOption.url;
};

const handleDropdownChangeProfile = (selectedOption) => {
    window.location.href = selectedOption.url;
}

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark top-menu">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={"/"}>
                    BSCAR-GO
                </NavLink>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                        {/*<div className="dropdown">*/}
                            <CustomDropdown
                                options={notification}
                                onChange={handleDropdownChangeNotify}
                                dropdownIndicatorImg={notify}
                            />
                        {/*</div>*/}
                        {/*<div className="dropdown">*/}
                             <CustomDropdown
                                options={profile}
                                onChange={handleDropdownChangeProfile}
                                dropdownIndicatorImg={user}
                            />
                        {/*    <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"*/}
                        {/*       aria-expanded="false">*/}
                        {/*        <img src={user}/>*/}
                        {/*    </a>*/}
                        {/*    <ul className="dropdown-menu">*/}
                        {/*        <li><a className="dropdown-item" href="#">Вход</a></li>*/}
                        {/*        <li><a className="dropdown-item" href="#">Регистрация</a></li>*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;