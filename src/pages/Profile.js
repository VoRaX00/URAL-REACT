import CargoInfo from "../components/cargo/Cargo";
import "./../styles/css/Profile.css";
import user from "../img/default.png";
import {NavLink} from "react-router-dom";

const cargoData = [
    { name: 'Cargo 1', weight: 10, year: 2020, price: '$20,000', comment: 'Комментарий'},
    { name: 'Cargo 2', weight: 20, year: 2021, price: '$22,000', comment: 'Комментарий'},
    { name: 'Cargo 3', weight: 30, year: 2019, price: '$18,000', comment: 'Комментарий'},
    { name: 'Cargo 4', weight: 40, year: 2022, price: '$25,000', comment: 'Комментарий'},
];

const Profile = (props: {user: User => void}) => {
    let image;
    if (props.user.image === '') {
        image = (
            <a href="#">
                <img className="media-object profile__media-object mw150" src={user} alt="connect"/>
            </a>
        )
    }
    else {
        image = (
            <a href="#">
                <img className="media-object profile__media-object mw150" src={user} alt="connect"/>
            </a>
        )
    }

    return (
        <section id="content" className="container">
            <div className="page-heading">
                <div className="media">
                    <div className="media-left pr30">
                        {image}
                    </div>

                    <div className="media-body va-m">
                        <h2 className="media-heading">{props.user.name}</h2>
                        <div className="media-body va-m">
                            <NavLink className="btn profile__btn" to={"/edit-profile"}>Редактировать профиль</NavLink>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="panel">
                        <div className="panel-heading">
                            <span className="panel-icon">
                                <i className="fa fa-star"></i>
                            </span>
                            <span className="panel-title">
                                Контактная информация
                            </span>
                        </div>
                        <div className="panel-body pn">
                            <ul>
                                <li className="form-text-contact">email: {props.user.email}</li>
                                <li className="form-text-contact">Номер телефон: {props.user.phoneNumber}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel-heading">
                            <span className="panel-icon">
                                <i className="fa fa-pencil"></i>
                            </span>
                            <span className="panel-title">Обо мне</span>
                        </div>
                        <div className="panel-body pb5">
                            <h6>{props.user.aboutMe}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="tab-block">
                        <div className="tab-content profile__tab-content p30">
                            <h2>Мои записи</h2>
                            <div className="container cargo__container cargo__cargo-info-grid">
                                {cargoData.map((cargo, index) => (
                                  <CargoInfo key={index} cargo={cargo}/>
                                ))}
                            </div>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
