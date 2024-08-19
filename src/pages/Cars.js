import "./../styles/css/Cars.css"
import Car from "../components/car/Car"
import qs from "qs"
import {SyntheticEvent, useCallback, useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../components/pagination/Pagination";
import {ip} from "../env/env";
import CarFilters from "../components/carFilter/CarFilter";

const Cars = () => {
    const [name, setName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(4);
    const [totalCars, setTotalCars] = useState(0);
    const [cars, setCars] = useState([]);
        const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({
        name: '',
        length: 0,
        width: 0,
        height: 0,
        capacity: 0,
        volume: 0,
        readyFrom: '',
        readyTo: '',
        whereFrom: '',
        whereTo: '',
        bodyTypes: [],
        loadingTypes: []
    });

    const getAllCars = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axios.get(`http://${ip}/api/Car/Get`, {
                params: { pageNumber: currentPage }
            });
            if (response.data && response.data.items) {
                setCars(response.data.items);
                setTotalCars(response.data.totalCount);
            } else {
                console.log("No data received");
            }
        } catch (error) {
            console.log('Error getting all cargo', error);
        } finally {
            setLoading(false);
        }
    }, [currentPage])

    const applyFilters = useCallback(async (newFilters) => {
        try {
            setFilter(newFilters);
            setCurrentPage(1);
            console.log(newFilters)
            const validFilters = Object.keys(newFilters)
            .filter(key => newFilters[key] !== null && newFilters[key] !== [] && newFilters[key] !== '' && newFilters[key] !== 0)
            .reduce((obj, key) => {
                obj[key] = newFilters[key];
                return obj;
            }, {});
            console.log(validFilters);
            const response = await axios.get(`http://${ip}/api/Car/GetByFilters`, {
                params: {
                    ...validFilters,
                    pageNumber: currentPage
                },
                paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
            });
            if (response.status === 200) {
                setCars(response.data.items);
                setTotalCars(response.data.totalCount);
            } else {
                throw new Error("No cargo found with the given name");
            }
        }
        catch (error){
            console.log('Error getting cargo with filters', error);
        }
    }, [currentPage]);

    const getCarsByName = useCallback(async (name) => {
        try {
            setLoading(true);
            await applyFilters({name: name})
        } catch (error) {
            console.log('Error getting cargo by name', error);
        } finally {
            setLoading(false);
        }
    }, [applyFilters]);

    useEffect(() => {
        if (name === '') {
            getAllCars();
        }
    }, [currentPage, getAllCars, name]);

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
                        <CarFilters filter={filter} setFilter={setFilter} name={name} applyFilters={applyFilters} />
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