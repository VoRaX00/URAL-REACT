import CargoInfo from "../components/cargo/Cargo";
import "./../styles/css/Profile.css";
import userImg from "../img/default.png";
import {NavLink} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";

const cargoData = [
    { name: 'Cargo 1', weight: 10, year: 2020, price: '$20,000', comment: 'Комментарий'},
    { name: 'Cargo 2', weight: 20, year: 2021, price: '$22,000', comment: 'Комментарий'},
    { name: 'Cargo 3', weight: 30, year: 2019, price: '$18,000', comment: 'Комментарий'},
    { name: 'Cargo 4', weight: 40, year: 2022, price: '$25,000', comment: 'Комментарий'},
];

const getUser = async (token) => {
    const object = jwtDecode(token);
    const response = await axios.get("http://localhost:5036/api/User/Get/" + object.Id, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    return response.data
}

const Profile = () => {
    const token = new Cookies().get("jwt_authorization");
    const [user, setUser] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUser(token)
            setUser(userData)
        }
        fetchData()
    }, [token])

    let image;
    if (user.image === '') {
        image = (
            <a href="#">
                <img className="media-object profile__media-object mw150" src={userImg} alt="connect"/>
            </a>
        )
    }
    else {
        image = (
            <a href="#">
                <img className="media-object profile__media-object mw150" src={user.image} alt="connect"/>
            </a>
        )
    }

    return (
        <section id="content" className="container">
            <div className="page-heading">
                <div className="media">
                    <div className="media-left pr30">
                        {image}
                    </div>

                    <div className="media-body va-m">
                        <h2 className="media-heading">{user.userName}</h2>
                        <div className="media-body va-m">
                            <NavLink className="btn profile__btn" to={"/edit-profile"}>Редактировать профиль</NavLink>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="panel">
                        <div className="panel-heading">
                            <span className="panel-icon">
                                <i className="fa fa-star"></i>
                            </span>
                            <span className="panel-title">
                                Контактная информация
                            </span>
                        </div>
                        <div className="panel-body pn">
                            <ul>
                                <li className="form-text-contact">email: {user.email}</li>
                                <li className="form-text-contact">Номер телефон: {user.phoneNumber}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel-heading">
                            <span className="panel-icon">
                                <i className="fa fa-pencil"></i>
                            </span>
                            <span className="panel-title">Обо мне</span>
                        </div>
                        <div className="panel-body pb5">
                            <h6>{user.aboutMe}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="tab-block">
                        <div className="tab-content profile__tab-content p30">
                            <h2>Мои записи</h2>
                            <div className="container cargo__container cargo__cargo-info-grid">
                                {cargoData.map((cargo, index) => (
                                  <CargoInfo key={index} cargo={cargo}/>
                                ))}
                            </div>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
