import React, { SyntheticEvent, useState } from "react";
import SelectBody from "../components/selectBody/SelectBody";
import SelectLoading from "../components/selectLoading/SelectLoading";
import "./../styles/css/AddCar.css";
import Phone from "../components/phone/Phone";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Cookies from "universal-cookie";

const bodyTypesMap = {
  'тентовый': 1,
  'контейнер': 2,
  'открытый конт.': 3,
  'площадка без бортов': 4,
  'фургон': 5,
  'цельнометалл': 6,
  'изотермический': 7,
  'рефрижератор': 8,
  'реф. мультирежимный': 9,
  'реф. с перегородкой': 10,
  'реф. -тушевоз': 11,
  'бортовой': 12,
  'самосвал': 13,
  'шаланда': 14,
  'низкорамный': 15,
  'низкорам.платф.': 16,
  'телескопический': 17,
  'трал': 18,
  'балковоз(негабарит)': 19,
  'автобус': 20,
  'автовоз': 21,
  'автовышка': 22,
  'автотранспортер': 23,
  'бетоновоз': 24,
  'битумовоз': 25,
  'бензовоз': 26,
  'вездеход': 27,
  'газовоз': 28,
  'зерновоз': 29,
  'коневоз': 30,
  'контейнеровоз': 31,
  'кормовоз': 32,
  'кран': 33,
  'лесовоз': 34,
  'ломовоз': 35,
  'манипулятор': 36,
  'микроавтобус': 37,
  'муковоз': 38,
  'панелевоз': 39,
  'пикап': 40,
  'пухтовоз': 41,
  'пирамида': 42,
  'рулоновоз': 43,
  'седельный тягач': 44,
  'скотовоз': 45,
  'стекловоз': 46,
  'трубовоз': 47,
  'цементовоз': 48,
  'автоцистерна': 49,
  'щеповоз': 50,
  'эвакуатор': 51,
  'грузопассажирский': 52,
  'клюшковоз': 53,
  'мусоровоз': 54,
  'jumbo': 55,
  '20 танк-контейнер': 56,
  '40 танк-контейнер': 57,
  'мега фура': 58,
  'допельшток': 59,
  'Раздвижной полуприцеп 20/40': 60,
};

const loadingTypesMap = {
  'боковая': 1,
  'верхняя': 2,
  'задняя': 3,
  'с полной растентовкой': 4,
  'со снятием поперечных перекладин': 5,
  'со снятием стоек': 6,
  'без ворот': 7,
  'гидроборт': 8,
  'аппарели': 9,
  'с обрешеткой': 10,
  'с бортами': 11,
  'боковая с 2-х сторон': 12,
  'налив': 13,
  'электрический': 14,
  'гидравлический': 15,
  'пневматический': 16,
  'дизельный компрессор': 17,
};

const AddCar = () => {
    const token = new Cookies().get("jwt_authorization");
    const object = jwtDecode(token);

    const [selectedOptionsBody, setSelectedOptionsBody] = useState([]);
    const [selectedOptionsLoading, setSelectedOptionsLoading] = useState([]);

    const handleMultiSelectChangeBody = (selectedOptions) => {
        setSelectedOptionsBody(selectedOptions);
        setCar(prevCar => ({
            ...prevCar,
            bodyTypes: selectedOptions.map(option => ({ id: bodyTypesMap[option.value] }))
        }));
    };

    const handleMultiSelectChangeLoading = (selectedOptions) => {
        setSelectedOptionsLoading(selectedOptions);
        setCar(prevCar => ({
            ...prevCar,
            loadingTypes: selectedOptions.map(option => ({ id: loadingTypesMap[option.value] }))
        }));
    };

    const [car, setCar] = useState({
        name: "",
        capacity: 0,
        volume: 0,
        length: 0,
        width: 0,
        height: 0,
        whereFrom: "",
        whereTo: "",
        readyFrom: '',
        readyTo: '',
        phone: parseInt(object.PhoneNumber),
        comment: "",
        bodyTypes: [],
        loadingTypes: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCar(prevCar => ({
            ...prevCar,
            [name]: name === 'capacity' || name === 'volume' || name === 'length' || name === 'width' || name === 'height'
                ? parseInt(value) || 0 // Преобразуем значение в число, если поле числовое
                : value
    }));
};
    const handlePhoneChange = (value) => {
        setCar(prevCar => ({
            ...prevCar,
            phone: Number(value) // Преобразуем значение в число
        }));
    };

    const [redirect, setRedirect] = useState(false);

    const curr = new Date();
    curr.setDate(curr.getDate());
    const date = curr.toISOString().substring(0, 10);
    curr.setDate(curr.getDate() + 1);

    const submit = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            const response = await fetch("http://localhost:5036/api/Car/Add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(car)
            });
            if (response.ok) {
                setRedirect(true);
            } else {
                throw "Не удалось выполнить запрос"
            }
        }
        catch (error){
            console.log(error)
        }
    }

    if (redirect) {
        return <Navigate to={"/cars"} />
    }

    return (
        <div className="carAdd__container min-vh-100 d-flex justify-content-center align-items-center">
            <form className="card p-5 shadow-sm" action="#" method="post" onSubmit={submit}>
                <div className="mb-3">
                    <label className="carAdd__form-text" htmlFor="car">Автомобиль</label>
                    <input type="text" name="name" id="car" className="form-control" required
                           onChange={handleInputChange}/>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="carAdd__form-text" htmlFor="bodyType">Тип кузова:</label>
                        <SelectBody value={selectedOptionsBody} onChange={handleMultiSelectChangeBody}/>
                    </div>
                    <div className="col">
                        <label className="carAdd__form-text" htmlFor="loadingType">Тип загрузки:</label>
                        <SelectLoading value={selectedOptionsLoading} onChange={handleMultiSelectChangeLoading}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="carAdd__form-text carAdd__label-row-min" htmlFor="capacity">Грузоподъемность,
                            т:</label>
                        <input type="number" step="any" min="0" className="form-control" id="capacity" name="capacity"
                               required
                               onChange={handleInputChange}/>
                    </div>
                    <div className="col">
                        <label className="carAdd__form-text carAdd__label-row-min" htmlFor="volume">Объем, м^3:</label>
                        <input type="number" step="any" min="0" className="form-control" id="volume" name="volume"
                               required
                               onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="carAdd__form-text carAdd__label-row" htmlFor="length">Внутренняя длина
                            кузова:</label>
                        <input type="number" step="any" min="0" className="form-control carAdd__form-text" id="length"
                               name="length" required
                               onChange={handleInputChange}/>
                    </div>
                    <div className="col">
                        <label className="carAdd__form-text carAdd__label-row" htmlFor="width">Внутренняя ширина
                            кузова:</label>
                        <input type="number" step="any" min="0" className="form-control carAdd__form-text" id="width"
                               name="width" required
                               onChange={handleInputChange}/>
                    </div>
                    <div className="col">
                        <label className="carAdd__form-text carAdd__label-row" htmlFor="height">Внутренняя высота
                            кузова:</label>
                        <input type="number" step="any" min="0" className="form-control carAdd__form-text" id="height"
                               name="height" required
                               onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="carAdd__form-text" htmlFor="whereFrom">Откуда:</label>
                    <input type="text" name="whereFrom" id="whereFrom" className="form-control" required
                           onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label className="carAdd__form-text" htmlFor="whereTo">Куда:</label>
                    <input type="text" name="whereTo" id="whereTo" className="form-control" required
                           onChange={handleInputChange}/>
                </div>
                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text" htmlFor="loadingDate">Дата загрузки:</label>
                        <input type="date" min={date} className="form-control" id="readyFrom" name="readyFrom"
                               required
                               onChange={handleInputChange}/>
                    </div>
                    <div className="col-md-6">
                        <label className="cargoAdd__form-text" htmlFor="unloadingDate">Дата разгрузки:</label>
                        <input type="date" min={date} className="form-control" id="readyTo" name="readyTo"
                               required
                               onChange={handleInputChange}/>
                    </div>
                </div>
                {/*<div className="mb-3">*/}
                {/*    <label className="carAdd__form-text" htmlFor="readyFrom">Готовность с:</label>*/}
                {/*    <input type="date" name="readyFrom" id="readyFrom" className="form-control" defaultValue={date} required*/}
                {/*        onChange={handleInputChange} />*/}
                {/*</div>*/}
                {/*<div className="mb-3">*/}
                {/*    <label className="carAdd__form-text" htmlFor="readyTo">Готовность по:</label>*/}
                {/*    <input type="date" name="readyTo" id="readyTo" className="form-control" defaultValue={toDate} required*/}
                {/*        onChange={handleInputChange} />*/}
                {/*</div>*/}
                <div className="mb-3">
                    {/*(value) => setCar({ ...car, phone: value })*/}
                    <Phone phone={car.phone} onChange={handlePhoneChange}/>
                </div>
                <div className="mb-3">
                    <label className="carAdd__form-text" htmlFor="comment">Комментарий:</label>
                    <input type="text" name="comment" id="comment" className="form-control"
                           onChange={handleInputChange}/>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" type="submit">Добавить</button>
                </div>
            </form>
        </div>
    );
};

export default AddCar;
