import React, {useEffect} from 'react';
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";

const MainPage = () => {

   const navigate = useNavigate();

    useEffect(() => {
        const token = new Cookies().get("jwt_authorization");
        if (token === null) {
            navigate("/login")
        }
    }, [navigate])

    return (
        <>
            <section className="main-content">
                <div className="container">

                </div>
            </section>
        </>
    );
}

export default MainPage;