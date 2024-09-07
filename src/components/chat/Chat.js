import React, { useState, useEffect } from 'react';
import Message from '../message/Message';
import './style.css';
import {jwtDecode} from "jwt-decode";

const getUserName = async (token) => {
    return jwtDecode(token).UserName;
}

const getUserId = async (token) => {
    return jwtDecode(token).Id;
}

const Chat = ({ chat, connection, token, messages, setMessages }) => {
    const [newMessage, setNewMessage] = useState(""); // Состояние для отслеживания ввода нового сообщения
    const [userId, setUserId] = useState(null); // Состояние для хранения userId

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserId(token);
            setUserId(id);
        };
        fetchUserId();
    }, [token]);

    useEffect(() => {
        if (connection) {
            connection.on("ReceiveMessage", (userName, message) => {
                setMessages(prevMessages => [...prevMessages, message]);
            });

            return () => {
                connection.off("ReceiveMessage");
            };
        }
    }, [connection, setMessages]);

    const handleReply = (message) => {

    };

    const handleEdit = (index) => {
        const newMessage = prompt("Введите новое сообщение:", messages[index]?.text);
        if (newMessage !== null) {
            const updatedMessages = [...messages];
            updatedMessages[index] = { ...updatedMessages[index], text: newMessage };
            setMessages(updatedMessages);
        }
    };

    const handleDelete = (index) => {
        const updatedMessages = messages.filter((_, i) => i !== index);
        setMessages(updatedMessages);
    };

    if (!chat) {
        return <div>Чат не выбран</div>;
    }

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return;

        const messageToSend = {
            userId: userId,
            chatId: chat.id,
            content: newMessage
        };

        try {
            const name = await getUserName(token);
            const requestData = {
                UserName: name,
                Message: messageToSend
            };
            await connection.invoke("SendMessage", requestData);
            setNewMessage("");
        } catch (error) {
            console.error("Ошибка при отправке сообщения:", error);
        }
    };


    if (!userId) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="chat-container">
            <h2>{chat.name}</h2>
            {connection ? (
                <>
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <Message
                                key={index}
                                message={message}
                                currentUserId={userId}
                                onReply={() => handleReply(message.text)}
                                onEdit={() => handleEdit(index)}
                                onDelete={() => handleDelete(index)}
                            />
                        ))}
                    </div>
                    <div className="chat-input-container">
                        <button className="attach-button">
                            📎
                        </button>
                        <input
                            type="text"
                            className="chat-input"
                            value={newMessage}
                            onChange={handleInputChange}
                            placeholder="Введите сообщение..."
                        />
                        <button className="send-button" onClick={handleSendMessage}>
                            ➤
                        </button>
                    </div>
                </>
            ) : (
                <p>Соединение не установлено</p>
            )}
        </div>
    );
};

export default Chat;
