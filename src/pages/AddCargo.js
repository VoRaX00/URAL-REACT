import React, { SyntheticEvent, useState } from 'react';
import './../styles/css/AddCargo.css';
import { Navigate } from "react-router-dom";
import Phone from "../components/phone/Phone";
import Cookies from "universal-cookie";
import {jwtDecode} from "jwt-decode";
import {ip} from "../env/env";


const AddCargo = () => {
    const token = new Cookies().get("jwt_authorization");
    const object = jwtDecode(token);
    const [cargo, setCargo] = useState({
        name: '',
        length: 0,
        width: 0,
        height: 0,
        weight: 0,
        volume: 0,
        countPlace: 0,
        loadingDate: '',
        unloadingDate: '',
        phoneNumber: parseInt(object.PhoneNumber),
        loadingPlace: '',
        unloadingPlace: '',
        cash: false,
        cashless: false,
        cashlessNds: false,
        cashlessWithoutNds: false,
        priceCash: 0,
        priceCashNds: 0,
        priceCashWithoutNds: 0,
        requestPrice: false,
        comment: ''
    });
    const [redirect, setRedirect] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCargo(prevCargo => ({
            ...prevCargo,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const curr = new Date();
    curr.setDate(curr.getDate());
    const date = curr.toISOString().substring(0, 10);

    const submit = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            const response = await fetch(`http://${ip}/api/Cargo/Add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(cargo)
            });
            if (response.ok)
                setRedirect(true);
            else
                throw "Не удалось выполнить запрос"
        }
        catch (error){
            console.log(error);
        }
    };

    if (redirect)
        return <Navigate to={"/cargo"} />

    return (
        <div className="cargoAdd__container min-vh-100 d-flex justify-content-center align-items-center">
            <form className='card p-5 cargoAdd__form' method="post" onSubmit={submit}>
                <div className="mb-3">
                    <label className="cargoAdd__form-text" htmlFor="name">Наименование груза:</label>
                    <input type="text" className="form-control" id="name" name="name" required
                        onChange={handleInputChange} />
                </div>
                <div className="form-group row mb-3">
                    <div className="col-md-4">
                        <label className="cargoAdd__form-text label-row-cargo" htmlFor="length">Длина (м):</label>
                        <input type="number" step="any" className="form-control short-input" id="length" name="length" min="0" required
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-md-4">
                        <label className="cargoAdd__form-text label-row-cargo" htmlFor="width">Ширина (м):</label>
                        <input type="number" step="any" className="form-control short-input" id="width" name="width" min="0" required
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-md-4">
                        <label className="cargoAdd__form-text label-row-cargo" htmlFor="height">Высота (м):</label>
                        <input type="number" step="any" className="form-control short-input" id="height" name="height" min="0" required
                            onChange={handleInputChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text label-row" htmlFor="weight">Вес груза (т):</label>
                        <input type="number" step="any" className="form-control label-row" id="weight" name="weight" min="0" required
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text label-row" htmlFor="volume">Объем (м<sup>3</sup>):</label>
                        <input type="number" step="any" className="form-control label-row" id="volume" name="volume" min="0" required
                            onChange={handleInputChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text label-row" htmlFor="countPlace">Кол-во мест (расчет в европалеттах):</label>
                        <input type="number" step="any" className="form-control label-row" id="countPlace" name="countPlace" min="0" required
                            onChange={handleInputChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text" htmlFor="loadingDate">Дата загрузки:</label>
                        <input type="date" min={date} className="form-control" id="loadingDate" name="loadingDate" required
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text" htmlFor="unloadingDate">Дата разгрузки:</label>
                        <input type="date" min={date} className="form-control" id="unloadingDate" name="unloadingDate" required
                            onChange={handleInputChange} />
                    </div>
                </div>
                <div className="mb-3">
                    <Phone value={cargo.phoneNumber} onChange={(value) => setCargo({ ...cargo, phoneNumber: value })} />
                </div>
                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text" htmlFor="loadingPlace">Адрес загрузки:</label>
                        <input id="loadingPlace" name="loadingPlace" type="text" className="form-control" required
                            onChange={handleInputChange} />
                    </div>
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text" htmlFor="unloadingPlace">Адрес разгрузки:</label>
                        <input type="text" className="form-control" id="unloadingPlace" name="unloadingPlace" required
                            onChange={handleInputChange} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="cargoAdd__form-text" htmlFor="deliveryCost">Способ оплаты:</label>
                </div>
                <div className="mb-3 row">
                    <div className="col-auto">
                        <input className="form-check-input" type="checkbox" name="cash" id="cboxCash" checked={cargo.cash}
                            onChange={handleInputChange} />
                        <label className="cargoAdd__form-text form-check-label" htmlFor="cboxCash">Наличные</label>
                    </div>
                    <div className="col-auto">
                        <input className="form-check-input" type="checkbox" name="cashless" id="cboxCashless" checked={cargo.cashless}
                            onChange={handleInputChange} />
                        <label className="cargoAdd__form-text form-check-label" htmlFor="cboxCashless">Безналичный расчет</label>
                    </div>
                    <div className="col-auto" id="extra_checkbox">
                        <div className="mb-3">
                            <input className="form-check-input" type="checkbox" name="cashlessNds" id="nds" checked={cargo.cashlessNds}
                                onChange={handleInputChange} />
                            <label className="form-check-label cargoAdd__form-text" htmlFor="nds">НДС</label>
                        </div>
                        <div className="mb-3">
                            <input className="form-check-input" type="checkbox" name="cashlessWithoutNds" id="without_nds" checked={cargo.cashlessWithoutNds}
                                onChange={handleInputChange} />
                            <label className="form-check-label cargoAdd__form-text" htmlFor="without_nds">Без НДС</label>
                        </div>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-12">
                        <div className="mb-3 row" id="price_cash_checkbox">
                            <div className="col-4">
                                <label className="cargoAdd__form-text" htmlFor="deliveryCostCash">Наличными</label>
                            </div>
                            <div className="col-8">
                                <input type="number" step="any" placeholder="Наличными" className="form-control cargoAdd__form-text" id="deliveryCostCash" name="priceCash" min="1"
                                    onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="mb-3 row" id="price_cashless_nds">
                            <div className="col-4">
                                <label className="cargoAdd__form-text" htmlFor="deliveryCostNDS">С НДС</label>
                            </div>
                            <div className="col-8">
                                <input type="number" step="any" placeholder="С НДС" className="form-control cargoAdd__form-text" id="deliveryCostNDS" name="priceCashNds" min="1"
                                    onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <div className="col-4">
                                <label className="cargoAdd__form-text" htmlFor="deliveryCostWithoutNDS">Без НДС</label>
                            </div>
                            <div className="col-8">
                                <input type="number" step="any" placeholder="Без НДС" className="form-control cargoAdd__form-text" id="deliveryCostWithoutNDS" name="priceCashWithoutNds" min="1"
                                    onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <div className="col-auto">
                                <input className="form-check-input" name="requestPrice" type="checkbox" id="requestPrice" checked={cargo.requestPrice}
                                    onChange={handleInputChange} />
                                <label className="form-check-label cargoAdd__form-text" htmlFor="requestPrice">Запрос цены</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="comment" className="form-label cargoAdd__form-text">Комментарий:</label>
                    <textarea className="form-control" id="comment" name="comment" rows="5" onChange={handleInputChange}></textarea>
                </div>
                <button type="submit" className="btn btn-dark cargoAdd__form-text">Отправить</button>
            </form>
        </div>
    );
};

export default AddCargo;