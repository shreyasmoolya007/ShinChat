import React,{ useState } from "react"
import styled from "styled-components"
import Picker from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"

export default function ChatInput({handleSendMsg}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [msg, setMsg] = useState("")

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };
  
  const sendChat = (event) => {
    event.preventDefault();
    if(msg.length>0) {
        handleSendMsg(msg);
        setMsg("")
    }
  }

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPickerhideShow}/>
            {showEmojiPicker && <Picker width="200" onEmojiClick={handleEmojiClick}/>}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input type="text" placeholder="type your message here" onChange={(e) => setMsg(e.target.value)} value={msg}/>
        <button className="submit">
            <IoMdSend />
        </button>
      </form>
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #080420;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0 1rem;
        gap: 1rem;
    }
    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji {
            position: relative;
            svg {
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .epr-main {
                position: absolute;
                top: -460px;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9a86f3;

                .epr_-8623pq {
                background-color: transparent;
                border-color: #9186f3;
                }

                .epr_-99lr9q {
                background-color: transparent;
                color: white;
                }
            }
        }

    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: #ffffff34;
        input {
            width: 90%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1rem;
            &::selection {
                background-color: #9a86f3;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #005792;
            border: none;
            @media screen and (min-width: 720px) and (max-width: 1080px) {
                padding: 0.3rem 1rem;
                svg {
                    font-size: 1rem;
                }
            }
            svg {
                font-size: 1.5rem;
                color: white;
            }
        }
    }
    @media screen and (min-width:480px) and (max-width:720px) {
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .button-container {
            margin-right: 10px;
        }
        .input-container {
            button {
                padding: 0.15rem 1rem;
            }
        }
    }
`;

