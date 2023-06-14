import React, { useEffect, useState } from 'react'
import './Chats.css';
import Chat from "./Chat";
import { database } from './firebase';
import { collection, getDocs } from "firebase/firestore";

function Chats() {

    const [tents, setTents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(database, "tents"));
            const tentData = querySnapshot.docs.map((doc) => doc.data());
            setTents(tentData);
        };

        fetchData();

    }, []);
    return (
        <div className="chats">
            {tents.map((tent, index) => (
                <Chat
                    key={index}
                    name={tent.name}
                    message="Yo whats up!"
                    timestamp="40 seconds ago"
                    profilePic={tent.url}
                />
            ))}
        </div>



    );
}

export default Chats