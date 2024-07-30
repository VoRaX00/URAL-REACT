import SelectBody from "../components/selectBody/SelectBody";
import React, {SyntheticEvent, useState} from "react";
import SelectLoading from "../components/selectLoading/SelectLoading";
import "./../styles/css/AddCar.css"
import Phone from "../components/phone/Phone";
import {NavLink} from "react-router-dom";
import {pem as jwt} from "node-forge";
import axios from "axios";
import Car from "../Entity/Car";

const AddCar = ({token}) => {
    const object = jwt.decode(token);

    const user = axios.get("http://localhost:5036/api/User/Get", {
        params: {
            id: object.Id
        },
    });

    // const [selectedOptionsBody, setSelectedOptionsBody] = useState([]);
    // const [selectedOptionsLoading, setSelectedOptionsLoading] = useState([]);
    //
    // const handleMultiSelectChangeBody = (selectedOptions) => {
    //     setSelectedOptionsBody(selectedOptions);
    // };
    //
    // const handleMultiSelectChangeLoading = (selectedOptions) => {
    //     setSelectedOptionsLoading(selectedOptions);
    // };

    // const [name, setName] = useState("");
    // const [capacity, setCapacity] = useState(0);
    // const [volume, setVolume] = useState(0);
    // const [length, setLength] = useState(0);
    // const [width, setWidth] = useState(0);
    // const [height, setHeight] = useState(0);
    // const [whereFrom, setWhereFrom] = useState("");
    // const [whereTo, setWhereTo] = useState("");
    // const [readyFrom, setReadyFrom] = useState("");
    // const [readyTo, setReadyTo] = useState("");
    // const [phone, setPhone] = useState(user.phoneNumber);
    // const [comment, setComment] = useState("")

    let car = new Car();

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
                name: car.name,
                capacity: car.capacity,
                volume: car.volume,
                length: car.length,
                width: car.width,
                height: car.height,
                whereFrom: car.whereFrom,
                whereTo: car.whereTo,
                readyFrom: car.readyFrom,
                readyTo: car.readyTo,
                phone: car.phoneNumber,
                comment: car.comment,
                bodyTypes: car.bodyTypes,
                loadingTypes: car.loadingTypes,
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
                        onChange={e => car.setName(e.target.value)}/>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="carAdd__form-text">Тип кузова:</label>
                        <SelectBody value={car.bodyTypes} onChange={car.handleMultiSelectChangeBody}/>
                    </div>
                    <div className="col">
                        <label className="carAdd__form-text" htmlFor="loadingType">Тип загрузки:</label>
                        <SelectLoading value={car.handleMultiSelectChangeLoading} onChange={car.handleMultiSelectChangeLoading}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="carAdd__form-text carAdd__label-row-min" htmlFor="capacity">Грузоподъемность, т:</label>
                        <input type="number" step="any" min="0" className="form-control" id="capacity" name="capacity" required
                            onChange={e => car.setCapacity(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label className="carAdd__form-text carAdd__label-row-min" htmlFor="volume">Объем, м^3:</label>
                        <input type="number" step="any" min="0" className="form-control" id="volume" name="volume" required
                            onChange={e => car.setVolume(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="carAdd__form-text carAdd__label-row" htmlFor="length">Внутренняя длина кузова:</label>
                        <input type="number" step="any" min="0" className="form-control carAdd__form-text" id="length" name="length" required
                            onChange={e => car.setLength(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label className="carAdd__form-text carAdd__label-row" htmlFor="width">Внутренняя ширина кузова:</label>
                        <input type="number" step="any" min="0" className="form-control carAdd__form-text" id="width" name="width" required
                            onChange={e => car.setWidth(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label className="carAdd__form-text carAdd__label-row" htmlFor="height">Внутренняя высота кузова:</label>
                        <input type="number" step="any" min="0" className="form-control carAdd__form-text" id="height" name="height" required
                            onChange={e => car.setHeight(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="carAdd__form-text" htmlFor="place_from">Откуда:</label>
                        <input type="text" className="form-control" id="place_from" name="place_from" required
                            onChange={e => car.setWhereFrom(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label className="carAdd__form-text" htmlFor="place_to">Куда:</label>
                        <input type="text" className="form-control" id="place_to" name="place_to" required
                            onChange={e => car.setWhereTo(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="carAdd__form-text" htmlFor="readyFrom">Готов к загрузке с:</label>
                        <input type="date" min={date} className="form-control" id="readyFrom" name="readyFrom" required
                            onChange={e => car.setReadyFrom(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label className="carAdd__form-text" htmlFor="readyTo">Готов к разгрузке:</label>
                        <input type="date" min={toDate} className="form-control" id="readyTo" name="readyTo" required
                            onChange={e => car.setReadyTo(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3">
                    <Phone value={car.phoneNumber} onChange={car.setPhoneNumber}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="comment" className="carAdd__form-label carAdd__form-text">Комментарий:</label>
                    <textarea className="form-control" id="comment" name="comment" rows="5"
                              onChange={e => car.setComment(e.target.value)}></textarea>
                </div>
                <button type="submit" className="btn btn-dark carAdd__form-text">Отправить</button>
            </form>
        </div>
    );
};

export default AddCar;