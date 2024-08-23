import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const ListChats = ({ chats, joinChat }) => {
    const onSubmit = (e, chatId) => {
        e.preventDefault();
        joinChat(chatId, chatId);
    }

    useEffect(() => {
        console.log(chats)
    })

    return (
        <div className="chat-list">
            {chats.map((chat) => (
                <form onSubmit={ e => onSubmit(e, chat.id)} key={chat.id}>
                    <Link to={`/chats?chatId=${chat.id}`} key={chat.id} className="chat-item">
                        <img src={chat.avatar} alt={`${chat.name} avatar`} className="chat-avatar" />
                        <div className="chat-info">
                            <h3 className="chat-name">{chat.name}</h3>
                            <p className="chat-last-message">{chat.lastMessage}</p>
                        </div>
                    </Link>
                </form>
            ))}
        </div>
    );
};

export default ListChats;
