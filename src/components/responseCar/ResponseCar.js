import React, {SyntheticEvent, useState} from 'react';
import Cookies from "universal-cookie";
import axios from "axios";
import {ip} from "../../env/env";
import './style.css'

const cancelNotify = async ({responseId, token}) => {
    const requestData = {
        id: responseId,
        firstUserStatus: "n",
        secondUserStatus: "u",
        firstUserComment: "",
        secondUserComment: "",
    }

    await axios.put(`http://${ip}/api/NotifyCar/Update`, requestData, {
        headers: { "Authorization": `Bearer ${token}` },
        params: {id: responseId}
    });
}

const ResponseCar = ({ response }) => {
    const [activeTab, setActiveTab] = useState('info');
    const token = new Cookies().get("jwt_authorization");

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await cancelNotify(response.id, token);
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
                <p className="cars-name">{response.car.name}</p>
                <div className="cars-details-row">
                    <div className="cars-font">
                        <strong>Тип кузова:</strong>
                        <ul>
                            {response.car.bodyTypes.map((bodyType) => (
                                <li className="cars-font" key={bodyType.id}>{bodyType.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="cars-font">
                        <strong>Тип разгрузки:</strong>
                        <ul>
                            {response.car.loadingTypes.map((loadingType) => (
                                <li className="cars-font" key={loadingType.id}>{loadingType.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="cars-details-row">
                    <p className="cars-font">Вместимость: {response.car.capacity}, Объем: {response.car.volume}</p>
                </div>
                <div className="cars-details-row">
                    <p className="cars-font">Ширина: {response.car.width}, Высота: {response.car.height}</p>
                </div>
                <div className="cars-details-row">
                    <p className="cars-font">Откуда: {response.car.whereFrom} | Куда: {response.car.whereTo}</p>
                    <p className="cars-font">Загрузка: {response.car.readyFrom} | Разгрузка: {response.car.readyTo}</p>
                </div>
                <div className="cars-details-row">
                    <p className="cars-font">Телефон: {response.car.phone}</p>
                </div>
            </div>
        ) : (
            <div className="tab-content-comment">
                <h5>{response.car.comment}</h5>
            </div>
        )}
            <div className="cars-actions">
                <button className="cars-action-button" onClick={submit}>Удалить</button>
            </div>
        </div>
    );
};

export default ResponseCar;