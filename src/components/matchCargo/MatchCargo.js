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

const MatchCargo = ({ match }) => {
    const [activeTab, setActiveTab] = useState('info');
    const token = new Cookies().get("jwt_authorization");

    const submit = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            await cancelResponse(match.id, token);
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
                    <p className="cargo-name">{match.cargo.name}</p>
                    <div className="cargo-details-row">
                        <p className="cargo-dimensions cargo-font">Длина: {match.cargo.length}, Ширина: {match.cargo.width}, Высота: {match.cargo.height}</p>
                        <p className="cargo-weight cargo-font">Вес: {match.cargo.weight}, Объём: {match.cargo.volume}, Кол-во места в палетах: {match.cargo.countPlace}</p>
                    </div>
                    <div className="cargo-details-row">
                        <p className="cargo-dates cargo-font">Дата загрузки: {match.cargo.loadingDate}  Дата разгрузки: {match.cargo.unloadingDate}</p>
                    </div>
                    <div className="cargo-details-row">
                        <p className="cargo-locations cargo-font">Адрес загрузки: {match.cargo.loadingPlace} |  Адрес разгрузки: {match.cargo.unloadingPlace}</p>
                    </div>
                    <div className="cargo-details-row">
                        {match.cargo.cash && <p className="cargo-font">Цена наличными: {match.cargo.priceCash}</p>}
                        {match.cargo.cashlessNds && <p className="cargo-font">Цена безналичными с НДС: {match.cargo.priceCashNds}</p>}
                        {match.cargo.cashlessWithoutNds && <p className="cargo-font">Цена безналичными без НДС: {match.cargo.priceCashWithoutNds}</p>}
                        {match.cargo.requestPrice && <p className="cargo-font">Пользователь запрашивает цену</p>}
                    </div>
                </div>
            ) : (
                <div className="tab-content-comment">
                    <h5>{match.cargo.comment}</h5>
                </div>
            )}
            <div className="cargo-actions">
                <button className="cargo-action-button" onClick={submit}>Удалить</button>
            </div>
        </div>
    );
};

export default MatchCargo;