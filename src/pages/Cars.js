import "./../styles/css/Cars.css"
import Car from "../components/car/Car"
import {SyntheticEvent, useCallback, useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../components/pagination/Pagination";
import {ip} from "../env/env";
import CargoFilters from "../components/cargoFilter/CargoFilter";
import CarFilters from "../components/carFilter/CarFilter";

const Cars = () => {
    const [name, setName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(4);
    const [totalCars, setTotalCars] = useState(0);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllCars = useCallback(async () => {
        try {
            setLoading(true)
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
        } finally {
            setLoading(false);
        }
    }, [currentPage])

    const getCarsByName = useCallback(async (name) => {
        try {
            setLoading(true)
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
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        if (name === '') {
            getAllCars();
        } else {
            getCarsByName(name);
        }
    }, [currentPage, getAllCars, getCarsByName, name]);

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        setCurrentPage(1)
        if (name !== '') {
            getCarsByName(name);
        } else {
            getAllCars();
        }
    }

    return(
        <>
            <br/>
            <div className="container content-with-filters">
                <div className="row">
                    <div className="col-lg-3">
                        <CarFilters/>
                    </div>
                    <div className="col-lg-9">
                        <div className="container cars__container cars__search-from form-margin">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <form method="post" onSubmit={submit}>
                                        <div className="input-group cars__search-container">
                                            <input type="text" className="form-control cars__search-input"
                                                   name="search_input"
                                                   id="search-input" value={name}
                                                   onChange={(e) => setName(e.target.value)} placeholder="Поиск..."/>
                                            <div className="input-group-append">
                                                <button className="btn btn-dark cars__search-btn" type="submit">Поиск
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="cars-list-container">
                            {loading ? (
                                    <p>Загрузка...</p>
                                ) :
                                cars.length > 0 ? (
                                    cars.map((car, index) => (
                                        <Car key={index} car={car}/>
                                    ))
                                ) : (
                                    <p>Ничего не найдено</p>
                                )}
                        </div>
                    </div>
                    <Pagination
                        totalPosts={totalCars}
                        postsPerPage={postsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                    <br/>
                </div>
            </div>
        </>
    )
}

export default Cars;