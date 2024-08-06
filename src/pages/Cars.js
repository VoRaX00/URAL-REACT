import "./../styles/css/Cars.css"
import Car from "../components/car/Car"
import {SyntheticEvent, useCallback, useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../components/Pagination/Pagination";
import {ip} from "../env/env";

const Cars = () => {
    const [name, setName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(4);
    const [totalCars, setTotalCars] = useState(0);
    const [cars, setCars] = useState([]);

    const getAllCars = useCallback(async () => {
        try {
            const response = await axios.get(`http://${ip}/api/Car/Get`, {
                params: { pageNumber: currentPage }
            });
            if (response.data && response.data.items) {
                setCars(response.data.items);
                setTotalCars(response.data.totalCount); // Предполагаем, что сервер возвращает общее количество элементов
            } else {
                console.log("No data received");
            }
        } catch (error) {
            console.log('Error getting all cargo', error);
        }
    })

    const getCarsByName = useCallback(async (name) => {
        try {
            const response = await axios.get(`http://${ip}/api/Car/GetByName`, {
                params: { name: name, pageNumber: currentPage }
            });
            if (response.data && response.data.items.length > 0) {
                setCars(response.data.items);
                setTotalCars(response.data.totalCount);
            } else {
                console.log("No cargo found with the given name");
            }
        } catch (error) {
            console.log('Error getting cargo by name', error);
        }
    })

    useEffect(() => {
        if (name === '') {
            getAllCars();
            console.log(cars)
        } else {
            getCarsByName(name);
        }
    }, [cars, currentPage, getAllCars, getCarsByName, name]);

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (name !== '') {
            getCarsByName(name);
        } else {
            getAllCars();
            console.log(cars)
        }
    }

    return(
        <>
            <br/>
            <div className="container content-with-filters">
                <div className="container cars__container cars__search-from form-margin">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <form action="#" method="post" onSubmit={submit}>
                                <div className="input-group cars__search-container">
                                    <input type="text" className="form-control cars__search-input" name="search_input"
                                           id="search-input" value={name} onChange={setName} placeholder="Поиск..."/>
                                    <div className="input-group-append">
                                        <button className="btn btn-dark cars__search-btn" type="submit">Поиск</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="container cars__container cars__car-info-grid">
                    {cars.length > 0 ? (
                        cars.map((car, index) => (
                            <Car key={index} car={car}/>
                        ))
                    ) : (
                        <p>Загрузка...</p>
                    )}
                </div>
            </div>
            <Pagination
                totalPosts={totalCars}
                posts={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
            <br/>
        </>
    )
}

export default Cars;