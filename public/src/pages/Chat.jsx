import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { allUsersRoute, host } from "../utils/APIRoutes"
import Contacts from "../components/Contacts"
import Welcome from "../components/Welcome"
import ChatContainer from "../components/ChatContainer"
import { io } from "socket.io-client"

function Chat() {
  const socket = useRef()

  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  //call once when the component is created
  //useEffect is executed sequentially
  //current user
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const [isLoaded, setIsLoaded] = useState(false)

  /* useEffect(async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/")
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
    }
  }, [])

  //call this after current user is loaded
  useEffect(async () => {
    if (currentUser) {
      //if there is current user, we want to call api
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
        setContacts(data.data)
      } else {
        navigate("/setAvatar")
      }
    }
  }, [currentUser]) */
  //this above useEffect - it will check if the current user is present and if yes then checks if it has avatar set and if hasn't set, navigate to setAvatar

  // Define your async functions outside of the useEffect hook
  const checkLocalStorage = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login")
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
      setIsLoaded(true)
    }
  }

  const fetchContacts = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`)
        setContacts(data)
      } else {
        navigate("/setAvatar")
      }
    }
  }

  // Call these async functions immediately inside the useEffect hook
  useEffect(() => {
    // Define an async function inside the useEffect hook and call it immediately
    const fetchData = async () => {
      await checkLocalStorage()
    }
    fetchData()
  }, [])

  useEffect(() => {
    // Define an async function inside the useEffect hook and call it immediately
    const fetchContactsData = async () => {
      await fetchContacts()
    }
    fetchContactsData()
  }, [currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  //as soon as we have current user, we will use useEffect
  //as soon as curr user is changed,this will run

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host)
      //whenever curr user is logged in, we will pass this curr user id and add it to global map that we've set up in the backend

      socket.current.emit("add-user", currentUser._id)
    }
  }, [currentUser])

  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`

export default Chat

//establish socket conn for all users who have logged in
