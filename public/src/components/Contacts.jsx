import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import Logo from '../assets/logo.svg'
import './cssComponents/Contacts.css'

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  //If the user is logged in show the user name and avatar in the contacts
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {
        currentUserImage && currentUserName && (
          <div className='ContactsList'>
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h3>RChat</h3>
            </div>
            <div className="contacts">
              {
                contacts.map((contact, index) => {
                  return (
                    <div
                      className={`contact ${index === currentSelected ? "selected" : ""
                        }`}
                      key={contact._id}
                      onClick={() => changeCurrentChat(index, contact)}>
                      <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                      </div>
                      <div className="username">
                        <h3>{contact.username}</h3>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="current-user">
              <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
              </div>
              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}


