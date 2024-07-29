import React, { useState } from 'react';
import './style.css';

const Cargo = ({cargo}) => {
    const [activeTab, setActiveTab] = useState('info');

    return (
        <div className="cargo-info-container">
            <div className="tabs">
                <button className={`tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
                Информация
                </button>
                <button className={`tab ${activeTab === 'comment' ? 'active' : ''}`} onClick={() => setActiveTab('comment')}>
                Комментарий
                </button>
            </div>
            {activeTab === 'info' ? (
                <div className="tab-content">
                    <h3>{cargo.name}</h3>
                    <p>Длина: {cargo.length}</p>
                    <p>Ширина: {cargo.width}</p>
                    <p>Высота: {cargo.height}</p>
                    <p>Вес: {cargo.weight}</p>
                    <p>Объем: {cargo.volume}</p>
                    <p>Кол-во места в евро: {cargo.countPlace}</p>
                    <p>Дата загрузки: {cargo.loadingDate}   Дата разгрузки: {cargo.unloadingDate}</p>
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
        </div>
    );
}

export default Cargo;