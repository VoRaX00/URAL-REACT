import "./../styles/css/Cargo.css";
import CargoInfo from "../components/cargo/Cargo";
import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination/Pagination";
import ip from "../env/env";

const Cargo = () => {
    const [name, setName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);
    const [totalCargo, setTotalCargo] = useState(0);
    const [cargo, setCargo] = useState([]);

    const getAllCargo = async () => {
        try {
            const response = await axios.get(`http://${ip}/api/Cargo/Get`, {
                params: { pageNumber: currentPage }
            });
            if (response.data && response.data.items) {
                setCargo(response.data.items);
                setTotalCargo(response.data.totalCount); // Предполагаем, что сервер возвращает общее количество элементов
            } else {
                console.log("No data received");
            }
        } catch (error) {
            console.log('Error getting all cargo', error);
        }
    }

    const getCargoByName = async (name) => {
        try {
            const response = await axios.get(`http://${ip}/api/Cargo/GetByName`, {
                params: { name: name, pageNumber: currentPage }
            });
            if (response.data && response.data.items.length > 0) {
                setCargo(response.data.items);
                setTotalCargo(response.data.totalCount); // Предполагаем, что сервер возвращает общее количество элементов
            } else {
                console.log("No cargo found with the given name");
            }
        } catch (error) {
            console.log('Error getting cargo by name', error);
        }
    }

    useEffect(() => {
        if (name === '') {
            getAllCargo();
        } else {
            getCargoByName(name);
        }
    }, [currentPage, name]);

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
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
                <div className="container cargo__container cargo__search-from form-margin">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <form action="#" method="post" onSubmit={submit}>
                                <div className="input-group cargo__search-container">
                                    <input type="text" className="form-control cargo__search-input" name="search_input"
                                           id="search-input" placeholder="Поиск..." value={name} onChange={(e) => setName(e.target.value)} />
                                    <div className="input-group-append">
                                        <button className="btn btn-dark cargo__search-btn" type="submit">Поиск</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="container cargo__container cargo__cargo-info-grid">
                    {cargo.length > 0 ? (
                        cargo.map((cargo, index) => (
                        <CargoInfo key={index} cargo={cargo} />
                    ))
                    ) : (
                        <p>Загрузка...</p>
                    )}
                </div>
            </div>
            <Pagination
                totalPosts={totalCargo}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    );
}

export default Cargo;