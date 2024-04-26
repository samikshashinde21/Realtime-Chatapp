import React from "react"
import styled from "styled-components"
import Logout from "./Logout"
import ChatInput from "./ChatInput"


export default function ChatContainer({ currentChat }) {

  const handleSendMsg = async (msg) => {

  }
  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages"></div>
          <ChatInput handleSendMsg = {handleSendMsg}/>
        </Container>
      )}
    </>
  )
}

const Container = styled.div``
