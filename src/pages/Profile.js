import CargoInfo from "../components/cargo/Cargo";
import Car from "../components/car/Car";
import "./../styles/css/Profile.css";
import userImg from "../img/default.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import {jwtDecode} from "jwt-decode";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination/Pagination";

const getUser = async (token) => {
    const object = jwtDecode(token);
    const response = await axios.get("http://localhost:5036/api/User/Get/" + object.Id, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    return response.data;
};

const Profile = () => {
    const token = new Cookies().get("jwt_authorization");
    const [user, setUser] = useState({});
    const [activeTab, setActiveTab] = useState('cargo');


    const fetchData = async () => {
        try {
            const userData = await getUser(token);
            setUser(userData);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    let image;
    if (!user.image) {
        image = (
            <a href="#">
                <img className="media-object profile__media-object mw150" src={userImg} alt="connect" />
            </a>
        );
    } else {
        image = (
            <a href="#">
                <img className="media-object profile__media-object mw150" src={user.image} alt="connect" />
            </a>
        );
    }

    const [currentPageCargo, setCurrentPageCargo] = useState(1);
    const [postsPerPageCargo] = useState(4);
    const [totalCargo, setTotalCargo] = useState(0);
    const [cargo, setCargo] = useState([]);

    const getAllCargo = async () => {
        try {
            const response = await axios.get("http://localhost:5036/api/Cargo/GetByUserId", {
                params: {
                    id: jwtDecode(token).Id,
                    pageNumber: currentPageCargo
                }
            });
            if (response.data && response.data.items) {
                setCargo(response.data.items);
                setTotalCargo(response.data.totalCount); // Предполагаем, что сервер возвращает общее количество элементов
            } else {
                console.log("No data received");
            }
        } catch (error) {
            console.log('Error getting all cargo', error);
        }
    };

    const [currentPageCars, setCurrentPageCars] = useState(1);
    const [postsPerPageCars] = useState(4);
    const [totalCars, setTotalCars] = useState(0);
    const [cars, setCars] = useState([]);

    const getAllCars = async () => {
        try {
            const response = await axios.get("http://localhost:5036/api/Car/GetByUserId", {
                params: {
                    id: jwtDecode(token).Id,
                    pageNumber: currentPageCars
                }
            });
            if (response.data && response.data.items) {
                setCars(response.data.items);
                setTotalCars(response.data.totalCount); // Предполагаем, что сервер возвращает общее количество элементов
            } else {
                console.log("No data received");
            }
        } catch (error) {
            console.log('Error getting all cars', error);
        }
    };

    useEffect(() => {
        if (activeTab === 'cargo') {
            getAllCargo();
        } else {
            getAllCars();
        }
    }, [currentPageCargo, currentPageCars, activeTab]);

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
                            <br />
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
                        <div className="tabs">
                            <button className={`tab ${activeTab === 'cargo' ? 'active' : ''}`}
                                onClick={() => setActiveTab('cargo')}>
                                Ваши грузы
                            </button>
                            <button className={`tab ${activeTab === 'cars' ? 'active' : ''}`}
                                onClick={() => setActiveTab('cars')}>
                                Ваши машины
                            </button>
                        </div>
                        {activeTab === 'cargo' ? (
                            <>
                                <div className="tab-content profile__tab-content p30">
                                    <div className="container cargo__container cargo__cargo-info-grid">
                                        {cargo.length > 0 ? (
                                            cargo.map((cargo, index) => (
                                                <CargoInfo key={index} cargo={cargo} />
                                            ))
                                        ) : (
                                            <p>Загрузка...</p>
                                        )}
                                    </div>
                                </div>
                                <Pagination
                                    totalPosts={totalCargo}
                                    postsPerPage={postsPerPageCargo}
                                    setCurrentPage={setCurrentPageCargo}
                                    currentPage={currentPageCargo}
                                />
                                <br />
                            </>
                        ) : (
                            <>
                                <div className="tab-content profile__tab-content p30">
                                    <div className="container cargo__container cargo__cargo-info-grid">
                                        {cars.length > 0 ? (
                                            cars.map((car, index) => (
                                                <Car key={index} car={car} />
                                            ))
                                        ) : (
                                            <p>Загрузка...</p>
                                        )}
                                    </div>
                                </div>
                                <Pagination
                                    totalPosts={totalCars}
                                    postsPerPage={postsPerPageCars}
                                    setCurrentPage={setCurrentPageCars}
                                    currentPage={currentPageCars}
                                />
                                <br />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;