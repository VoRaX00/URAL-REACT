import React, {SyntheticEvent, useState} from 'react';
import Cookies from "universal-cookie";
import axios from "axios";
import {ip} from "../../env/env";
import './style.css'

const cancelResponse = async (responseId, token) => {
    await axios.put(`http://${ip}/api/NotifyCar/Delete/${responseId}`, {
        headers: { "Authorization": `Bearer ${token}` },
    });
}

const MatchCar = ({ match }) => {
    const [activeTab, setActiveTab] = useState('info');
    const token = new Cookies().get("jwt_authorization");

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await cancelResponse(match.id, token);
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
                <p className="cars-name">{match.car.name}</p>
                <div className="cars-details-row">
                    <div className="cars-font">
                        <strong>Тип кузова:</strong>
                        <ul>
                            {match.car.bodyTypes.map((bodyType) => (
                                <li className="cars-font" key={bodyType.id}>{bodyType.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="cars-font">
                        <strong>Тип разгрузки:</strong>
                        <ul>
                            {match.car.loadingTypes.map((loadingType) => (
                                <li className="cars-font" key={loadingType.id}>{loadingType.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="cars-details-row">
                    <p className="cars-font">Вместимость: {match.car.capacity}, Объем: {match.car.volume}</p>
                </div>
                <div className="cars-details-row">
                    <p className="cars-font">Ширина: {match.car.width}, Высота: {match.car.height}</p>
                </div>
                <div className="cars-details-row">
                    <p className="cars-font">Откуда: {match.car.whereFrom} | Куда: {match.car.whereTo}</p>
                    <p className="cars-font">Загрузка: {match.car.readyFrom} | Разгрузка: {match.car.readyTo}</p>
                </div>
                <div className="cars-details-row">
                    <p className="cars-font">Телефон: {match.car.phone}</p>
                </div>
            </div>
        ) : (
            <div className="tab-content-comment">
                <h5>{match.car.comment}</h5>
            </div>
        )}
            <div className="cars-actions">
                <button className="cars-action-button" onClick={submit}>Удалить</button>
            </div>
        </div>
    );
};

export default MatchCar;