import React, { useState, useCallback, useMemo } from 'react';
import { Dropdown, Menu } from "antd";
import './style.css';

const Message = ({ message, sender, time, read, onReply, onEdit, onDelete, isSent, onNameClick }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const [value, setValue] = useState();

    const onClick = useCallback(
        ({ key }) => {
            setMenuVisible(false);
            switch (key) {
                case "1":
                    onReply(value);
                    break;
                case "2":
                    onEdit(value);
                    break;
                case "3":
                    onDelete(value);
                    break;
                default:
                    break;
            }
        },
        [value, onReply, onEdit, onDelete]
    );

    const menu = useMemo(() => (
        <Menu onClick={onClick} items={[
            {
                key: "1",
                label: "Ответить"
            },
            {
                key: "2",
                label: "Изменить"
            },
            {
                key: "3",
                label: "Удалить"
            }
        ]} />
    ), [onClick]);

    const handleContextMenu = (event) => {
        event.preventDefault();
        const { clientX, clientY, target } = event;
        setPosX(clientX);
        setPosY(clientY);
        setValue(target.innerHTML);
        setMenuVisible(true);
    };

    return (
        <Dropdown
            menu={menu}
            open={menuVisible}
            trigger={["contextMenu"]}
            onOpenChange={setMenuVisible}
            overlayStyle={{ position: 'absolute', top: posY, left: posX }}
        >
            <div
                className={`message-container ${isSent ? 'sent' : ''}`}
                onContextMenu={handleContextMenu}
            >
                <div className="message-bubble">
                    <div className="sender-name" onClick={() => onNameClick(sender)}>
                        {isSent ? 'You' : sender}
                    </div>
                    <div className="message-text">
                        {message.text}
                    </div>
                </div>
                <div className="message-time">
                    {time}
                    {read && <span className="checkmark">✓✓</span>}
                </div>
            </div>
        </Dropdown>
    );
};

export default Message;
