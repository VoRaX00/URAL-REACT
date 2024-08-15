import React, { useState } from 'react';
import './style.css';

const Chat = ({ chat }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim()) {
            // Здесь можно добавить логику для отправки сообщения
            console.log("Отправлено сообщение:", message);
            setMessage(''); // Очищаем поле после отправки
        }
    };

    const handleAttachFile = () => {
        // Логика для прикрепления файла
        console.log("Файл прикреплен");
    };

    return (
        <div className="chat-container">
            <h2>{chat.name}</h2>
            <div className="chat-messages">
                {chat.messages.map((message, index) => (
                    <p key={index} className="chat-message">{message}</p>
                ))}
            </div>
            <div className="chat-input-container">
                <button className="attach-button" onClick={handleAttachFile}>
                    📎
                </button>
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Введите сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="send-button" onClick={handleSendMessage}>
                    ➤
                </button>
            </div>
        </div>
    );
};

export default Chat;
