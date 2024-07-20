import React, { useState } from 'react';
import './style.css';

const Car = ({ car }) => {
    const [activeTab, setActiveTab] = useState('info');

    return (
        <div className="car-info-container">
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
                <h3>{car.name}</h3>
                <p>Модель: {car.model}</p>
                <p>Год: {car.year}</p>
                <p>Цена: {car.price}</p>
                </div>
            ) : (
                <div className="tab-content-comment">
                  <h5>{car.comment}</h5>
                </div>
            )}
        </div>
    );
};

export default Car;
