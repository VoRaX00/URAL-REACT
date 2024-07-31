import React, { useState } from 'react';
import './style.css';
import {SyntheticEvent} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {jwtDecode} from "jwt-decode";

const Cargo = ({cargo}) => {
    const [activeTab, setActiveTab] = useState('info');

    const submit = (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            const token = new Cookies().get("jwt_authentication");
            const userId = jwtDecode(token).Id
            if(userId === cargo.userId)
                throw "Id equals"

            axios.post("http://localhost:5036/api/NotifyCar/Add", {
                firstUserComment: "",
                secondUserComment: cargo.comment,
                cargoId: cargo.id,
                firstUserId: userId,
                secondUserId: cargo.userId,
            })
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="cargo-info-container">
            <div className="tabs">
                <button className={`tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
                    Информация
                </button>
                <button className={`tab ${activeTab === 'comment' ? 'active' : ''}`}
                    onClick={() => setActiveTab('comment')}>Комментарий</button>
            </div>
            {activeTab === 'info' ? (
                <div className="tab-content">
                    <h3>{cargo.name}</h3>
                    <p>Длина: {cargo.length}</p>
                    <p>Ширина: {cargo.width}</p>
                    <p>Высота: {cargo.height}</p>
                    <p>Вес: {cargo.weight}</p>
                    <p>Объем: {cargo.volume}</p>
                    <p>Кол-во места в европалетах: {cargo.countPlace}</p>
                    <p>Дата загрузки: {cargo.loadingDate} Дата разгрузки: {cargo.unloadingDate}</p>
                    {cargo.cash ? (<p>Цена наличными: {cargo.priceCash}</p>) : ""}
                    {cargo.cashlessNds ? (<p>Цена безналичными с НДС: {cargo.priceCashNds}</p>) : ""}
                    {cargo.cashlessWithoutNds ? (<p>Цена безналичными с НДС: {cargo.priceCashWithoutNds}</p>) : ""}
                    {cargo.requestPrice ? (<p>Пользователь запрашивает цену</p>) : ""}
                </div>
            ) : (
                <div className="tab-content-comment">
                    <h5>{cargo.comment}</h5>
                </div>
            )}
            <button type="submit" onSubmit={submit} className="btn btn-dark form-text respond-button">Откликнуться</button>
        </div>
    );
}

export default Cargo;