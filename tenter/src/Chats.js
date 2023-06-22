import React, { useEffect, useState } from 'react'
import './Chats.css';
import Chat from "./Chat";
import { fetchUsers } from './card/fetchUsers';
import { fetchChats } from './card/fetchChats';
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function Chats() {

    const [usersData, setusersData] = useState([]);
    const [chatsData, setchatsData] = useState([]);
    const [userID, setUserID] = useState(null);


    useEffect(() => {
        fetchUsers((data, error) => {
            if (data) {
                // Save the fetched users in the usersData state
                setusersData(data);
                //console.log(usersData);
            } else {
                console.error(error);
            }
        });
        fetchChats((data, error) => {
            if (data) {
                // Save the fetched users in the usersData state
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


    const currentUserChats = chatsData.filter(chat => {
        const senderID = parseInt(chat.uidsender);
        const receiverID = parseInt(chat.uidreceiver);
        const currentUserID = matchingUserId; // ID des aktuellen Benutzers

        return senderID === currentUserID || receiverID === currentUserID;
    });

    console.log(currentUserChats); // Check the filtered chat objects

    const userIDs = new Set();
    currentUserChats.forEach(chat => {
        const senderID = parseInt(chat.uidsender);
        const receiverID = parseInt(chat.uidreceiver);
        const currentUserID = matchingUserId; // ID des aktuellen Benutzers

        if (senderID !== currentUserID) {
            userIDs.add(senderID);
        }
        if (receiverID !== currentUserID) {
            userIDs.add(receiverID);
        }
        if (senderID === currentUserID) {
            userIDs.add(senderID);
        }
    });

    console.log(chatsData); // Check the original chatsData array

    const users = usersData.filter(user => userIDs.has(user.id));
    console.log("CurrentUSER: ", users);


    return (
        <div className="chats">
            {users.map((user, index) => {
                // Finde die neueste Nachricht für den aktuellen Benutzer
                const userChats = currentUserChats.filter(chat =>
                    chat.uidsender === user.id || chat.uidreceiver === user.id
                );
                const latestChat = userChats[userChats.length - 1];

                return (
                    <Chat
                        key={user.id}
                        name={user.firstname + " " + user.lastname}
                        receiverInfo={user.uid}
                        message={latestChat.message}
                        timestamp={latestChat.timestamp}
                        profilePic={user.picture}
                    />
                );
            })}
        </div>
    );
}

export default Chats