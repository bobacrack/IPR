import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import { collection, getDocs, setDoc, getDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import { database } from '../firebase';
import { auth } from '../firebase';
import './Card.css';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import StarRateIcon from '@material-ui/icons/StarRate';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import IconButton from '@material-ui/core/IconButton';

import '../SwipeButtons.css';
import { fetchUsers } from './fetchUsers';

export default function Card() {
    const { uid } = useParams();
    const [usersData, setusersData] = useState([]);
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


    //Test
    const childRefs = useMemo(
        () =>
            Array(usersData.length)
                .fill(0)
                .map((i) => React.createRef()),
        [usersData.length]
    );


    /*    
    const getFieldFromSnapshot = (docSnapshot, fieldName) => {
        const data = docSnapshot.data();
        const fieldValue = data ? data[fieldName] : undefined;
        return fieldValue;
    };
    */
    useEffect(() => {
        if (currentIndex >= 0 && currentIndex < usersData.length) {
            const currentuser = usersData[currentIndex];
            const userUUID = currentuser.uuid;
            setReceiverInfo(userUUID);
        }
    }, [currentIndex, usersData]);

    useEffect(() => {
        fetchUsers((data, error) => {
            if (data) {
                // Save the fetched users in the usersData state
                console.log("DATA Result: ", data);
                setusersData(data);
                //console.log(usersData);
            } else {
                console.error(error);
            }
        });
    }, []);
    /*
    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(database, 'likes', String(uid));
                const docSnapshot = await getDoc(docRef);
                if (docSnapshot.exists()) {
                    const likeData = docSnapshot.data();
                    getFieldFromSnapshot(docSnapshot, 'disliked').forEach(d => {
                        dislikes.push(d)
                    });
                    setLikes(likeData);
                } else {
                    const collectionRef = collection(database, 'likes');
                    await setDoc(doc(collectionRef, uid), { likedMe: [], myLikes: [], disliked: [] });
                }
            } catch (error) {
                console.error('Error fetching user document:', error);
            }

            const q = query(collection(database, 'usersData'), where('uuid', 'not-in', dislikes));
            const querySnapshot = await getDocs(q);
            const userData = querySnapshot.docs.map((doc) => doc.data());
            setusersData(userData);
            setCurrentIndex(userData.length - 1);
        };

        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(database, 'likes', String(uid));
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    const likeData = docSnapshot.data();
                    setLikes(likeData);
                } else {
                    const collectionRef = collection(database, "likes");
                    await setDoc(doc(collectionRef, uid), { likedMe: [], myLikes: [], disliked: [] });
                }
            } catch (error) {
                console.error('Error fetching user document:', error);
            }
        };

        fetchData();

    }, [uid]);

    */
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

    async function getLickyMaBally(uuid) {
        const fetchData = async () => {
            try {
                const docRef = doc(database, 'likes', uuid);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    const likeData = docSnapshot.data();
                    setOtherLikes(likeData);
                    otherLikes = likeData
                    otherLikes.likedMe.push(uid)
                    await updateDoc(doc(collection(database, 'likes'), String(uuid)), otherLikes);
                    if (likes.myLikes.includes(String(uuid)) && otherLikes.likedMe.includes(String(uid))) {
                        setShowConfetti(true)
                        setTimeout(() => {
                            navigate(`/chats/${receiverInfo}`);
                        }, 3000);
                    }
                } else {
                    const collectionRef = collection(database, "likes");
                    await setDoc(doc(collectionRef, uid), { likedMe: [], myLikes: [], disliked: [] });
                }
            } catch (error) {
                console.error('Error fetching user document:', error);
            }
        };

        fetchData();

    }

    const outOfFrame = (dir, name, idx, uuid) => {
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
        if (dir === 'right') {
            likes.myLikes.push(String(uuid))
            updateDoc(doc(collection(database, 'likes'), uid), likes)
            getLickyMaBally(uuid)

        }
        if (dir === 'left') {
            likes.disliked.push(String(uuid))
            updateDoc(doc(collection(database, 'likes'), uid), likes)
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

            <div className='tinderCardsCOntainer'>
                {usersData.map((user, index) => (
                    <TinderCard
                        ref={childRefs[index]}
                        className='swipe'
                        key={user.id}
                        onSwipe={(dir) => swiped(dir, user.firstname + " " + user.lastname, index)}
                        onCardLeftScreen={(dir) => outOfFrame(dir, user.firstname + " " + user.lastname, index, user.uid)}
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
