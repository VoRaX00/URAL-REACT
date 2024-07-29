import "./../styles/css/Cargo.css"
import CargoInfo from "../components/cargo/Cargo";
import React, {SyntheticEvent} from "react";

const cargoData = [
  { name: 'Cargo 1', weight: 10, year: 2020, price: '$20,000', comment: 'Комментарий'},
  { name: 'Cargo 2', weight: 20, year: 2021, price: '$22,000', comment: 'Комментарий'},
  { name: 'Cargo 3', weight: 30, year: 2019, price: '$18,000', comment: 'Комментарий'},
  { name: 'Cargo 4', weight: 40, year: 2022, price: '$25,000', comment: 'Комментарий'},
];

const Cargo = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [redirect, setRedirect] = React.useState(false);

    const response = async (e: SyntheticEvent) => {
        e.preventDefault()

        const response = await fetch("http://localhost:5036/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        const content = await response.json();
    }

    return (
        <>
            <br/>
            <div className="container content-with-filters">
                <div className="container cargo__container cargo__search-from form-margin">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <form action="#" method="post">
                                <div className="input-group cargo__search-container">
                                    <input type="text" className="form-control cargo__search-input" name="search_input"
                                           id="search-input" placeholder="Поиск..."/>
                                    <div className="input-group-append">
                                        <button className="btn btn-dark cargo__search-btn" type="submit">Поиск</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="container cargo__container cargo__cargo-info-grid">
                    {cargoData.map((cargo, index) => (
                        <CargoInfo key={index} cargo={cargo}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Cargo