import React, { useEffect, useState } from 'react'
import TinderCard from "react-tinder-card"
import {database} from '../firebase';
import { collection, getDocs } from "firebase/firestore"; 
import './Card.css'


export default function Card() {

    const [tents, setTents] = useState([]);
    //const people = []

    //runs based on condition
   
    useEffect(() => {
        const fetchData = async () => {
          const querySnapshot = await getDocs(collection(database, "tents"));
          const tentData = querySnapshot.docs.map((doc) => doc.data());
          setTents(tentData);
        };
      
        fetchData();
    }, []);
    
    return (
        <div className='tinderCardsCOntainer'>
            {tents.map((tent) => (
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
