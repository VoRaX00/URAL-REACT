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
    const [filters, setFilters] = useState({}); // Состояние для фильтров

    const getAllCargo = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://${ip}/api/Cargo/Get`, {
                params: {
                    pageNumber: currentPage,
                    ...filters // Передаем фильтры на сервер
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
    }, [currentPage, filters]);

    const getCargoByName = useCallback(async (name) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://${ip}/api/Cargo/GetByName`, {
                params: { name: name, pageNumber: currentPage }
            });
            if (response.data && response.data.items.length > 0) {
                setCargo(response.data.items);
                setTotalCargo(response.data.totalCount);
            } else {
                console.log("No cargo found with the given name");
            }
        } catch (error) {
            console.log('Error getting cargo by name', error);
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    const applyFilters = useCallback(async (newFilters) => {
        try {
            setFilters(newFilters);
            setCurrentPage(1);
            const response = await axios.get(`http://${ip}/api/Cargo/GetByFilters`, {
                params: {
                    filters,
                    pageNumber: currentPage
                }
            });
            if (response.data && response.data.items.length > 0) {
                setCargo(response.data.items);
                setTotalCargo(response.data.totalCount);
            } else {
                throw new Error("No cargo found with the given name");
            }
        }
        catch (error){
            console.log('Error getting cargo with filters', error);
        }
    }, [currentPage, filters]);

    useEffect(() => {
        if (name === '') {
            getAllCargo();
        } else {
            getCargoByName(name);
        }
    }, [currentPage, getAllCargo, getCargoByName, name, filters]);

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
                        <CargoFilters applyFilters={applyFilters} />
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
                                        <CargoItem cargo={cargo} key={index} />
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