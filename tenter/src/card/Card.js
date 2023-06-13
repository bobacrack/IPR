import React, { useEffect, useState } from 'react'
import TinderCard from "react-tinder-card"
import { database } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import './Card.css'


export default function Card() {

    const [tents, setTents] = useState([]);
    const t = []

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(database, "tents"));
            const tentData = await querySnapshot.docs.map((doc) => doc.data());
            await setTents(tentData);
        };

        fetchData();

    }, []);

    function mapTents() {
        tents.forEach(element => {
            t.push(element)
        });
    }

    mapTents()

    return (
        <div className='tinderCardsCOntainer'>
            {t.map((tent) => (
                <TinderCard className='swipe'
                    key={tent.name} preventSwipe={['up', 'down']}>
                    <div className='card' style={{ backgroundImage: `url(${tent.url})` }}>
                        <h3>{tent.name}</h3>
                    </div>
                </TinderCard>
            ))}
        </div>
    )
}
