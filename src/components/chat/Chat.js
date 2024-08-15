import React, { useState } from 'react';
import Message from '../message/Message';
import './style.css';

const Chat = ({ chat }) => {
    const [messages, setMessages] = useState(chat.messages);

    const handleReply = (message) => {
        console.log("Ответить на сообщение:", message);
        // Логика для ответа на сообщение
    };

    const handleEdit = (index) => {
        const newMessage = prompt("Введите новое сообщение:", messages[index]);
        if (newMessage !== null) {
            const updatedMessages = [...messages];
            updatedMessages[index] = newMessage;
            setMessages(updatedMessages);
        }
    };

    const handleDelete = (index) => {
        const updatedMessages = messages.filter((_, i) => i !== index);
        setMessages(updatedMessages);
    };

    return (
        <div className="chat-container">
            <h2>{chat.name}</h2>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <Message
                        key={index}
                        message={message}
                        onReply={() => handleReply(message)}
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
