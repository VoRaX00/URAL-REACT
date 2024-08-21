import React, {SyntheticEvent, useState} from 'react';
import Cookies from "universal-cookie";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import {ip} from "../../env/env";
import './style.css'

const AddNotificationCar = async (car, userId, token) => {
    const requestData = {
        firstUserComment: "empty",
        secondUserComment: car.comment,
        carId: car.id,
        firstUserId: userId,
        secondUserId: car.userId,
    }

    await axios.post(`http://${ip}/api/NotifyCar/Add`, requestData,
        {headers: {"Authorization": `Bearer ${token}`}});
}

const DeleteCar = async (carId, token) => {
    await axios.delete(`http://${ip}/api/Car/Delete/${carId}`, {headers: { "Authorization": `Bearer ${token}` },});
}

const CarInfo = ({ car, typeSubmit }) => {
    const [activeTab, setActiveTab] = useState('info');
    const token = new Cookies().get("jwt_authorization");

    const submit = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();

            switch (typeSubmit) {
                case 'Car': {
                    const userId = jwtDecode(token).Id;
                    if (userId === car.userId)
                        throw new Error("Id equals");

                    await AddNotificationCar(car, userId, token);
                    break;
                }
                case 'Profile': {
                    await DeleteCar(car.id, token)
                    break;
                }
                default:
                    console.log('default case car')
                    break
            }

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="cars-item">
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'info' ? 'active' : ''}`}
                    onClick={() => setActiveTab('info')}>
                    Информация
                </button>
                <button className={`tab ${activeTab === 'comment' ? 'active' : ''}`} onClick={() => setActiveTab('comment')}>
                    Комментарий
                </button>
            </div>
        {activeTab === 'info' ? (
            <div className="cars-details">
                <p className="cars-name">{car.name}</p>
                <div className="cars-details-row">
                    <div className="cars-font">
                        <strong>Тип кузова:</strong>
                        <ul>
                            {car.bodyTypes.map((bodyType) => (
                                <li className="cars-font" key={bodyType.id}>{bodyType.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="cars-font">
                        <strong>Тип разгрузки:</strong>
                        <ul>
                            {car.loadingTypes.map((loadingType) => (
                                <li className="cars-font" key={loadingType.id}>{loadingType.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="cars-details-row">
                    <p className="cars-font">Вместимость: {car.capacity}, Объем: {car.volume}</p>
                </div>
                <div className="cars-details-row">
                    <p className="cars-font">Ширина: {car.width}, Высота: {car.height}</p>
                </div>
                <div className="cars-details-row">
                    <p className="cars-font">Откуда: {car.whereFrom} | Куда: {car.whereTo}</p>
                    <p className="cars-font">Загрузка: {car.readyFrom} | Разгрузка: {car.readyTo}</p>
                </div>
                <div className="cars-details-row">
                    <p className="cars-font">Телефон: {car.phone}</p>
                </div>
            </div>
        ) : (
            <div className="tab-content-comment">
                <h5>{car.comment}</h5>
            </div>
        )}
            {typeSubmit === 'Car' ? (
                <div className="cars-actions">
                    <button className="cars-action-button" onClick={submit}>Откликнуться</button>
                </div>
            ) : (
                <div className="cars-actions">
                    <button className="cars-action-button" onClick={submit}>Удалить</button>
                </div>
            )}

        </div>
    );
};

export default CarInfo;