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
            {tents.map((tent) => (
                <Chat
                    name={tent.name}
                    message="Yo whats up!"
                    timestamp="40 seconds ago"
                    profilePic={tent.url}
                />
            ))}
        </div>

        /*
         <Chat
                name="Ellen"
                message="Hey how are you?"
                timestamp="40 seconds ago"
                profilePic="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.tQwA5wiyQ53pvk1xfX-lOgHaE2%26pid%3DApi&f=1&ipt=14fc5e4cfa2d953dafde1ea25e6994b45bec83615695f982333e783a46d64a25&ipo=images"
            />
            <Chat
                name="Sandra"
                message="Ola!"
                timestamp="40 seconds ago"
                profilePic="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ikxKKz46O_ABi9A1XwzwugHaJh%26pid%3DApi&f=1&ipt=4622a993e00bd017bbd3d20e77a9bc0f463281332230e965679035c29e57a585&ipo=images"
            />
            <Chat
                name="Natasha"
                message="Yo whats up!"
                timestamp="40 seconds ago"
                profilePic="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.g78nIZAaM_h5rXyuhPv4sgAAAA%26pid%3DApi&f=1&ipt=b0014ab711ea31e686626a15d32ed1272c8b35ed5c5d25b6d63f816d1492f812&ipo=images"
            />
        */

    );
}

export default Chats