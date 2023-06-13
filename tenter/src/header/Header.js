import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./Header.css";
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png'

function Header({ backButton }) {
    const nav = useNavigate();
    return (
        <div className="header">
            {backButton ? (
                <IconButton onClick={() => nav(backButton)}>
                    <ArrowBackIosIcon fontSize="large" className="header__icon" />
                </IconButton>
            ) : (
                <IconButton>
                    <PersonIcon className='icon' fontSize='large' />
                </IconButton>
            )}


            <Link to="/">
                <img className='logo' src={logo} alt='logo' />
            </Link>

            <Link to="/chats">
                <IconButton>
                    <ForumIcon className='icon' fontSize='large' />
                </IconButton>
            </Link>
        </div>
    )
}

export default Header