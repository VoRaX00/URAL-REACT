import React, { SyntheticEvent, useState } from 'react';
import './style.css';
import axios from "axios";
import Cookies from "universal-cookie";
import { ip } from "../../env/env";

const AcceptNotify = async (notifyId, token)  => {
    const requestData = {
        id: notifyId,
        firstUserStatus: "y",
        secondUserStatus: "y",
        firstUserComment: "",
        secondUserComment: "",
    }

    await axios.put(`http://${ip}/api/NotifyCargo/Update`, requestData, {
        headers: { "Authorization": `Bearer ${token}` },
        params: {id: notifyId}
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

    await axios.put(`http://${ip}/api/NotifyCargo/Update`, requestData, {
        headers: { "Authorization": `Bearer ${token}` },
        params: {id: notifyId}
    });
}

const NotifyCargo = ({ notify }) => {
    const [activeTab, setActiveTab] = useState('info');
    const token = new Cookies().get("jwt_authorization");

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await AcceptNotify(notify.id, token);
        } catch (err) {
            console.log(err);
        }
    };

    const reject = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await RejectNotify(notify.id, token);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="cargo-item">
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'info' ? 'active' : ''}`}
                    onClick={() => setActiveTab('info')}
                >
                    Информация
                </button>
                <button
                    className={`tab ${activeTab === 'comment' ? 'active' : ''}`}
                    onClick={() => setActiveTab('comment')}
                >
                    Комментарий
                </button>
            </div>

            {activeTab === 'info' ? (
                <div className="cargo-details">
                    <p className="cargo-name">{notify.cargo.name}</p>
                    <div className="cargo-details-row">
                        <p className="cargo-dimensions cargo-font">Длина: {notify.cargo.length}, Ширина: {notify.cargo.width}, Высота: {notify.cargo.height}</p>
                        <p className="cargo-weight cargo-font">Вес: {notify.cargo.weight}, Объём: {notify.cargo.volume}, Кол-во места в палетах: {notify.cargo.countPlace}</p>
                    </div>
                    <div className="cargo-details-row">
                        <p className="cargo-dates cargo-font">Дата загрузки: {notify.cargo.loadingDate}  Дата разгрузки: {notify.cargo.unloadingDate}</p>
                    </div>
                    <div className="cargo-details-row">
                        <p className="cargo-locations cargo-font">Адрес загрузки: {notify.cargo.loadingPlace} |  Адрес разгрузки: {notify.cargo.unloadingPlace}</p>
                    </div>
                    <div className="cargo-details-row">
                        {notify.cargo.cash && <p className="cargo-font">Цена наличными: {notify.cargo.priceCash}</p>}
                        {notify.cargo.cashlessNds && <p className="cargo-font">Цена безналичными с НДС: {notify.cargo.priceCashNds}</p>}
                        {notify.cargo.cashlessWithoutNds && <p className="cargo-font">Цена безналичными без НДС: {notify.cargo.priceCashWithoutNds}</p>}
                        {notify.cargo.requestPrice && <p className="cargo-font">Пользователь запрашивает цену</p>}
                    </div>
                </div>
            ) : (
                <div className="tab-content-comment">
                    <h5>{notify.cargo.comment}</h5>
                </div>
            )}
            <div className="cargo-actions">
                <button className="cargo-action-button" onClick={reject}>Отклонить</button>
                <button className="cargo-action-button" onClick={submit}>Принять</button>
            </div>
        </div>
    );
};

export default NotifyCargo;