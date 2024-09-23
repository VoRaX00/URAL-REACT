import React, {useState, useEffect, useCallback} from 'react';
import Chat from "../components/chat/Chat";
import "../styles/css/Messenger.css";
import ListChats from "../components/listChats/ListChats";
import Cookies from "universal-cookie";
import axios from "axios";
import {ip} from "../env/env";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {jwtDecode} from "jwt-decode";

const Messenger = () => {
    const token = new Cookies().get("jwt_authorization");
    const [listChats, setListChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [connection, setConnection] = useState(null)

    const getChats = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://${ip}/api/Chat/GetImages`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.data) {
                setListChats(response.data);
            } else {
                console.log("No data received");
            }

        } catch (error) {
            console.log("Error getting chats", error);
        } finally {
            setLoading(false);
        }
    }, [token]);


    const [selectedChat, setSelectedChat] = useState(null);

    const joinChat = useCallback(async (chatId) => {
        let connection = new HubConnectionBuilder()
            .withUrl(`http://${ip}/chat`)
            .withAutomaticReconnect()
            .build();

        try {
            const user = jwtDecode(token);
            await connection.start();
            console.log("WebSocket connection established.");
            await connection.invoke("JoinChat", { chatId: chatId, userId: user.Id, userName: user.UserName });
            setConnection(connection);
        } catch (error) {
            console.error("Error joining chat", error);
        }
    }, [token, ip]);

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        joinChat(chat.id);
    };

    useEffect(() => {
        const fetchDataAndSetSelectedChat = async () => {
            await getChats();
        };
        fetchDataAndSetSelectedChat();
    }, [getChats]);

    return (
        <div className="container messenger-chat-container">
            {loading ? (
                <p>Загрузка...</p>
            ) : listChats.length > 0 ? ( // Изменено условие
                <>
                    <div className="messenger-chat-list-container">
                        <ListChats chats={listChats}  handleSelectChat={handleSelectChat}/>
                    </div>
                    <div className="messenger-chat-container">
                        {selectedChat ? (
                            <Chat key={selectedChat.id} chat={selectedChat} connection={connection} token={token}/>
                        ) : (
                            <div>Выберите чат</div>
                        )}
                    </div>
                </>
            ) : (
                <p>Ничего не найдено</p>
            )}
        </div>
    );
}

export default Messenger;