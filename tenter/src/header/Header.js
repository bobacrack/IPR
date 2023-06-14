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

function Header({ backButton }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }

    const handleProfileClick = () => {
        const uid = auth.currentUser.uid
        navigate(`/profile/${uid}`);
    };

    const home = () => {
        const uid = auth.currentUser.uid
        navigate(`/${uid}`);
    }



    return (
        <div className="header">
            {backButton ? (
                <IconButton data-testid="backButton" onClick={() => navigate(`/${auth.currentUser.uid}`)}>
                    <ArrowBackIosIcon fontSize="large" className="header__icon" />
                </IconButton>
            ) : (
                <IconButton onClick={handleProfileClick}>
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
                <Link to="/chats">
                    <IconButton>
                        <ForumIcon className='icon' fontSize='large' />
                    </IconButton>
                </Link>
            </div>



        </div >
    )
}

export default Header