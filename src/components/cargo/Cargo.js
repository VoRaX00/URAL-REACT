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
                <p>Вес: {cargo.weight}</p>
                <p>Объем: {cargo.year}</p>
                <p>Цена: {cargo.price}</p>
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