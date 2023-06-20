import React, { useEffect, useState } from 'react'
import './Chats.css';
import Chat from "./Chat";
import { fetchUsers } from './card/fetchUsers';
import { fetchChats } from './card/fetchChats';

function Chats() {

    const [usersData, setusersData] = useState([]);

    const [chatsData, setchatsData] = useState([]);

    useEffect(() => {
        fetchUsers((data, error) => {
            if (data) {
                // Save the fetched users in the usersData state
                console.log("DATA Result USER: ", data);
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
    }, []);

    const currentUserChats = chatsData.filter(chat => {
        const senderID = parseInt(chat.uidsender);
        const receiverID = parseInt(chat.uidreceiver);
        const currentUserID = 7; // ID des aktuellen Benutzers

        return senderID === currentUserID || receiverID === currentUserID;
    });

    const userIDs = new Set();
    currentUserChats.forEach(chat => {
        const senderID = parseInt(chat.uidsender);
        const receiverID = parseInt(chat.uidreceiver);
        const currentUserID = 7; // ID des aktuellen Benutzers

        if (senderID !== currentUserID) {
            userIDs.add(senderID);
        }
        if (receiverID !== currentUserID) {
            userIDs.add(receiverID);
        }
    });

    const users = usersData.filter(user => userIDs.has(user.id));
    console.log("CurrentUSER: ", currentUserChats);


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