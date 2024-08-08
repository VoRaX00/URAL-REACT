import React, {SyntheticEvent, useState} from 'react';
import './style.css';
import {ip} from "../../env/env";
import axios from "axios";
import SelectBody from "../selectBody/SelectBody";
import SelectLoading from "../selectLoading/SelectLoading";



const CarFilters = () => {
    const [filter, setFilter] = useState({
        name: '',
        length: 0,
        width: 0,
        height: 0,
        capacity: 0,
        volume: 0,
        countPlace: 0,
        readyFrom: '',
        readyTo: '',
        loadingPlace: '',
        unloadingPlace: '',
        priceCash: 0,
        priceCashNds: 0,
        priceCashWithoutNds: 0,
        requestPrice: false,
    });

    const [selectedOptionsBody, setSelectedOptionsBody] = useState([]);
    const [selectedOptionsLoading, setSelectedOptionsLoading] = useState([]);

    const handleMultiSelectChangeBody = (selectedOptions) => {
        setSelectedOptionsBody(selectedOptions);
        setFilter(prevCar => ({
            ...prevCar,
            bodyTypes: selectedOptions
        }));
    };

    const handleMultiSelectChangeLoading = (selectedOptions) => {
        setSelectedOptionsLoading(selectedOptions);
        setFilter(prevCar => ({
            ...prevCar,
            loadingTypes: selectedOptions
        }));
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilter(prevCargo => ({
            ...prevCargo,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const submit = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            const response = await axios.get(`http://${ip}/api/Car/GetByFilters`, {
                params: {

                }
            });
            if (!response.ok)
                throw "Не удалось выполнить запрос"
        }
        catch (error){
            console.log(error);
        }
    };

    const curr = new Date();
    curr.setDate(curr.getDate());
    const date = curr.toISOString().substring(0, 10);
    curr.setDate(curr.getDate() + 1);

    return (
        <div className="cargo-filters">
            <h4>Фильтры</h4>
            <form onSubmit={submit}>
                <div className="filter-group">
                    <label htmlFor="length">Длина (м):</label>
                    <input
                        type="number"
                        id="length"
                        name="length"
                        onChange={handleInputChange}
                        placeholder="Введите длинна..."
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="width">Ширина (м):</label>
                    <input
                        type="number"
                        id="width"
                        name="width"
                        onChange={handleInputChange}
                        placeholder="Введите ширину..."
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="height">Высота (м):</label>
                    <input
                        type="number"
                        id="height"
                        name="height"
                        onChange={handleInputChange}
                        placeholder="Введите высоту..."
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="capacity">Грузоподъемность (кг):</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        onChange={handleInputChange}
                        placeholder="Введите вес..."
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="volume">Объем (м³):</label>
                    <input
                        type="number"
                        id="volume"
                        name="volume"
                        onChange={handleInputChange}
                        placeholder="Введите объем..."
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="readyFrom">Готовность с:</label>
                    <input
                        type="date"
                        min={date}
                        id="readyFrom"
                        name="readyFrom"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="readyTo">Готовность по:</label>
                    <input
                        type="date"
                        min={date}
                        id="readyTo"
                        name="readyTo"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="whereFrom">Откуда:</label>
                    <input
                        type="text"
                        id="whereFrom"
                        name="whereFrom"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="whereTo">Куда:</label>
                    <input
                        type="text"
                        id="whereTo"
                        name="whereTo"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="whereFrom">Тип кузова:</label>
                    <SelectBody value={selectedOptionsBody} onChange={handleMultiSelectChangeBody}/>
                </div>
                <div className="filter-group">
                    <label htmlFor="whereTo">Тип загрузки:</label>
                    <SelectLoading value={selectedOptionsLoading} onChange={handleMultiSelectChangeLoading}/>
                </div>
                <button type="submit" className="btn btn-dark">Применить</button>
            </form>
        </div>
    );
};

export default CarFilters;
