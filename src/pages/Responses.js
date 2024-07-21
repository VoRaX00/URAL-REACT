import "../styles/css/Responses.css"
import CargoInfo from "../components/cargo/Cargo";

const cargoData = [
  { name: 'Cargo 1', weight: 10, year: 2020, price: '$20,000', comment: 'Комментарий'},
  { name: 'Cargo 2', weight: 20, year: 2021, price: '$22,000', comment: 'Комментарий'},
  { name: 'Cargo 3', weight: 30, year: 2019, price: '$18,000', comment: 'Комментарий'},
  { name: 'Cargo 4', weight: 40, year: 2022, price: '$25,000', comment: 'Комментарий'},
];


const Responses = () => {
    return (
        <>
            <br/>
            <div className="container content-with-filters">
                <div className="container responses__container responses__search-from form-margin">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <form action="#" method="post">
                                <div className="input-group responses__search-container">
                                    <input type="text" className="form-control responses__search-input" name="search_input"
                                           id="search-input" placeholder="Поиск..."/>
                                    <div className="input-group-append">
                                        <button className="btn btn-dark responses__search-btn" type="submit">Поиск</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="container responses__container responses__responses-info-grid">
                    {cargoData.map((cargo, index) => (
                        <CargoInfo key={index} cargo={cargo}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Responses;