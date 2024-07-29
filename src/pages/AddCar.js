import SelectBody from "../components/selectBody/SelectBody";
import React, {SyntheticEvent, useState} from "react";
import SelectLoading from "../components/selectLoading/SelectLoading";
import "./../styles/css/AddCar.css"
import Phone from "../components/phone/Phone";
import {NavLink} from "react-router-dom";

const AddCar = (props: {userPhone: BigInteger}) => {
    const [selectedOptionsBody, setSelectedOptionsBody] = useState([]);
    const [selectedOptionsLoading, setSelectedOptionsLoading] = useState([]);

    const handleMultiSelectChangeBody = (selectedOptions) => {
        setSelectedOptionsBody(selectedOptions);
    };

    const handleMultiSelectChangeLoading = (selectedOptions) => {
        setSelectedOptionsLoading(selectedOptions);
    };

    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [volume, setVolume] = useState(0);
    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [whereFrom, setWhereFrom] = useState("");
    const [whereTo, setWhereTo] = useState("");
    const [readyFrom, setReadyFrom] = useState("");
    const [readyTo, setReadyTo] = useState("");
    const [phone, setPhone] = useState(props.userPhone);
    const [comment, setComment] = useState("")
    const [redirect, setRedirect] = useState(false);

    const curr = new Date();
    curr.setDate(curr.getDate());
    const date = curr.toISOString().substring(0, 10);
    curr.setDate(curr.getDate() + 1);
    const toDate = curr.toISOString().substring(0, 10);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await fetch("http://localhost:5036/api/Car/Add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: name,
                capacity: capacity,
                volume: volume,
                length: length,
                width: width,
                height: height,
                whereFrom: whereFrom,
                whereTo: whereTo,
                readyFrom: readyFrom,
                readyTo: readyTo,
                phone: phone,
                comment: comment,
                bodyTypes: selectedOptionsBody,
                loadingTypes: selectedOptionsLoading
            })
        });
        setRedirect(true);
    }

    if(redirect) {
        return <NavLink to={"/profile"}/>
    }

    return (
        <div className="carAdd__container min-vh-100 d-flex justify-content-center align-items-center">
            <form className="card p-5 shadow-sm" action="#" method="post" onSubmit={submit}>
                <div className="mb-3">
                    <label className="carAdd__form-text" htmlFor="car">Автомобиль</label>
                    <input type="text" name="car" id="car" className="form-control" required
                        onChange={e => setName(e.target.value)}/>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="carAdd__form-text">Тип кузова:</label>
                        <SelectBody value={selectedOptionsBody} onChange={handleMultiSelectChangeBody}/>
                    </div>
                    <div className="col">
                        <label className="carAdd__form-text" htmlFor="loadingType">Тип загрузки:</label>
                        <SelectLoading value={selectedOptionsLoading} onChange={handleMultiSelectChangeLoading}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="carAdd__form-text carAdd__label-row-min" htmlFor="capacity">Грузоподъемность, т:</label>
                        <input type="number" step="any" min="0" className="form-control" id="capacity" name="capacity" required
                            onChange={e => setCapacity(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label className="carAdd__form-text carAdd__label-row-min" htmlFor="volume">Объем, м^3:</label>
                        <input type="number" step="any" min="0" className="form-control" id="volume" name="volume" required
                            onchange={e => setVolume(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="carAdd__form-text carAdd__label-row" htmlFor="length">Внутренняя длина кузова:</label>
                        <input type="number" step="any" min="0" className="form-control carAdd__form-text" id="length" name="length" required
                            onChange={e => setLength(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label className="carAdd__form-text carAdd__label-row" htmlFor="width">Внутренняя ширина кузова:</label>
                        <input type="number" step="any" min="0" className="form-control carAdd__form-text" id="width" name="width" required
                            onChange={e => setWidth(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label className="carAdd__form-text carAdd__label-row" htmlFor="height">Внутренняя высота кузова:</label>
                        <input type="number" step="any" min="0" className="form-control carAdd__form-text" id="height" name="height" required
                            onChange={e => setHeight(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="carAdd__form-text" htmlFor="place_from">Откуда:</label>
                        <input type="text" className="form-control" id="place_from" name="place_from" required
                            onChange={e => setWhereFrom(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label className="carAdd__form-text" htmlFor="place_to">Куда:</label>
                        <input type="text" className="form-control" id="place_to" name="place_to" required
                            onChange={e => setWhereTo(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="carAdd__form-text" htmlFor="readyFrom">Готов к загрузке с:</label>
                        <input type="date" min={date} className="form-control" id="readyFrom" name="readyFrom" required
                            onChange={e => setReadyFrom(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label className="carAdd__form-text" htmlFor="readyTo">Готов к разгрузке:</label>
                        <input type="date" min={toDate} className="form-control" id="readyTo" name="readyTo" required
                            onChange={e => setReadyTo(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3">
                    <Phone value={phone} onChange={setPhone}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="comment" className="carAdd__form-label carAdd__form-text">Комментарий:</label>
                    <textarea className="form-control" id="comment" name="comment" rows="5"
                              onChange={e => setComment(e.target.value)}></textarea>
                </div>
                <button type="submit" className="btn btn-dark carAdd__form-text">Отправить</button>
            </form>
        </div>
    );
};

export default AddCar;