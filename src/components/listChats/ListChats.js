import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const ListChats = ({ chats }) => {
    return (
        <div className="chat-list">
            {chats.map((chat) => (
                <Link to={`/chats?chatId=${chat.id}`} key={chat.id} className="chat-item">
                    <img src={chat.avatar} alt={`${chat.name} avatar`} className="chat-avatar" />
                    <div className="chat-info">
                        <h3 className="chat-name">{chat.name}</h3>
                        <p className="chat-last-message">{chat.lastMessage}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ListChats;
