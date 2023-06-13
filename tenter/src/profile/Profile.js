import React, { useState, useEffect } from "react";
import "./Profile.css";
import { database } from '../firebase';
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";
import { useParams } from "react-router-dom";


export default function Profile() {
    const { uid } = useParams();
    const [tent, setTent] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(database, 'tents', String(uid));
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    const tentData = docSnapshot.data();
                    setTent(tentData);
                } else {
                    console.log(`No tent document found with uid: ${uid}`);
                }
            } catch (error) {
                console.error('Error fetching tent document:', error);
            }
        };

        fetchData();
    }, [uid]);

    return (
        <div className="profileContainer">
            <div className="picture" style={{ backgroundImage: `url(${tent.url})` }}>
                {tent && <img src={tent.url} alt="Profile" />}
            </div>
        </div>


    );
}

