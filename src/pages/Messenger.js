import React from 'react';
import { BrowserRouter as Route, Routes } from 'react-router-dom';
import Chat from "../components/chat/Chat";
import "../styles/css/Messenger.css"
import ListChats from "../components/listChats/ListChats";

const Messenger = () => {
    const chats = [
    { id: 1, name: 'Chat 1', lastMessage: 'Hello', messages: ['Hello', 'How are you?'], avatar: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Chat 2', lastMessage: 'What’s up?', messages: ['Hi!', 'What’s up?'], avatar: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Chat 3', lastMessage: 'Good morning!', messages: ['Hey!', 'Good morning!'], avatar: 'https://via.placeholder.com/50' },
  ];

    return (
        <>
            <div className="container content-with-filters">
                <div className="chat-list-container">
                    <ListChats chats={chats}/>
                </div>
                <div className="chat-container">
                    <Routes>
                        <Route path="/chats/:chatId" element={<Chat chats={chats}/>}/>
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Messenger;