import SelectBody from "../components/selectBody/SelectBody";
import {useState} from "react";
import SelectLoading from "../components/selectLoading/SelectLoading";
import "./../styles/css/AddCar.css"
import Phone from "../components/phone/Phone";
const AddCar = () => {
    const [selectedOptionsBody, setSelectedOptionsBody] = useState([]);
    const [selectedOptionsLoading, setSelectedOptionsLoading] = useState([]);

    const handleMultiSelectChangeBody = (selectedOptions) => {
        setSelectedOptionsBody(selectedOptions);
    };

    const handleMultiSelectChangeLoading = (selectedOptions) => {
        setSelectedOptionsLoading(selectedOptions);
    };

    const [phone, setPhone] = useState('');

    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <form className="card p-5 shadow-sm" action="#" method="post">
                <div className="mb-3">
                    <label className="form-text" htmlFor="car">Автомобиль</label>
                    <input type="text" name="car" id="car" className="form-control" required/>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="form-text">Тип кузова:</label>
                        <SelectBody value={selectedOptionsBody} onChange={handleMultiSelectChangeBody}/>
                    </div>
                    <div className="col">
                        <label className="form-text" htmlFor="loadingType">Тип загрузки:</label>
                        <SelectLoading value={selectedOptionsLoading} onChange={handleMultiSelectChangeLoading}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="form-text label-row-min" htmlFor="capacity">Грузоподъемность, т:</label>
                        <input type="number" step="any" min="0" className="form-control" id="capacity" name="capacity"
                               required/>
                    </div>
                    <div className="col">
                        <label className="form-text label-row-min" htmlFor="volume">Объем, м^3:</label>
                        <input type="number" step="any" min="0" className="form-control" id="volume" name="volume"
                               required/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="form-text label-row" htmlFor="length">Внутренняя длина кузова:</label>
                        <input type="number" step="any" min="0" className="form-control form-text" id="length"
                               name="length" required/>
                    </div>
                    <div className="col">
                        <label className="form-text label-row" htmlFor="width">Внутренняя ширина кузова:</label>
                        <input type="number" step="any" min="0" className="form-control form-text" id="width"
                               name="width" required/>
                    </div>
                    <div className="col">
                        <label className="form-text label-row" htmlFor="height">Внутренняя высота кузова:</label>
                        <input type="number" step="any" min="0" className="form-control form-text" id="height"
                               name="height" required/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="form-text" htmlFor="place_from">Откуда:</label>
                        <input type="text" className="form-control" id="place_from" name="place_from" required/>
                    </div>
                    <div className="col">
                        <label className="form-text" htmlFor="place_to">Куда:</label>
                        <input type="text" className="form-control" id="place_to" name="place_to" required/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col">
                        <label className="form-text" htmlFor="readyFrom">Готов к загрузке с:</label>
                        <input type="date" className="form-control" id="readyFrom" name="readyFrom" required/>
                    </div>
                    <div className="col">
                        <label className="form-text" htmlFor="readyTo">Готов к загрузке до:</label>
                        <input type="date" className="form-control" id="readyTo" name="readyTo" required/>
                    </div>
                </div>
                <div className="mb-3">
                    <Phone value={phone} onChange={setPhone}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="comment" className="form-label form-text">Комментарий:</label>
                    <textarea className="form-control" id="comment" name="comment" rows="5"></textarea>
                </div>
                <button type="submit" className="btn btn-dark form-text">Отправить</button>
            </form>
        </div>
    );
};

export default AddCar;