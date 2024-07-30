import "./../styles/css/Cargo.css";
import CargoInfo from "../components/cargo/Cargo";
import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";

const Cargo = () => {
    const [name, setName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [cargo, setCargo] = useState([]);

    const getAllCargo = async () => {
        try {
            const response = await axios.get("http://localhost:5036/api/Cargo/Get", {
                params: { pageNumber: currentPage }
            });
            if (response.data && response.data.items) {
                setCargo(response.data.items);
            } else {
                console.log("No data received");
            }
        } catch (error) {
            console.log('Error getting all cargo', error);
        }
    }

    const getCargoByName = async (name) => {
        try {
            const response = await axios.get("http://localhost:5036/api/Cargo/GetByName", {
                // headers: { "Content-Type": "application/json" },
                params: { name: name, pageNumber: currentPage }
            });
            if (response.data.items.length > 0) {
                setCargo(response.data.items);
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
                    {cargo.length > 0 ? (cargo.map((c, index) => (
                        <CargoInfo key={index} cargo={c} />
                    ))) : (
                        <p>Загрузка...</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Cargo;


// import "./../styles/css/Cargo.css"
// import CargoInfo from "../components/cargo/Cargo";
// import React, {SyntheticEvent, useEffect, useState} from "react";
// import axios from "axios";
//
// const cargoData = [
//   { name: 'Cargo 1', weight: 10, year: 2020, price: '$20,000', comment: 'Комментарий'},
//   { name: 'Cargo 2', weight: 20, year: 2021, price: '$22,000', comment: 'Комментарий'},
//   { name: 'Cargo 3', weight: 30, year: 2019, price: '$18,000', comment: 'Комментарий'},
//   { name: 'Cargo 4', weight: 40, year: 2022, price: '$25,000', comment: 'Комментарий'},
// ];
//
// const Cargo = () => {
//     const [name, setName] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [postsPerPage, setPostsPerPage] = useState(8);
//     const [cargo, setCargo] = useState([]);
//
//     const getAllCargo = async () => {
//         const response = await axios.get("http://localhost:5036/api/Cargo/Get", {
//             params: {
//                 pageNumber: currentPage,
//             }
//         })
//         if(response.data.length != 0) {
//             setCargo(response.data.items);
//         }
//         else{
//             console.log(response.data);
//         }
//     }
//
//     if(name === '')
//         getAllCargo()
//
//     const submit = async (e: SyntheticEvent) => {
//         try {
//             let response;
//             if (name !== '') {
//                 response = await axios.get("http://localhost:5036/api/Cargo/GetByName", {
//                     params: {
//                         name: name,
//                         pageNumber: currentPage,
//                     }
//                 })
//                 if (response.data.length != 0) {
//                     setCargo(response.data);
//                 } else {
//                     console.log("Error response data clear");
//                 }
//             } else {
//                 await getAllCargo()
//             }
//         } catch (error) {
//             console.log('Error getting cargo', error);
//         }
//     }
//
//     return (
//         <>
//             <br/>
//             <div className="container content-with-filters">
//                 <div className="container cargo__container cargo__search-from form-margin">
//                     <div className="row justify-content-center">
//                         <div className="col-md-8">
//                             <form action="#" method="post" onSubmit={submit}>
//                                 <div className="input-group cargo__search-container">
//                                     <input type="text" className="form-control cargo__search-input" name="search_input"
//                                            id="search-input" placeholder="Поиск..."/>
//                                     <div className="input-group-append">
//                                         <button className="btn btn-dark cargo__search-btn" type="submit">Поиск</button>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//
//                 <div className="container cargo__container cargo__cargo-info-grid">
//                     {cargo.length > 0 ? (cargo.map((c, index) => (
//                         <CargoInfo key={index} cargo={c}/>
//                     ))) : (
//                         <p>Загрузка...</p>
//                     )}
//                 </div>
//             </div>
//         </>
//     )
// }
//
// export default Cargo