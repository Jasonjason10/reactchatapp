import React from 'react'
import styled from 'styled-components'
import Robot from "../assets/robot.gif"
import './cssComponents/Welcome.css'

export default function Welcome({currentUser}) {
  return (
    <div className='Welcomes'>
        <img src={Robot} alt="welcome" />
        <h1>
            Welcome, <span>{currentUser.username}!</span>
        </h1>
        <h3>Please select a chat to start Messaging.</h3>
    </div>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
img{
    height: 20rem;
}
span{
    color: #4e00ff;
    text-transform: capitalize;
}
`;