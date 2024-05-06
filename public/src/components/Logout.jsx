import axios from "axios"
import React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { BiPowerOff } from "react-icons/bi"

export default function Logout() {
  const navigate = useNavigate()
  const handleClick = async () => {
    localStorage.clear()
    navigate("/login")
  }
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #fdde55;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #5ab2ff;
  }
`
