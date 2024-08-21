import "../styles/css/Notifications.css";
import axios from "axios";
import React, {useEffect, useState, useCallback} from "react";
import Cookies from "universal-cookie";
import Pagination from "../components/pagination/Pagination";
import {ip} from "../env/env";
import NotifyCargo from "../components/notifyCargo/NotifyCargo";
import NotifyCar from "../components/notifyCar/NotifyCar";

const Notifications = () => {
    const token = new Cookies().get("jwt_authorization");
    const [currentPageNotify, setCurrentPageNotify] = useState(1);
    const [postsPerPageNotify] = useState(4);
    const [totalNotify, setTotalNotify] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllNotifications = useCallback(async () => {
        try {
            setLoading(true)
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
        } finally {
            setLoading(false);
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
                    { loading ? (
                        <p>Загрузка...</p>
                    ) : notifications.length > 0 ? (
                        notifications.map((notify, index) => (notify.car === null ? (
                                <NotifyCargo key={index} notify={notify}/>
                            ) : (
                                <NotifyCar key={index} notify={notify}/>
                            )
                        ))) : (
                        <p>Ничего не найдено</p>
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