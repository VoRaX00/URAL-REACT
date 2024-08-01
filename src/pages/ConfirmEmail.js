import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import user from "../entity/User";

const ConfirmEmailPage = () => {
    const [searchParams] = useSearchParams();

    const confirm = async () =>{
        try {
            const userId = searchParams.get("userId");
            const code = searchParams.get("code");
            console.log(userId, code);
            await axios.post(`http://localhost:5036/api/User/ConfirmEmail?userId=${userId}&code=${code}`)
        }
        catch(error){
            console.log('Error confirm email: ' + error);
        }
    }

    useEffect(() => {
        confirm()
    }, [searchParams]);

    return (
        <>
            <section className="main-content">
                <div className="container">
                    Вы успешно подтвердили почту!
                </div>
            </section>
        </>
    );
}

export default ConfirmEmailPage;