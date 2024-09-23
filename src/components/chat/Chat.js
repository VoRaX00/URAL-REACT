import React, { useState, useEffect } from 'react';
import Message from '../message/Message';
import './style.css';
import {jwtDecode} from "jwt-decode";

const getUserName = async (token) => {
    return jwtDecode(token).UserName
}

const getUserId = async (token) => {
    return jwtDecode(token).Id
}

const Chat = ({ chat, connection, token}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (connection) {
            console.log("connection:", connection);
            connection.on("ReceiveMessage", (userName, message) => {
                setMessages(prevMessages => [...prevMessages, message]);
            });

            connection.on("ReceiveMessages", (userName, loadedMessages) => {
                console.log("LoadMessages:", loadedMessages);
                setMessages(loadedMessages);
            });
            console.log("Messages: ", messages);
        }

        return () => {
            if (connection) {
                connection.off("ReceiveMessage");
                connection.off("ReceiveMessages");
            }
        };
    }, [connection]);

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

    // Логика для удаления сообщения
    const handleDelete = (index) => {
        const updatedMessages = messages.filter((_, i) => i !== index);
        setMessages(updatedMessages);
    };

    if (!chat) {
        return <div>Чат не выбран</div>;
    }

    // Обработка ввода текста
    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };

    // Отправка сообщения
    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return;
        console.log(chat)
        const userId = await getUserId(token);
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
            }
            await connection.invoke("SendMessage", requestData);
            setNewMessage("");
        } catch (error) {
            console.error("Ошибка при отправке сообщения:", error);
        }
    };

    if (!chat) {
        return <div>Чат не выбран</div>;
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
                                message={message} // Передаем объект сообщения целиком
                                sender={message.sender}
                                onReply={() => handleReply(message.text)}
                                onEdit={() => handleEdit(index)}
                                onDelete={() => handleDelete(index)}
                                isSent={message.sender === 'Me'}
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
                            onChange={handleInputChange} // Обработчик изменения поля ввода
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