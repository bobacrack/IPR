import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from 'react-router-dom';
import { fetchChats } from './card/fetchChats';
import { fetchUsers } from './card/fetchUsers';
import "./ChatScreen.css";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import IconButton from "@material-ui/core/IconButton";



function ChatScreen() {
    const { receiverInfo } = useParams();
    const [input, setInput] = useState('');
    const [userID, setUserID] = useState(null);
    const [usersData, setusersData] = useState([]);
    const [chatsData, setchatsData] = useState([]);

    useEffect(() => {
        fetchUsers((data, error) => {
            if (data) {
                setusersData(data);
            } else {
                console.error(error);
            }
        });
        fetchChats((data, error) => {
            if (data) {
                setchatsData(data);
            } else {
                console.error(error);
            }
        });

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUserID(uid);
            } else {
            }
        });

        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        console.log(chatsData);
    }, [chatsData]);

    function findMatchingId(userID, usersData) {
        const matchingUser = usersData.find(user => user.uid === userID);
        return matchingUser ? matchingUser.id : null;
    }
    const matchingUserId = findMatchingId(userID, usersData);
    const matchingReceiverId = findMatchingId(receiverInfo, usersData);

    console.log("SENDERID: " + matchingUserId);
    console.log("ReceiverID: " + matchingReceiverId);

    const handleSend = async (e) => {
        const newMessage = {
            uidsender: matchingUserId,
            uidreceiver: matchingReceiverId,
            message: input
        };
        console.log("Message: " + newMessage);
        try {
            // POST-Anfrage an deine API-Endpunkt senden, um die Daten in der Datenbank zu speichern
            const response = await fetch("http://217.160.215.31:6969/api/v1/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newMessage)
            });


            if (response.ok) {
                console.log("Nachricht erfolgreich gesendet");
            } else {
                console.error("Fehler beim Senden der Nachricht:", response.status);
            }
        } catch (error) {
            console.error("Fehler beim Senden der Nachricht:", error);
            console.log("TESTTST: ", chatsData);
            console.log("NEWWW", newMessage);
        }
        setInput("");
    };

    function deleteChat(message) {
        const response = fetch("http://localhost:6969/api/v1/chat", {
            method: "DELETE",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(message)
        });
    }

    const date = new Date().toDateString()
    const currentUserChats = chatsData.filter(chat => {
        const senderID = parseInt(chat.uidsender);
        const receiverID = parseInt(chat.uidreceiver);
        const currentUserID = matchingUserId; // ID des aktuellen Benutzers

        return senderID === currentUserID && receiverID === matchingReceiverId || senderID === matchingReceiverId && receiverID === currentUserID;
    });
    const receiverUser = usersData.find(user => user.id === matchingReceiverId);
    const receiverName = receiverUser ? `${receiverUser.firstname} ${receiverUser.lastname}` : "";
    //<p className="chatScreen__timestamp">YOU MATCHED WITH ELLEN ON {date}</p>

    console.log(currentUserChats)

    return (
        <div className="chatScreen">
            <p className="chatScreen__timestamp">YOU MATCHED WITH {receiverName} ON {date}</p>
            {currentUserChats.map((message, index) => (

                (message.uidsender === matchingUserId && message.uidreceiver === matchingReceiverId) ? (

                    <div key={index} className="chatScreen__message">
                        <p className="chatScreen__textUser">{message.message}</p>
                        <IconButton onClick={() => deleteChat(message)} data-testid="swipe-button-lightning" size='small'>
                            <FlashOnIcon fontSize="small" />
                        </IconButton>

                    </div>
                ) : (message.uidsender !== matchingUserId && message.uidsender === matchingReceiverId) ? (
                    <div key={index} className="chatScreen__message">
                        <Avatar className="chatScreen__image" alt={String(message.uidreceiver)} src={usersData.find(user => user.id === matchingReceiverId)?.picture} />
                        <p className="chatScreen__text">{message.message}</p>
                    </div>
                ) : null

            ))}

            <form className="chatScreen__input">
                <input data-testid="inputText" value={input} onChange={e => setInput(e.target.value)} className="chatScreen__inputField" placeholder="Type a message..." type="text" />
                <button data-testid="sendButton" onClick={handleSend} type="submit" className="chatScreen__inputButton">SEND</button>
            </form>
        </div>
    );
}

export default ChatScreen;