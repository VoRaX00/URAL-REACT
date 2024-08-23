import React, {useState, useEffect, useCallback} from 'react';
import Chat from "../components/chat/Chat";
import "../styles/css/Messenger.css";
import ListChats from "../components/listChats/ListChats";
import { useLocation } from 'react-router-dom';
import Cookies from "universal-cookie";
import axios from "axios";
import {ip} from "../env/env";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {jwtDecode} from "jwt-decode";

const Messenger = () => {
    // const chats = [
    //     { id: 1, name: 'Chat 1', lastMessage: 'How are you?', messages: [{ text: 'Hello', sender: 'Name_sender' }, { text: 'How are you?', sender: 'Me' }], avatar: 'https://via.placeholder.com/50' },
    //     { id: 2, name: 'Chat 2', lastMessage: 'What’s up?', messages: [{ text: 'Hi!', sender: 'Name_sender' }, { text: 'What’s up?', sender: 'Name_sender' }], avatar: 'https://via.placeholder.com/50' },
    //     { id: 3, name: 'Chat 3', lastMessage: 'Good morning!', messages: [{ text: 'Hey!', sender: 'Name_sender' }, { text: 'Good morning!', sender: "Name_sender" }], avatar: 'https://via.placeholder.com/50' },
    // ];

    const token = new Cookies().get("jwt_authorization");
    const [listChats, setListChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [connection, setConnection] = useState(null)

    const getChats = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://${ip}/api/Chat/Get`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.data) {
                setListChats(response.data);
                console.log("Chats received:", response.data);
            } else {
                console.log("No data received");
            }

        } catch (error) {
            console.log("Error getting chats", error);
        } finally {
            setLoading(false);
        }
    }, [token]); // Убираем listChats из зависимостей


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const chatId = parseInt(searchParams.get('chatId'));

    const [selected, setSelected] = useState(null);

    const joinChat = useCallback(async (chatId) => {
        let connection = new HubConnectionBuilder()
            .withUrl(`http://${ip}/chat`)
            .withAutomaticReconnect()
            .build();

        try {
            const user = jwtDecode(token);
            await connection.start();
            await connection.invoke("JoinChat", { chatId: chatId, userId: user.Id, userName: user.UserName });

            setConnection(connection)
        } catch (error) {
            console.log("Error getting chats", error);
        }
    }, [token]);

    useEffect(() => {
        const fetchDataAndSetSelectedChat = async () => {
            await getChats();
        };
        fetchDataAndSetSelectedChat();
    }, [getChats]);

    return (
        <div className="container content-with-filters chat-container">
            {loading ? (
                <p>Загрузка...</p>
            ) : listChats.length > 0 ? ( // Изменено условие
                <>
                    <div className="chat-list-container">
                        <ListChats chats={listChats} joinChat={joinChat}/>
                    </div>
                    <div className="chat-container">
                        {selected ? (
                            <Chat key={selected.id} chat={selected}/>
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

