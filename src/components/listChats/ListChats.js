import React from 'react';
import userImg from "../../img/default.png";
import './style.css';

const ListChats = ({ chats, handleSelectChat }) => {
    return (
        <div className="chat-list">
            {chats.map((chat) => (
                <div key={chat.id} className="chat-item" onClick={() => handleSelectChat(chat)}>
                    <img src={userImg} alt={`${chat.name} avatar`} className="chat-avatar" />
                    <div className="chat-info">
                        <h3 className="chat-name">{chat.name}</h3>
                        <p className="chat-last-message">{chat.LastMessage}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ListChats;
