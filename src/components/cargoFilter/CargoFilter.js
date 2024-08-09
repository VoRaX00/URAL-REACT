import React, {SyntheticEvent, useEffect, useState} from 'react';
import './style.css';

const CargoFilters = ({name, setName, applyFilters}) => {
    const [filter, setFilter] = useState({
        name: name || '',
        length: 0,
        width: 0,
        height: 0,
        weight: 0,
        volume: 0,
        countPlace: 0,
        loadingDate: '',
        unloadingDate: '',
        loadingPlace: '',
        unloadingPlace: '',
        priceCash: 0,
        priceCashNds: 0,
        priceCashWithoutNds: 0,
        requestPrice: false,
    });

    useEffect(() => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            name: name, // Обновление поля "name", когда оно изменяется на основной странице
        }));
    }, [name]);

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

            const preparedFilters = Object.fromEntries(
                Object.entries(filter).map(([key, value]) => {
                    if (value === '' || value === 0)
                        return [key, null];
                    return [key, value];
                })
            );
            applyFilters(preparedFilters);
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
                    <label htmlFor="weight">Вес (кг):</label>
                    <input
                        type="number"
                        id="weight"
                        name="weight"
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
                    <label htmlFor="countPlace">Кол-во места в европакетах:</label>
                    <input
                        type="number"
                        id="countPlace"
                        name="countPlace"
                        onChange={handleInputChange}
                        placeholder="Введите кол-во места в европакетах..."
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="loadingDate">Дата загрузки:</label>
                    <input
                        type="date"
                        min={date}
                        id="loadingDate"
                        name="loadingDate"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="unloadingDate">Дата разгрузки:</label>
                    <input
                        type="date"
                        min={date}
                        id="unloadingDate"
                        name="unloadingDate"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="loadingPlace">Место загрузки:</label>
                    <input
                        type="text"
                        id="loadingPlace"
                        name="loadingPlace"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="unloadingPlace">Место разгрузки:</label>
                    <input
                        type="text"
                        id="unloadingPlace"
                        name="unloadingPlace"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="priceCash">Цена наличными:</label>
                    <input
                        type="number"
                        id="priceCash"
                        name="priceCash"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="priceCashNds">Цена с вычетом НДС:</label>
                    <input
                        type="number"
                        id="priceCashNds"
                        name="priceCashNds"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="priceCashWithoutNds">Цена без НДС:</label>
                    <input
                        type="number"
                        id="priceCashWithoutNds"
                        name="priceCashWithoutNds"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="requestPrice">Пользователь запрашивает цену:</label>
                    <input
                        type="checkbox"
                        id="requestPrice"
                        name="requestPrice"
                        checked={filter.requestPrice}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-dark">Применить</button>
            </form>
        </div>
    );
};

export default CargoFilters;
