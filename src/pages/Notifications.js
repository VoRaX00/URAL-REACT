import "../styles/css/Notifications.css"
import CargoInfo from "../components/cargo/Cargo";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import Pagination from "../components/Pagination/Pagination";
import Car from "../components/car/Car";


const Notifications = () => {
    const token = new Cookies().get("jwt_authorization");
    const [currentPageNotify, setCurrentPageNotify] = useState(1);
    const [postsPerPageNotify] = useState(4);
    const [totalNotify, setTotalNotify] = useState(0);
    const [notifications, setNotifications] = useState([]);

    const getAllNotifications= async () => {
        try {
            const response = await axios.get("http://localhost:5036/api/Notifications/GetUserNotifications", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    pageNumber: currentPageNotify,
                }
            });
            if (response.data && response.data.items) {
                setNotifications(response.data.items);
                console.log(notifications)
                setTotalNotify(response.data.totalCount);
            } else {
                console.log("No data received");
            }
        } catch (error) {
            console.log('Error getting all cargo', error);
        }
    }

    useEffect(() => {
            getAllNotifications();
    }, [currentPageNotify]);

    return (
        <>
            <br/>
            <div className="container content-with-filters">
                <div className="container notifications__container notifications__notifications-info-grid">
                    {notifications.length > 0 ? (
                        notifications.map((notify, index) => (notify.notifyType === 0 ? (
                                <CargoInfo key={index} cargo={notify.notification}/>
                            ) : (
                                <Car key={index} car={notify.notification}/>
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