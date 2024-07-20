import "./style.css";
import "./../../styles/css/style.css"
const Footer = () => {
    return(
        <footer className="footer">
            <section className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <h4>Информация</h4>
                            <ul className="list-unstyled">
                                <li>ООО "БСКА-УРАЛ"</li>
                            </ul>
                        </div>
                        <div className="col-6">
                            <h4>Контакты</h4>
                            <ul className="list-unstyled">
                                <li>Email: bskaUral@gmail.com</li>
                                <li>Номер телефона: +79991259178</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
}

export default Footer;