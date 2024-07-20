import notify from "./../../img/notification.svg"
import user from "./../../img/user-regular.svg"
import "./../../styles/css/style.css"
import "./style.css"
import CustomDropdown from "../dropdown/Dropdown";

const options = [
  { value: 'Мои уведомления', label: 'Мои уведомления', url: '/notifications' },
  { value: 'Мои отклики', label: 'Мои отклики', url: '/responses' },
  { value: 'Согласованные предложения', label: 'Согласованные предложения', url: '/match' },
];

const handleDropdownChange = (selectedOption) => {
  window.location.href = selectedOption.url;
};

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark top-menu">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">BSCAR-GO</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg- top-menu">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Главная страница</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Найти машину</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Найти груз</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Разместить машину</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Разместить груз</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <div className="dropdown">
                            <CustomDropdown
                                options={options}
                                onChange={handleDropdownChange}
                                dropdownIndicatorImg={notify}
                            />
                        </div>
                        <div className="dropdown">
                            <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                <img src={user}/>
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Вход</a></li>
                                <li><a className="dropdown-item" href="#">Регистрация</a></li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;