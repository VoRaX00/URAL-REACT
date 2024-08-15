import React, { useState, useEffect, useRef } from 'react';
import './style.css';

const Message = ({ message, onReply, onEdit, onDelete }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef(null);

    const handleRightClick = (e) => {
        e.preventDefault();
        setMenuPosition({ x: e.clientX, y: e.clientY });
        setIsMenuVisible(true);
    };

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="message-container" onContextMenu={handleRightClick}>
            <p className="message-text">{message}</p>
            {isMenuVisible && (
                <ul
                    className="context-menu"
                    style={{ top: menuPosition.y, left: menuPosition.x }}
                    ref={menuRef}
                >
                    <li onClick={onReply}>Ответить</li>
                    <li onClick={onEdit}>Изменить</li>
                    <li onClick={onDelete}>Удалить</li>
                </ul>
            )}
        </div>
    );
};

export default Message;
