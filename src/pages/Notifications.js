import "../styles/css/Notifications.css";
import CargoInfo from "../components/cargo/Cargo";
import axios from "axios";
import React, {useEffect, useState, useCallback} from "react";
import Cookies from "universal-cookie";
import Pagination from "../components/pagination/Pagination";
import Car from "../components/car/Car";
import {ip} from "../env/env";

const Notifications = () => {
    const token = new Cookies().get("jwt_authorization");
    const [currentPageNotify, setCurrentPageNotify] = useState(1);
    const [postsPerPageNotify] = useState(4);
    const [totalNotify, setTotalNotify] = useState(0);
    const [notifications, setNotifications] = useState([]);

    const getAllNotifications = useCallback(async () => {
        try {
            const response = await axios.get(`http://${ip}/api/Notifications/GetUserNotifications`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    pageNumber: currentPageNotify,
                }
            });
            if (response.data && response.data.items.length) {
                setNotifications(response.data.items);
                setTotalNotify(response.data.totalCount);
            } else{
                console.log("No data received");
            }
        } catch (error) {
            console.log('Error getting all cargo', error);
        }
    }, [token, currentPageNotify]);

    useEffect(() => {
        getAllNotifications();
    }, [getAllNotifications]);

    return (
        <>
            <br/>
            <div className="container content-with-filters">
                <div className="container notifications__container notifications__notifications-info-grid">
                    {notifications.length > 0 ? (
                        notifications.map((notify, index) => (notify.car === null ? (
                                <CargoInfo key={index} cargo={notify.cargo}/>
                            ) : (
                                <Car key={index} car={notify.car}/>
                            )
                        ))) : (
                        <p>Загрузка...</p>
                    )}
                </div>
                <Pagination
                    totalPosts={totalNotify}
                    postsPerPage={postsPerPageNotify}
                    setCurrentPage={setCurrentPageNotify}
                    currentPage={currentPageNotify}
                />
                <br/>
            </div>
        </>
    )
}

export default Notifications;