import React, { useState, useEffect } from 'react';
import Message from '../message/Message';
import './style.css';

const Chat = ({ chat }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (chat && chat.messages) {
            setMessages(chat.messages);
        } else {
            setMessages([]); // Если сообщений нет, устанавливаем пустой массив
        }
    }, [chat]);

    // Логика для ответа на сообщение
    const handleReply = (message) => {
        console.log("Ответить на сообщение:", message);
    };

    // Логика для редактирования сообщения
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

    return (
        <div className="chat-container">
            <h2>{chat.name}</h2>
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
                    placeholder="Введите сообщение..."
                />
                <button className="send-button">
                    ➤
                </button>
            </div>
        </div>
    );
};

export default Chat;
