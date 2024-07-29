import React, {SyntheticEvent, useState} from 'react';
import './../styles/css/AddCargo.css';
import {NavLink} from "react-router-dom";
import Phone from "../components/phone/Phone";

const AddCargo = (props: {userPhone: BigInteger}) => {
    const curr = new Date();
    curr.setDate(curr.getDate());
    const date = curr.toISOString().substring(0, 10);

    const [name, setName] = useState("");
    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [volume, setVolume] = useState(0);
    const [countPlace, setCountPlace] = useState(0);
    const [loadingDate, setLoadingDate] = useState("");
    const [unloadingDate, setUnloadingDate] = useState("");
    const [phone, setPhone] = useState(props.userPhone);
    const [loadingPlace, setLoadingPlace] = useState("");
    const [unloadingPlace, setUnloadingPlace] = useState("");
    const [cash, setCash] = useState(false);
    const [cashless, setCashless] = useState(false);
    const [cashlessNds, setCashlessNds] = useState(false);
    const [cashlessWithoutNds, setCashlessWithoutNds] = useState(false);
    const [priceCash, setPriceCash] = useState(0);
    const [priceCashNds, setPriceCashNds] = useState(0);
    const [priceCashWithoutNds, setPriceCashWithoutNds] = useState(0);
    const [requestPrice, setRequestPrice] = useState(false);
    const [comment, setComment] = useState("")
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await fetch("http://localhost:5036/api/Car/Add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: name,
                length: length,
                width: width,
                height: height,
                weight: weight,
                volume: volume,
                countPlace: countPlace,
                loadingDate: loadingDate,
                unloadingDate: unloadingDate,
                phone: phone,
                loadingPlace: loadingPlace,
                unloadingPlace: unloadingPlace,
                cash: cash,
                cashless: cashless,
                cashlessNds: cashlessNds,
                cashlessWithoutNds: cashlessWithoutNds,
                priceCash: priceCash,
                priceCashNds: priceCashNds,
                priceCashWithoutNds: priceCashWithoutNds,
                requestPrice: requestPrice,
                comment: comment,
            })
        });
        setRedirect(true);
    }

    if(redirect) {
        return <NavLink to={"/profile"}/>
    }

    return (
        <div className="cargoAdd__container min-vh-100 d-flex justify-content-center align-items-center">
            <form className='card p-5 cargoAdd__form' method="post" onSubmit={submit}>
                <div className="mb-3">
                    <label className="cargoAdd__form-text" htmlFor="cargoName">Наименование груза:</label>
                    <input type="text" className="form-control" id="cargoName" name="cargoName" required
                        onChange={setName}/>
                </div>
                <div className="form-group row mb-3">
                    <div className="col-md-4">
                        <label className="cargoAdd__form-text label-row-cargo" htmlFor="length">Длина (м):</label>
                        <input type="number" step="any" className="form-control short-input" id="length" name="length" min="0" required
                            onChange={setLength}/>
                    </div>
                    <div className="col-md-4">
                        <label className="cargoAdd__form-text label-row-cargo" htmlFor="width">Ширина (м):</label>
                        <input type="number" step="any" className="form-control short-input" id="width" name="width" min="0" required
                            onChange={setWidth}/>
                    </div>
                    <div className="col-md-4">
                        <label className="cargoAdd__form-text label-row-cargo" htmlFor="height">Высота (м):</label>
                        <input type="number" step="any" className="form-control short-input" id="height" name="height" min="0" required
                            onChange={setHeight}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text label-row" htmlFor="cargoWeight">Вес груза (т):</label>
                        <input type="number" step="any" className="form-control label-row" id="cargoWeight" name="cargoWeight" min="0" required
                            onChange={setWeight}/>
                    </div>
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text label-row" htmlFor="volume">Объем (м<sup>3</sup>):</label>
                        <input type="number" step="any" className="form-control label-row" id="volume" name="volume" min="0" required
                            onChange={setVolume}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text label-row" htmlFor="countPlace">Кол-во мест (расчет в европалеттах):</label>
                        <input type="number" step="any" className="form-control label-row" id="countPlace" name="countPlace" min="0" required
                            onChange={setCountPlace}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text" htmlFor="loadingDate">Дата загрузки:</label>
                        <input type="date" min={date} className="form-control" id="loadingDate" name="loadingDate" required
                            onChange={setLoadingDate}/>
                    </div>
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text" htmlFor="unloadingDate">Дата разгрузки:</label>
                        <input type="date" min={date} className="form-control" id="unloadingDate" name="unloadingDate" required
                            onChange={setUnloadingDate}/>
                    </div>
                </div>
                <div className="mb-3">
                    <Phone value={phone} onChange={setPhone}/>
                </div>
                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text" htmlFor="loading_address">Адрес загрузки:</label>
                        <input id="loading_address" name="loading_address" type="text" className="form-control" required
                            onChange={setLoadingPlace}/>
                    </div>
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text" htmlFor="unloading_address">Адрес разгрузки:</label>
                        <input type="text" className="form-control" id="unloading_address" name="unloading_address" required
                            onChange={setUnloadingPlace}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="cargoAdd__form-text" htmlFor="deliveryCost">Способ оплаты:</label>
                </div>
                <div className="mb-3 row">
                    <div className="col-auto">
                        <input className="form-check-input" type="checkbox" name="cash" id="cboxCash" value="cash"
                            onChange={setCash}/>
                        <label className="cargoAdd__form-text form-check-label" htmlFor="cboxCash">Наличные</label>
                    </div>
                    <div className="col-auto">
                        <input className="form-check-input" type="checkbox" name="cash" id="cboxCashless" value="cashless"
                            onChange={setCashless}/>
                        <label className="cargoAdd__form-text form-check-label" htmlFor="cboxCashless">Безналичный расчет</label>
                    </div>
                    <div className="col-auto" id="extra_checkbox">
                        <div className="mb-3">
                            <input className="form-check-input" type="checkbox" name="cashless" id="nds" value="nds"
                                onChange={setCashlessNds}/>
                            <label className="form-check-label cargoAdd__form-text" htmlFor="nds">НДС</label>
                        </div>
                        <div className="mb-3">
                            <input className="form-check-input" type="checkbox" name="cashless" id="without_nds" value="without_nds"
                                onChange={setCashlessWithoutNds}/>
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
                                <input type="number" step="any" placeholder="Наличными" className="form-control cargoAdd__form-text" id="deliveryCostCash" name="deliveryCostCash" min="1"
                                    onChange={setPriceCash}/>
                            </div>
                        </div>
                        <div className="mb-3 row" id="price_cashless_nds">
                            <div className="col-4">
                                <label className="cargoAdd__form-text" htmlFor="deliveryCostNDS">С НДС</label>
                            </div>
                            <div className="col-8">
                                <input type="number" step="any" placeholder="С НДС" className="form-control cargoAdd__form-text" id="deliveryCostNDS" name="deliveryCostNDS" min="1"
                                    onChange={setPriceCashNds}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <div className="col-4">
                                <label className="cargoAdd__form-text" htmlFor="deliveryCostWithoutNDS">Без НДС</label>
                            </div>
                            <div className="col-8">
                                <input type="number" step="any" placeholder="Без НДС" className="form-control cargoAdd__form-text" id="deliveryCostWithoutNDS" name="deliveryCostWithoutNDS" min="1"
                                    onChange={setPriceCashWithoutNds}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <div className="col-auto">
                                <input className="form-check-input" name="request_price" type="checkbox" id="requestPrice" value="request"
                                    onChange={setRequestPrice}/>
                                <label className="form-check-label cargoAdd__form-text" htmlFor="requestPrice">Запрос цены</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="comment" className="form-label cargoAdd__form-text">Комментарий:</label>
                    <textarea className="form-control" id="comment" name="comment" rows="5" onChange={setComment}></textarea>
                </div>
                <button type="submit" className="btn btn-dark cargoAdd__form-text">Отправить</button>
            </form>
        </div>
    );
};

export default AddCargo;
