import React from 'react';
import './../styles/css/AddCargo.css';

const AddCargo = () => {
    return (
        <div className="cargoAdd__container min-vh-100 d-flex justify-content-center align-items-center">
            <form className='card p-5 cargoAdd__form' action="#" method="post">
                <div className="mb-3">
                    <label className="cargoAdd__form-text" htmlFor="cargoName">Наименование груза:</label>
                    <input type="text" className="form-control" id="cargoName" name="cargoName" required />
                </div>
                <div className="form-group row mb-3">
                    <div className="col-md-4">
                        <label className="cargoAdd__form-text label-row-cargo" htmlFor="length">Длина (м):</label>
                        <input type="number" step="any" className="form-control short-input" id="length" name="length" min="0" required />
                    </div>
                    <div className="col-md-4">
                        <label className="cargoAdd__form-text label-row-cargo" htmlFor="width">Ширина (м):</label>
                        <input type="number" step="any" className="form-control short-input" id="width" name="width" min="0" required />
                    </div>
                    <div className="col-md-4">
                        <label className="cargoAdd__form-text label-row-cargo" htmlFor="height">Высота (м):</label>
                        <input type="number" step="any" className="form-control short-input" id="height" name="height" min="0" required />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text label-row" htmlFor="cargoWeight">Вес груза (т):</label>
                        <input type="number" step="any" className="form-control label-row" id="cargoWeight" name="cargoWeight" min="0" required />
                    </div>
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text label-row" htmlFor="volume">Объем (м<sup>3</sup>):</label>
                        <input type="number" step="any" className="form-control label-row" id="volume" name="volume" min="0" required />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text label-row" htmlFor="countPlace">Кол-во мест (расчет в европалеттах):</label>
                        <input type="number" step="any" className="form-control label-row" id="countPlace" name="countPlace" min="0" required />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text" htmlFor="loadingDate">Дата загрузки:</label>
                        <input type="date" className="form-control" id="loadingDate" name="loadingDate" required />
                    </div>
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text" htmlFor="unloadingDate">Дата разгрузки:</label>
                        <input type="date" className="form-control" id="unloadingDate" name="unloadingDate" required />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="cargoAdd__form-text" htmlFor="phone">Телефон:</label>
                    <input type="tel" className="form-control" id="phone" name="phone" required />
                </div>
                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text" htmlFor="loading_address">Адрес загрузки:</label>
                        <input id="loading_address" name="loading_address" type="text" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text" htmlFor="unloading_address">Адрес разгрузки:</label>
                        <input type="text" className="form-control" id="unloading_address" name="unloading_address" required />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="cargoAdd__form-text" htmlFor="deliveryCost">Способ оплаты:</label>
                </div>
                <div className="mb-3 row">
                    <div className="col-auto">
                        <input className="form-check-input" type="checkbox" name="cash" id="cboxCash" value="cash" />
                        <label className="cargoAdd__form-text form-check-label" htmlFor="cboxCash">Наличные</label>
                    </div>
                    <div className="col-auto">
                        <input className="form-check-input" type="checkbox" name="cash" id="cboxCashless" value="cashless" />
                        <label className="cargoAdd__form-text form-check-label" htmlFor="cboxCashless">Безналичный расчет</label>
                    </div>
                    <div className="col-auto" id="extra_checkbox">
                        <div className="mb-3">
                            <input className="form-check-input" type="checkbox" name="cashless" id="nds" value="nds" />
                            <label className="form-check-label cargoAdd__form-text" htmlFor="nds">НДС</label>
                        </div>
                        <div className="mb-3">
                            <input className="form-check-input" type="checkbox" name="cashless" id="without_nds" value="without_nds" />
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
                                <input type="number" step="any" placeholder="Наличными" className="form-control cargoAdd__form-text" id="deliveryCostCash" name="deliveryCostCash" min="1" />
                            </div>
                        </div>
                        <div className="mb-3 row" id="price_cashless_nds">
                            <div className="col-4">
                                <label className="cargoAdd__form-text" htmlFor="deliveryCostNDS">С НДС</label>
                            </div>
                            <div className="col-8">
                                <input type="number" step="any" placeholder="С НДС" className="form-control cargoAdd__form-text" id="deliveryCostNDS" name="deliveryCostNDS" min="1" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <div className="col-4">
                                <label className="cargoAdd__form-text" htmlFor="deliveryCostWithoutNDS">Без НДС</label>
                            </div>
                            <div className="col-8">
                                <input type="number" step="any" placeholder="Без НДС" className="form-control cargoAdd__form-text" id="deliveryCostWithoutNDS" name="deliveryCostWithoutNDS" min="1" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <div className="col-auto">
                                <input className="form-check-input" name="request_price" type="checkbox" id="requestPrice" value="request" />
                                <label className="form-check-label cargoAdd__form-text" htmlFor="requestPrice">Запрос цены</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="comment" className="form-label cargoAdd__form-text">Комментарий:</label>
                    <textarea className="form-control" id="comment" name="comment" rows="5"></textarea>
                </div>
                <button type="submit" className="btn btn-dark cargoAdd__form-text">Отправить</button>
            </form>
        </div>
    );
};

export default AddCargo;
