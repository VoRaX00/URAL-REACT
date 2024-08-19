import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import '../styles/css/Cargo.css';
import { ip } from "../env/env";
import CargoItem from "../components/cargo/Cargo";
import {SyntheticEvent} from "react";
import Pagination from "../components/pagination/Pagination";
import CargoFilters from "../components/cargoFilter/CargoFilter"; // Импортируем компонент фильтров

const Cargo = () => {
    const [name, setName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(4);
    const [totalCargo, setTotalCargo] = useState(0);
    const [cargo, setCargo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({
        name: name || '',
        length: 0,
        width: 0,
        height: 0,
        weight: 0,
        volume: 0,
        countPlace: 0,
        loadingDate: '',
        unloadingDate: '',
        loadingPlace: '',
        unloadingPlace: '',
        priceCash: 0,
        priceCashNds: 0,
        priceCashWithoutNds: 0,
        requestPrice: null,
    });

    const getAllCargo = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://${ip}/api/Cargo/Get`, {
                params: {
                    pageNumber: currentPage,
                }
            });
            if (response.data && response.data.items) {
                setCargo(response.data.items);
                setTotalCargo(response.data.totalCount);
            } else {
                console.log("No data received");
            }
        } catch (error) {
            console.log('Error getting all cargo', error);
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    const applyFilters = useCallback(async (newFilters) => {
        try {
            setFilter(newFilters);
            setCurrentPage(1);
            console.log(newFilters)
            const validFilters = Object.keys(newFilters)
            .filter(key => newFilters[key] !== null && newFilters[key] !== '' && newFilters[key] !== 0)
            .reduce((obj, key) => {
                obj[key] = newFilters[key];
                return obj;
            }, {});
            console.log(validFilters)
            const response = await axios.get(`http://${ip}/api/Cargo/GetByFilters`, {
                params: {
                    ...validFilters,
                    pageNumber: currentPage
                }
            });
            if (response.status === 200) {
                setCargo(response.data.items);
                setTotalCargo(response.data.totalCount);
            } else {
                throw new Error("No cargo found with the given name");
            }
        }
        catch (error){
            console.log('Error getting cargo with filters', error);
        }
    }, [currentPage]);

    const getCargoByName = useCallback(async (name) => {
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
            getAllCargo();
        }
    }, [currentPage, getAllCargo, name]);

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        setCurrentPage(1)
        if (name !== '') {
            getCargoByName(name);
        } else {
            getAllCargo();
        }
    }



    return (
        <>
            <br/>
            <div className="container content-with-filters">
                <div className="row">
                    <div className="col-lg-3">
                        <CargoFilters filter={filter} setFilter={setFilter} name={name} applyFilters={applyFilters} />
                    </div>
                    <div className="col-lg-9">
                        <div className="container cargo__container cargo__search-from form-margin">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <form method="post" onSubmit={submit}>
                                        <div className="input-group cargo__search-container">
                                            <input type="text" className="form-control cargo__search-input" name="search_input"
                                                   id="search-input" placeholder="Поиск..." value={name}
                                                   onChange={(e) => setName(e.target.value)}/>
                                            <div className="input-group-append">
                                                <button className="btn btn-dark cargo__search-btn" type="submit">Поиск</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="cargo-list-container">
                            {loading ? (
                                <p>Загрузка...</p>
                            ) : (
                                cargo.length > 0 ? (
                                    cargo.map((cargo, index) => (
                                        <CargoItem cargo={cargo} typeSubmit={'Cargo'} key={index} />
                                    ))
                                ) : (
                                    <p>Ничего не найдено</p>
                                )
                            )}
                        </div>
                        <Pagination
                            totalPosts={totalCargo}
                            postsPerPage={postsPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cargo;