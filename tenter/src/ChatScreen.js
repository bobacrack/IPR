import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import "./ChatScreen.css";
import { database, auth } from './firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { message } from 'antd';



function ChatScreen() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [userID, setUserID] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(database, "chats"));
            const tentData = querySnapshot.docs.map((doc) => doc.data());
            setMessages(tentData);

        };
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUserID(uid);
                console.log("USER", uid);
            } else {
                // User is signed out
                // ...
                console.log("user is logged out");
            }
        });

        fetchData();


        return () => unsubscribe();

    }, []);

    const handleSend = async (e) => {
        e.preventDefault();

        const newMessage = {
            message: input,
            recevierId: "cPXREW7ssjenYSKdgtHI89jgUTp1",
            senderId: userID,
            timestamp: serverTimestamp()
        };

        try {
            // Daten in der Firestore Collection "messages" speichern
            const docRef = await addDoc(collection(database, "chats"), newMessage);
            console.log("Nachricht erfolgreich gesendet:", docRef.id);
        } catch (error) {
            console.error("Fehler beim Senden der Nachricht:", error);
        }

        setMessages([...messages, newMessage]);
        setInput("")
    };

    const getName = async (documentId) => {
        const docRef = doc(database, "tents", documentId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            const name = data.name;
            return name;
        } else {
            console.log('Das Dokument wurde nicht gefunden.');
            return null;
        }
    };

    // Beispielaufruf


    return (
        <div className="chatScreen">
            <p className="chatScreen__timestamp">YOU MATCHED WITH ELLEN ON 10/10/2023</p>
            {messages.map((message, index) => (

                message.senderId !== userID ? (
                    <div key={index} className="chatScreen__message">
                        <Avatar className="chatScreen__image" alt={message.recevierIds} src={message.image} />
                        <p className="chatScreen__text">{message.message}</p>
                    </div>
                ) : (
                    <div key={index} className="chatScreen__message">
                        <p className="chatScreen__textUser">{message.message}</p>
                    </div>
                )

            ))}

            <form className="chatScreen__input">
                <input value={input} onChange={e => setInput(e.target.value)} className="chatScreen__inputField" placeholder="Type a message..." type="text" />
                <button onClick={handleSend} type="submit" className="chatScreen__inputButton">SEND</button>
            </form>

        </div>
    );
}

export default ChatScreen;