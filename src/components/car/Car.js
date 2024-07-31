import React, { useState } from 'react';
import './style.css';

const Car = ({car}) => {
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
                    <div>
                        <h3>Тип кузова:</h3>
                        <ul>
                            {car.bodyTypes.map((bodyType) => (
                                <li key={bodyType.id}>{bodyType.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Тип разгрузки:</h3>
                        <ul>
                            {car.loadingTypes.map((loadingType) => (
                                <li key={loadingType.id}>{loadingType.name}</li>
                            ))}
                        </ul>
                    </div>
                    <p>Вместимость: {car.capacity}</p>
                    <p>Объем: {car.volume}</p>
                    <p>Ширина: {car.length}</p>
                    <p>Высота: {car.height}</p>
                    <p>Откуда: {car.whereFrom} Куда: {car.whereTo}</p>
                    <p>Загрузка: {car.whereFrom} Разгрузка: {car.whereTo}</p>
                    <p>Телефон: {car.phone}</p>
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
