import "./../styles/css/Cars.css"
import CarInfo from "../components/CarInfo/CarInfo";
// import "./../styles/bootstrap5/css/bootstrap.css"

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
                <div className="container m32 search-from form-margin">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <form action="#" method="post">
                                <div className="input-group">
                                    <input type="text" className="form-control search-input" name="search_input" id="search-input" placeholder="Поиск..."/>
                                    <div className="input-group-append">
                                        <button className="btn btn-dark" type="submit">Поиск</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="container m32 car-info-grid">
                    {carData.map((car, index) => (
                      <CarInfo key={index} car={car} />
                    ))}
                    {/*<div className="card">*/}
                    {/*    <div className="card-header">*/}
                    {/*        <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">*/}
                    {/*            <li className="nav-item" role="presentation">*/}
                    {/*                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#general1"*/}
                    {/*                type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Общее</button>*/}
                    {/*            </li>*/}
                    {/*            <li className="nav-item" role="presentation">*/}
                    {/*                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#parameter1" type="button"*/}
                    {/*                role="tab" aria-controls="profile-tab-pane" aria-selected="false">Характеристики</button>*/}
                    {/*            </li>*/}
                    {/*            <li className="nav-item" role="presentation">*/}
                    {/*                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#comment1"*/}
                    {/*                type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Комментарий</button>*/}
                    {/*            </li>*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}

                    {/*    <div className="tab-content" id="myTabContent">*/}
                    {/*        <div className="tab-pane fade show active" id="general1" role="tabpanel" aria-labelledby="home-tab" tab-index="0">*/}
                    {/*            <div className="card-body">*/}
                    {/*                <div className="mb-3 row">*/}
                    {/*                    <div className="col-4">*/}
                    {/*                        <h5>Toyota Crown</h5>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="col-8">*/}
                    {/*                        <h6>Откуда: Владивосток</h6>*/}
                    {/*                        <h6>Куда: Москва</h6>*/}
                    {/*                        <h6>Даты: 25.07.2024 - 26.07.2024</h6>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className="mb-3">*/}
                    {/*                    <form action="#" method="post">*/}
                    {/*                        <input type="hidden" id="car_id" name="car_id" value="1"/>*/}
                    {/*                        <button type="submit" className="btn btn-dark">Откликнуться</button>*/}
                    {/*                    </form>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="tab-pane fade" id='parameter1' role="tabpanel" aria-labelledby="profile-tab" tabindex="0">*/}
                    {/*            <div className="card-body">*/}
                    {/*                <div className="mb-3 row">*/}
                    {/*                    <div className="col-4">*/}
                    {/*                        <h7>Длина: 2.5 м</h7>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="col-4">*/}
                    {/*                        <h7>Ширина: 1.7 м</h7>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="col-4">*/}
                    {/*                        <h7>Высота: 1.6 м</h7>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className="mb-3 row">*/}
                    {/*                    <div className="col-6">*/}
                    {/*                        <h7>Грузоподъёмность, т: 2</h7>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="col-6">*/}
                    {/*                        <h7>Объём, м³:  10</h7>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className="mb-3 row">*/}
                    {/*                    <h7>Тип кузова:</h7>*/}
                    {/*                    <ul className="list-group">*/}
                    {/*                        <li className="list-group-item">Сидан</li>*/}
                    {/*                    </ul>*/}
                    {/*                </div>*/}
                    {/*                <div className="mb-3 row">*/}
                    {/*                    <h7>Тип загрузки:</h7>*/}
                    {/*                    <ul className="list-group">*/}
                    {/*                        <li className="list-group-item">Верхняя</li>*/}
                    {/*                    </ul>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="tab-pane fade" id="comment1" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">*/}
                    {/*            <div className="card-body">*/}
                    {/*                <h5>Комметарий</h5>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            <br/>
            </div>
        </>
    )
}

export default Cars;