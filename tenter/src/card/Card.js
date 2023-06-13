import React, { useEffect, useState, useRef, useMemo } from 'react'

import TinderCard from "react-tinder-card"
import { database } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import './Card.css'



import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import IconButton from "@material-ui/core/IconButton";

import "../SwipeButtons.css";



export default function Card() {


    const [tents, setTents] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [lastDirection, setLastDirection] = useState();
    const currentIndexRef = useRef(currentIndex);
    const childRefs = useMemo(
        () =>
            Array(tents.length)
                .fill(0)
                .map((i) => React.createRef()),
        [tents.length]
    );

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(database, "tents"));
            const tentData = querySnapshot.docs.map((doc) => doc.data());
            setTents(tentData);
            setCurrentIndex(tentData.length - 1);
        };

        fetchData();

    }, []);


    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < tents.length - 1
    console.log("CurrentIndex" + currentIndex);

    const canSwipe = currentIndex >= 0

    // set last direction and decrease current index
    const swiped = (direction, nameToDelete, index) => {
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (name, idx) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
    }

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < tents.length) {
            await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }


    // increase current index and show card
    const goBack = async () => {
        if (!canGoBack) return;
        const newIndex = currentIndex + 1;
        if (newIndex < childRefs.length) {
            updateCurrentIndex(newIndex);
            await childRefs[newIndex].current.restoreCard();
        }
    };

    return (
        <div>
            <div className='tinderCardsCOntainer'>
                {tents.map((tent, index) => (
                    <TinderCard
                        ref={childRefs[index]}
                        className='swipe'
                        key={tent.name}
                        onSwipe={(dir) => swiped(dir, tent.name, index)}
                        onCardLeftScreen={() => outOfFrame(tent.name, index)}
                    >
                        <div
                            style={{ backgroundImage: 'url(' + tent.url + ')' }}
                            className='card'
                        >
                            <h3>{tent.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className="swipeButtons">
                <IconButton style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()} className="swipeButtons__repeat">
                    <ReplayIcon fontSize="large" />
                </IconButton>
                <IconButton style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')} className="swipeButtons__left">
                    <CloseIcon fontSize="large" />
                </IconButton>
                <IconButton className="swipeButtons__star">
                    <StarRateIcon fontSize="large" />
                </IconButton>
                <IconButton style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')} className="swipeButtons__right">
                    <FavoriteIcon fontSize="large" />
                </IconButton>
                <IconButton className="swipeButtons__lightning">
                    <FlashOnIcon fontSize="large" />
                </IconButton>
            </div>
        </div>
    )
}
