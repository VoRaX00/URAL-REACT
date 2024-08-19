import "../styles/css/Responses.css"
import Cookies from "universal-cookie";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../components/pagination/Pagination";
import {ip} from "../env/env";
import ResponseCargo from "../components/responseCargo/ResponseCargo";
import ResponseCar from "../components/responseCar/ResponseCar";

const Responses = () => {
    const token = new Cookies().get("jwt_authorization");
    const [currentPageResponses, setCurrentPageResponses] = useState(1);
    const [postsPerPageResponses] = useState(4);
    const [totalResponses, setTotalResponses] = useState(0);
    const [responses, setResponses] = useState([]);

    const getAllResponses = useCallback(async () => {
        try {
            const response = await axios.get(`http://${ip}/api/Notifications/GetUserResponses`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    pageNumber: currentPageResponses,
                }
            });
            if (response.data && response.data.items.length > 0) {
                setResponses(response.data.items);
                setTotalResponses(response.data.totalCount);
            } else{
                console.log("No data received");
            }
        } catch (error) {
            console.log('Error getting all cargo', error);
        }
    }, [token, currentPageResponses]);

    useEffect(() => {
        getAllResponses();
    }, [currentPageResponses, getAllResponses]);

    return (
        <>
            <br/>
            <div className="container content-with-filters">
                <div className="container responses__container responses__responses-info-grid">
                    {responses.length > 0 ? (
                        responses.map((response, index) => (response.car === null ? (
                                <ResponseCargo key={index} response={response}/>
                            ) : (
                                <ResponseCar key={index} response={response}/>
                            )
                        ))) : (
                        <p>Загрузка...</p>
                    )}
                </div>
                <Pagination
                    totalPosts={totalResponses}
                    postsPerPage={postsPerPageResponses}
                    setCurrentPage={setCurrentPageResponses}
                    currentPage={currentPageResponses}
                />
                <br/>
            </div>
        </>
    )
}

export default Responses;