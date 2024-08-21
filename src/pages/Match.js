import "../styles/css/Match.css"
import CargoInfo from "../components/cargo/Cargo";
import Cookies from "universal-cookie";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Car from "../components/car/Car";
import Pagination from "../components/pagination/Pagination";
import {ip} from "../env/env";

const Match = () => {
    const token = new Cookies().get("jwt_authorization");
    const [currentPageMatch, setCurrentPageMatch] = useState(1);
    const [postsPerPageMatch] = useState(4);
    const [totalMatch, setTotalMatch] = useState(0);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllMatches = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://${ip}/api/Notifications/GetUserMatch`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    pageNumber: currentPageMatch,
                }
            });
            if (response.data && response.data.items.length > 0) {
                setMatches(response.data.items);
                console.log(matches)
                setTotalMatch(response.data.totalCount);
            } else {
                console.log("No data received");
            }
        } catch (error) {
            console.log('Error getting all cargo', error);
        } finally {
            setLoading(false);
        }
    }, [currentPageMatch, matches, token]);

    useEffect(() => {
        getAllMatches();
    }, [currentPageMatch, getAllMatches]);

    return(
        <>
            <br/>
            <div className="container content-with-filters">
                <div className="container match__container match__match-info-grid">
                    { loading ? (
                        <p>Загрузка...</p>
                    ) : matches.length > 0 ? (
                        matches.map((match, index) => (match.notifyType === 0 ? (
                                <CargoInfo key={index} cargo={match.notification}/>
                            ) : (
                                <Car key={index} car={match.notification}/>
                            )
                        ))) : (
                        <p>Ничего не найдено</p>
                    )}
                </div>
                <Pagination
                    totalPosts={totalMatch}
                    postsPerPage={postsPerPageMatch}
                    setCurrentPage={setCurrentPageMatch}
                    currentPage={currentPageMatch}
                />
                <br/>
            </div>
        </>
    )
}

export default Match;