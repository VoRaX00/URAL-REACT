import React from 'react';
import Chat from "../components/chat/Chat";
import "../styles/css/Messenger.css";
import ListChats from "../components/listChats/ListChats";
import { useLocation } from 'react-router-dom';

const Messenger = () => {
    const chats = [
        { id: 1, name: 'Chat 1', lastMessage: 'Hello', messages: ['Hello', 'How are you?'], avatar: 'https://via.placeholder.com/50' },
        { id: 2, name: 'Chat 2', lastMessage: 'What’s up?', messages: ['Hi!', 'What’s up?'], avatar: 'https://via.placeholder.com/50' },
        { id: 3, name: 'Chat 3', lastMessage: 'Good morning!', messages: ['Hey!', 'Good morning!'], avatar: 'https://via.placeholder.com/50' },
    ];

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const chatId = parseInt(searchParams.get('chatId'));

    const selectedChat = chats.find(chat => chat.id === chatId);

    return (
        <div className="container content-with-filters">
            <div className="chat-list-container">
                <ListChats chats={chats}/>
            </div>
            <div className="chat-container">
                {selectedChat ? <Chat chat={selectedChat} /> : <div>Select a chat</div>}
            </div>
        </div>
    );
}

export default Messenger;
