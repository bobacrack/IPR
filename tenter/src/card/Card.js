import React, { useState } from 'react'
import TinderCard from "react-tinder-card"
import './Card.css'

export default function Card() {

    const [people, setPeople] = useState([
        {
            name: 'Nils Kühl',
            url: 'https://zpacks.com/cdn/shop/products/Duplex-olive_2048x.jpg?v=1679514321'
        },
        {
            name: 'levi lübbe',
            url: 'https://zpacks.com/cdn/shop/products/Duplex-olive_2048x.jpg?v=1679514321'
        }
    ]);
    //const people = []

    return (
        <div className='tinderCardsCOntainer'>
            {people.map(person => (
                <TinderCard className='swipe'
                    key={person.name} preventSwipe={['up', 'down']}>
                    <div className='card' style={{ backgroundImage: `url(${person.url})` }}>
                        <h3>{person.name}</h3>
                    </div>
                </TinderCard>
            ))}
        </div>
    )
}
