import React from "react"
import styled from "styled-components"
import Yo from "../assets/yo.gif"

export default function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={Yo} alt="Yo" />
      <h1>
        Yo, <span>{currentUser.username}</span> !
      </h1>
      <h3>Select the chat and start texting.</h3>
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img {
        height: 10rem;
    }
    span {
        color: #4e00ff;
    }
`;
