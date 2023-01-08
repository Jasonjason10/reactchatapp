import React, { useState } from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'
import './cssComponents/ChatInput.css'

export default function ChatInput({ handleSendMsg }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (e, emoji) => {
        let message = msg;
        message += emoji.emoji;
        setMsg(message);
    }

    const sendChat = (e) => {
        e.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg('');
        }
    }
    return (
        <div className='Chat-input'>
            <div className="button-container">
                <div className="emoji" >
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form className='input-container' onSubmit={(e) => sendChat(e)}>
                <input type="text" placeholder='Type your message here!' value={msg} onChange={(e) => { setMsg(e.target.value) }} />
                <button className="submit">
                    <IoMdSend />
                </button>
            </form>
        </div>
    )
}

