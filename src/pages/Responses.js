import "../styles/css/Responses.css"
import CargoInfo from "../components/cargo/Cargo";
import Cookies from "universal-cookie";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Car from "../components/car/Car";
import Pagination from "../components/Pagination/Pagination";

const Responses = () => {
    const token = new Cookies().get("jwt_authorization");
    const [currentPageResponses, setCurrentPageResponses] = useState(1);
    const [postsPerPageResponses] = useState(4);
    const [totalResponses, setTotalResponses] = useState(0);
    const [responses, setResponses] = useState([]);

    const getAllResponses = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:5036/api/Notifications/GetUserResponses", {
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
                                <CargoInfo key={index} cargo={response.cargo}/>
                            ) : (
                                <Car key={index} car={response.car}/>
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