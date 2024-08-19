import React, { SyntheticEvent, useState } from 'react';
import './style.css';
import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { ip } from "../../env/env";

const AddNotification = async (cargo, userId, token ) => {
    const requestData = {
        firstUserComment: "",
        secondUserComment: cargo.comment,
        cargoId: cargo.id,
        firstUserId: userId,
        secondUserId: cargo.userId,
    }

    await axios.post(`http://${ip}/api/NotifyCargo/Add`, requestData, {
        headers: { "Authorization": `Bearer ${token}` },
        params: {id: cargo.id}
    });
}

const DeleteCargo = async (cargoId, token) => {
    await axios.delete(`http://${ip}/api/Cargo/Delete`, {
        headers: { "Authorization": `Bearer ${token}` },
        params: {id: cargoId}
    });
}

const CargoItem = ({ cargo, typeSubmit }) => {
    const [activeTab, setActiveTab] = useState('info');
    const token = useState(new Cookies().get("jwt_authorization"));

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            switch (typeSubmit){
                case 'Cargo': {
                    const userId = jwtDecode(token).Id;
                    if (userId === cargo.userId)
                        throw new Error("Id equals");

                    await AddNotification(cargo, userId, token);
                    break;
                }
                case 'Profile':
                    await DeleteCargo(cargo.id, token)
                    break;

                default:
                    console.log("default case in cargo");
                    break;
            }
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
                    <p className="cargo-name">{cargo.name}</p>
                    <div className="cargo-details-row">
                        <p className="cargo-dimensions cargo-font">Длина: {cargo.length}, Ширина: {cargo.width}, Высота: {cargo.height}</p>
                        <p className="cargo-weight cargo-font">Вес: {cargo.weight}, Объём: {cargo.volume}, Кол-во места в палетах: {cargo.countPlace}</p>
                    </div>
                    <div className="cargo-details-row">
                        <p className="cargo-dates cargo-font">Дата загрузки: {cargo.loadingDate}  Дата разгрузки: {cargo.unloadingDate}</p>
                    </div>
                    <div className="cargo-details-row">
                        <p className="cargo-locations cargo-font">Адрес загрузки: {cargo.loadingPlace} |  Адрес разгрузки: {cargo.unloadingPlace}</p>
                    </div>
                    <div className="cargo-details-row">
                        {cargo.cash && <p className="cargo-font">Цена наличными: {cargo.priceCash}</p>}
                        {cargo.cashlessNds && <p className="cargo-font">Цена безналичными с НДС: {cargo.priceCashNds}</p>}
                        {cargo.cashlessWithoutNds && <p className="cargo-font">Цена безналичными без НДС: {cargo.priceCashWithoutNds}</p>}
                        {cargo.requestPrice && <p className="cargo-font">Пользователь запрашивает цену</p>}
                    </div>
                </div>
            ) : (
                <div className="tab-content-comment">
                    <h5>{cargo.comment}</h5>
                </div>
            )}
            {typeSubmit === 'Cargo' ? (
                <div className="cargo-actions">
                    <button className="cargo-action-button" onClick={submit}>Откликнуться</button>
                </div>
            ) : (
                <div className="cargo-actions">
                    <button className="cargo-action-button" onClick={submit}>Удалить</button>
                </div>
            )}
        </div>
    );
};

export default CargoItem;