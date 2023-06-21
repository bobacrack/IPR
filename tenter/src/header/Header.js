import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./Header.css";
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png'
import { auth } from '../firebase';
import { signOut } from "firebase/auth";
import { Button } from 'antd';
import { onAuthStateChanged } from "firebase/auth";

function Header({ backButton }) {
    const navigate = useNavigate();
    const [userID, setUserID] = useState(null);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUserID(uid);
            } else {
            }
        });

        return () => {
            unsubscribe();
        }
    }, []);
    const handleLogout = async () => {
        await signOut(auth)
        navigate("/login");
    }

    const handleProfileClick = () => {
        const uid = auth.currentUser.uid
        navigate(`/profile/${userID}`);
    };

    const home = () => {
        const uid = auth.currentUser.uid
        navigate(`/${userID}`);
    }



    return (
        <div className="header">
            {backButton ? (
                <IconButton data-testid="backButton" onClick={() => navigate(`/${auth.currentUser.uid}`)}>
                    <ArrowBackIosIcon fontSize="large" className="header__icon" />
                </IconButton>
            ) : (
                <IconButton data-testid="profButo" onClick={handleProfileClick}>
                    <PersonIcon className='icon' fontSize='large' />
                </IconButton>
            )}



            <Link to={home}>
                <img className='logo' src={logo} alt='logo' />
            </Link>

            <div>
                <Button data-testid="logout" onClick={handleLogout} type="primary" size='large'>
                    Logout
                </Button>
                <Link data-testid="chatButton" to="/chats">
                    <IconButton >
                        <ForumIcon className='icon' fontSize='large' />
                    </IconButton>
                </Link>
            </div>



        </div >
    )
}

export default Header