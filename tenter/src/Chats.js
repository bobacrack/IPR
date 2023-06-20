import React, { useEffect, useState } from 'react'
import './Chats.css';
import Chat from "./Chat";
import { fetchUsers } from './card/fetchUsers';

function Chats() {

    const [usersData, setusersData] = useState([]);

    useEffect(() => {
        fetchUsers((data, error) => {
            if (data) {
                // Save the fetched users in the usersData state
                //console.log("DATA Result: ", data);
                setusersData(data);
                //console.log(usersData);
            } else {
                console.error(error);
            }
        });
    }, []);
    return (
        <div className="chats">
            {usersData.map((user, index) => (
                <Chat
                    key={user.id}
                    name={user.firstname + " " + user.lastname}
                    receiverInfo={user.uid}
                    message="Yo whats up!"
                    timestamp="40 seconds ago"
                    profilePic={user.picture}
                />
            ))}
        </div>



    );
}

export default Chats