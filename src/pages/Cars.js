import "./../styles/css/Cars.css"
import Car from "../components/сar/Car"

const carData = [
  { name: 'Car 1', model: 'Model A', year: 2020, price: '$20,000', comment: 'Комментарий'},
  { name: 'Car 2', model: 'Model B', year: 2021, price: '$22,000', comment: 'Комментарий'},
  { name: 'Car 3', model: 'Model C', year: 2019, price: '$18,000', comment: 'Комментарий'},
  { name: 'Car 4', model: 'Model D', year: 2022, price: '$25,000', comment: 'Комментарий'},
];


const Cars = () => {
    return(
        <>
            <br/>
            <div className="container content-with-filters">
                <div className="container cars__container cars__search-from form-margin">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <form action="#" method="post">
                                <div className="input-group cars__search-container">
                                    <input type="text" className="form-control cars__search-input" name="search_input"
                                           id="search-input" placeholder="Поиск..."/>
                                    <div className="input-group-append">
                                        <button className="btn btn-dark cars__search-btn" type="submit">Поиск</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


                <div className="container cars__container cars__car-info-grid">
                    {carData.map((car, index) => (
                        <Car key={index} car={car}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Cars;