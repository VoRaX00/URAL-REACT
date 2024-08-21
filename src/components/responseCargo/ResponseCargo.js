import React, { SyntheticEvent, useState } from 'react';
import './style.css';
import axios from "axios";
import Cookies from "universal-cookie";
import { ip } from "../../env/env";

const cancelResponse = async (responseId, token) => {
    await axios.delete(`http://${ip}/api/NotifyCargo/Delete/${responseId}`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
}

const ResponseCargo = ({ response }) => {
    const [activeTab, setActiveTab] = useState('info');
    const token = new Cookies().get("jwt_authorization");

    const submit = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            await cancelResponse(response.id, token);
        } catch (err) {
            console.log(err);
        }
    };

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
                    <p className="cargo-name">{response.cargo.name}</p>
                    <div className="cargo-details-row">
                        <p className="cargo-dimensions cargo-font">Длина: {response.cargo.length}, Ширина: {response.cargo.width}, Высота: {response.cargo.height}</p>
                        <p className="cargo-weight cargo-font">Вес: {response.cargo.weight}, Объём: {response.cargo.volume}, Кол-во места в палетах: {response.cargo.countPlace}</p>
                    </div>
                    <div className="cargo-details-row">
                        <p className="cargo-dates cargo-font">Дата загрузки: {response.cargo.loadingDate}  Дата разгрузки: {response.cargo.unloadingDate}</p>
                    </div>
                    <div className="cargo-details-row">
                        <p className="cargo-locations cargo-font">Адрес загрузки: {response.cargo.loadingPlace} |  Адрес разгрузки: {response.cargo.unloadingPlace}</p>
                    </div>
                    <div className="cargo-details-row">
                        {response.cargo.cash && <p className="cargo-font">Цена наличными: {response.cargo.priceCash}</p>}
                        {response.cargo.cashlessNds && <p className="cargo-font">Цена безналичными с НДС: {response.cargo.priceCashNds}</p>}
                        {response.cargo.cashlessWithoutNds && <p className="cargo-font">Цена безналичными без НДС: {response.cargo.priceCashWithoutNds}</p>}
                        {response.cargo.requestPrice && <p className="cargo-font">Пользователь запрашивает цену</p>}
                    </div>
                </div>
            ) : (
                <div className="tab-content-comment">
                    <h5>{response.cargo.comment}</h5>
                </div>
            )}
            <div className="cargo-actions">
                <button className="cargo-action-button" onClick={submit}>Удалить</button>
            </div>
        </div>
    );
};

export default ResponseCargo;