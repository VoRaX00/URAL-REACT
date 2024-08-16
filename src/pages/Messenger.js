import React, { useState, useEffect } from 'react';
import Chat from "../components/chat/Chat";
import "../styles/css/Messenger.css";
import ListChats from "../components/listChats/ListChats";
import { useLocation } from 'react-router-dom';

const Messenger = () => {
    const chats = [
        { id: 1, name: 'Chat 1', lastMessage: 'How are you?', messages: [{text: 'Hello', sender: 'Name_sender'}, {text:'How are you?', sender: 'Me'}], avatar: 'https://via.placeholder.com/50' },
        { id: 2, name: 'Chat 2', lastMessage: 'What’s up?', messages: [{text: 'Hi!', sender: 'Name_sender'}, {text: 'What’s up?', sender: 'Name_sender'}], avatar: 'https://via.placeholder.com/50' },
        { id: 3, name: 'Chat 3', lastMessage: 'Good morning!', messages: [{text: 'Hey!', sender: 'Name_sender'}, {text: 'Good morning!', sender: "Name_sender"}], avatar: 'https://via.placeholder.com/50' },
    ];

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const chatId = parseInt(searchParams.get('chatId'));

    const [selectedChat, setSelectedChat] = useState(chats.find(chat => chat.id === chatId));

    useEffect(() => {
        setSelectedChat(chats.find(chat => chat.id === chatId));
    }, [chatId, chats]);

    return (
        <div className="container content-with-filters">
            <div className="chat-list-container">
                <ListChats chats={chats} />
            </div>
            <div className="chat-container">
                {selectedChat ? <Chat key={selectedChat.id} chat={selectedChat} /> : <div>Select a chat</div>}
            </div>
        </div>
    );
}

export default Messenger;
