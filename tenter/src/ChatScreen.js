import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import "./ChatScreen.css";
import { database, auth } from './firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from 'react-router-dom';




function ChatScreen() {
    const { receiverInfo } = useParams();
    console.log("ReciverInfo aus URL: " + receiverInfo);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [userID, setUserID] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(database, "chats"));
            //const q = query(collection(database, 'chats'), where('recevierId', '==', String(userID)));
            //const querySnapshot = await getDoc(q)
            const tempData = querySnapshot.docs.map((doc) => doc.data());
            console.log(tempData)
            setMessages(tempData.sort((a, b) => a.timestamp - b.timestamp));
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUserID(uid);
                console.log("USER", uid);
            } else {
                console.log("User is logged out");
            }
        });

        fetchData();

        const unsubscribeRealtime = onSnapshot(collection(database, "chats"), (snapshot) => {
            const updatedData = snapshot.docs.map((doc) => doc.data());
            setMessages(updatedData.sort((a, b) => a.timestamp - b.timestamp));
        });

        return () => {
            unsubscribe();
            unsubscribeRealtime();
        };
    }, []);

    const handleSend = async (e) => {
        e.preventDefault();

        const newMessage = {
            message: input,
            recevierId: receiverInfo,
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

    const date = new Date().toDateString()

    // Beispielaufruf


    return (
        <div className="chatScreen">
            <p className="chatScreen__timestamp">YOU MATCHED WITH ELLEN ON {date}</p>
            {messages.map((message, index) => (
                (String(message.senderId) === String(userID) && String(message.recevierId) === String(receiverInfo)) ? (
                    <div key={index} className="chatScreen__message">
                        <p className="chatScreen__textUser">{message.message}</p>
                    </div>
                ) : (String(message.senderId) !== String(userID) && String(message.senderId) === String(receiverInfo)) ? (
                    <div key={index} className="chatScreen__message">
                        <Avatar className="chatScreen__image" alt={message.recevierIds} src={message.image} />
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