import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import "./ChatScreen.css";
import { database, auth } from './firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from 'react-router-dom';
import { fetchChats } from './card/fetchChats';
import { fetchUsers } from './card/fetchUsers';




function ChatScreen() {
    const { receiverInfo } = useParams();
    const [input, setInput] = useState('');
    // const [messages, setMessages] = useState([]);
    const [userID, setUserID] = useState(null);


    const [usersData, setusersData] = useState([]);

    const [chatsData, setchatsData] = useState([]);
    //const uidOfCurrentUser = auth.currentUser.uid;
    console.log("Input" + input);
    // console.log("Message: ", messages)

    useEffect(() => {
        fetchUsers((data, error) => {
            if (data) {
                // Save the fetched users in the usersData state
                //console.log("DATA Result USER: ", data);
                setusersData(data);
                //console.log(usersData);
            } else {
                console.error(error);
            }
        });
        fetchChats((data, error) => {
            if (data) {
                // Save the fetched users in the usersData state
                console.log("DATA Result: ", data);
                setchatsData(data);
                //console.log(usersData);
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
            const response = await fetch("http://localhost:6969/api/v1/chat", {
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

        //setchatsData([...chatsData, newMessage]);
        setInput("");
    };

    const date = new Date().toDateString()
    console.log("MESSSAGESS: ", chatsData);



    return (
        <div className="chatScreen">
            <p className="chatScreen__timestamp">YOU MATCHED WITH ELLEN ON {date}</p>
            {chatsData.map((message, index) => (

                (message.uidsender === matchingUserId && message.uidreceiver === matchingReceiverId) ? (

                    <div key={index} className="chatScreen__message">
                        <p className="chatScreen__textUser">{message.message}</p>
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