import React from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

const Chat = ({ chats }) => {
    const { chatId } = useParams();
    const chat = chats.find(c => c.id === parseInt(chatId));

    if (!chat) {
        return <div className="chat-container">Chat not found</div>;
    }

    return (
        <div className="chat-container">
            <h2>{chat.name}</h2>
            <div className="chat-messages">
                {chat.messages.map((message, index) => (
                    <p key={index} className="chat-message">{message}</p>
                ))}
            </div>
        </div>
    );
};

export default Chat;
