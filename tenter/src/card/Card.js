import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import { collection, getDocs, setDoc, getDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import { database } from '../firebase';
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import './Card.css';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import StarRateIcon from '@material-ui/icons/StarRate';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import IconButton from '@material-ui/core/IconButton';
import firebase from 'firebase/app';
import 'firebase/auth';

import '../SwipeButtons.css';
import { fetchUsers } from './fetchUsers';
import { fetchDislikes } from './fetchChats';

export default function Card() {
    const { uid } = useParams();
    var [usersData, setusersData] = useState([]);
    const [actual, setActual] = useState([]);

    const [dislikeData, setDislikeData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [lastDirection, setLastDirection] = useState();
    const [receiverInfo, setReceiverInfo] = useState('');
    const currentIndexRef = useRef(currentIndex);
    var [likes, setLikes] = useState([]);
    var [dislikes, setDislikes] = useState([uid]);
    var [otherLikes, setOtherLikes] = useState({ disliked: [], likedMe: [], myLikes: [] })
    const { width, height } = useWindowSize()
    const navigate = useNavigate();
    const [showConfetti, setShowConfetti] = useState(false);
    var [cards, setCards] = useState([])
    var [userID, setUserID] = useState();



    function findMatchingId(userID, usersData) {
        const matchingUser = usersData.find(user => user.uid === userID);
        return matchingUser ? matchingUser.id : null;
    }

    async function getUser() {
        console.log("1: " + userID)
        await fetchUsers((data, error) => {
            if (data) {
                // Save the fetched users in the usersData state
                setusersData(data);
                //console.log(usersData);
            } else {
                console.error(error);
            }
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user.uid) {
                const uid = user.uid;
                setUserID(uid);
                getUser();
                handleDl();
            } else {
            }
        });

    }, [userID]);



    async function handleDl() {
        console.log(userID);
        var id = findMatchingId(userID, usersData);
        const deleteUserEndpoint = `http://localhost:6969/api/v1/dislike`;

        await fetch(deleteUserEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Parse the response JSON
                } else {
                    console.error('Fehler beim Löschen des Benutzers:', response.status);
                }
            })
            .then(data => {
                // Assuming data is an array of objects
                setDislikeData(data); // Set the dislike data with parsed JSON data
                console.log(dislikeData)
                let ca = [];
                for (let index = 0; index < dislikeData.length; index++) {
                    const id = dislikeData[index].UIDDisliked;
                    console.log("dislike id: " + id)
                    usersData.forEach(u => {
                        if (u.id !== id && !ca.includes(u)) {
                            ca.push(u);
                        }
                    });
                }
                setusersData(ca)
            })
            .catch(error => {
                console.error('Fehler beim Löschen des Benutzers:', error);
            });
    }


    const childRefs = useMemo(
        () =>
            Array(usersData.length)
                .fill(0)
                .map((i) => React.createRef()),
        [usersData.length]
    );


    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }


    const canGoBack = currentIndex < usersData.length - 1

    const canSwipe = currentIndex >= 0

    // set last direction and decrease current index
    const swiped = (direction, nameToDelete, index) => {
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }


    const outOfFrame = (dir, name, idx, uuid) => {
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
        if (dir === 'right') {

            const response = fetch("http://217.160.215.31:6969/api/v1/likes", {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({ uidliker: findMatchingId(userID, usersData), uidliked: uuid })
            });
        }
        if (dir === 'left') {
            const response = fetch("http://217.160.215.31:6969/api/v1/dislike", {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({ uiddisliker: findMatchingId(userID, usersData), uiddisliked: uuid })
            });
        }

    }

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < usersData.length) {
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
            {showConfetti && <Confetti
                run={true}
                tweenDuration={100}
                width={width}
                height={height}
            />
            }
            <div>{userID}</div>
            <div className='tinderCardsCOntainer'>
                {usersData.map((user, index) => (
                    <TinderCard
                        ref={childRefs[index]}
                        className='swipe'
                        key={user.id}
                        onSwipe={(dir) => swiped(dir, user.firstname + " " + user.lastname, index)}
                        onCardLeftScreen={(dir) => outOfFrame(dir, user.firstname + " " + user.lastname, index, user.id)}
                    >
                        <div
                            style={{ backgroundImage: 'url(' + user.picture + ')' }}
                            className='card'
                        >
                            <h1>{user.firstname + " " + user.lastname}  ({user.age})</h1>
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
                <IconButton onClick={() => navigate(`/chats/${receiverInfo}`)} className="swipeButtons__star">
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
