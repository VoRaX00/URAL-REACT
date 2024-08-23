import React, {SyntheticEvent, useState} from 'react';
import Cookies from "universal-cookie";
import axios from "axios";
import {ip} from "../../env/env";
import './style.css'

const AddChat = async (name, notifyId, firstUserId, token) => {
    const requestData = {
        name: name,
        notifyCargoId: null,
        notifyCarId: notifyId,
        firstUserId: firstUserId,
    }

    await axios.post(`http://${ip}/api/Chat/Add`, requestData, {
        headers: { "Authorization": `Bearer ${token}` }
    })
}

const AcceptNotify = async (notifyId, token) => {
    const requestData = {
        id: notifyId,
        firstUserStatus: "y",
        secondUserStatus: "y",
        firstUserComment: "",
        secondUserComment: "",
    }

    await axios.put(`http://${ip}/api/NotifyCar/Update/${notifyId}`, requestData, {
        headers: { "Authorization": `Bearer ${token}` },
    });
}

const RejectNotify = async (notifyId, token) => {
    const requestData = {
        id: notifyId,
        firstUserStatus: "y",
        secondUserStatus: "n",
        firstUserComment: "",
        secondUserComment: "",
    }

    await axios.put(`http://${ip}/api/NotifyCar/Update/${notifyId}`, requestData, {
        headers: { "Authorization": `Bearer ${token}` },
    });
}

const NotifyCar = ({ notify }) => {
    const [activeTab, setActiveTab] = useState('info');
    const token = new Cookies().get("jwt_authorization");

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await AcceptNotify(notify.id, token);
            await AddChat(notify.car.name, notify.id, token);
        } catch (error) {
            console.log(error);
        }
    };

    const reject = async (e: SyntheticEvent) => {
        e.preventDefault()
        try{
            await RejectNotify(notify.id, token);
        } catch (error){
            console.log(error);
        }
    }

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
                <p className="cars-name">{notify.car.name}</p>
                <div className="cars-details-row">
                    <div className="cars-font">
                        <strong>Тип кузова:</strong>
                        <ul>
                            {notify.car.bodyTypes.map((bodyType) => (
                                <li className="cars-font" key={bodyType.id}>{bodyType.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="cars-font">
                        <strong>Тип разгрузки:</strong>
                        <ul>
                            {notify.car.loadingTypes.map((loadingType) => (
                                <li className="cars-font" key={loadingType.id}>{loadingType.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="cars-details-row">
                    <p className="cars-font">Вместимость: {notify.car.capacity}, Объем: {notify.car.volume}</p>
                </div>
                <div className="cars-details-row">
                    <p className="cars-font">Ширина: {notify.car.width}, Высота: {notify.car.height}</p>
                </div>
                <div className="cars-details-row">
                    <p className="cars-font">Откуда: {notify.car.whereFrom} | Куда: {notify.car.whereTo}</p>
                    <p className="cars-font">Загрузка: {notify.car.readyFrom} | Разгрузка: {notify.car.readyTo}</p>
                </div>
                <div className="cars-details-row">
                    <p className="cars-font">Телефон: {notify.car.phone}</p>
                </div>
            </div>
        ) : (
            <div className="tab-content-comment">
                <h5>{notify.car.comment}</h5>
            </div>
        )}
            <div className="cars-actions">
                <button className="cars-action-button" onClick={reject}>Отклонить</button>
                <button className="cars-action-button" onClick={submit}>Принять</button>
            </div>
        </div>
    );
};

export default NotifyCar;