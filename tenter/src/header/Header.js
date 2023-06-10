import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./Header.css";
import { Link } from 'react-router-dom';

function Header({backButton}) {
    return (
        <div className="header">
            {backButton ? (
                <IconButton>
                    <ArrowBackIosIcon fontSize="large" className="header__icon" />
                </IconButton>
            ) : (
                <IconButton>
                    <PersonIcon className='icon' fontSize='large' />
                </IconButton>   
            )}
            

            <Link to="/">
                <img className='logo' src='' alt='logo' />
            </Link>

            <Link to="/chat">
            <IconButton>
                <ForumIcon className='icon' fontSize='large' />
            </IconButton>
            </Link>
        </div>
    )
}

export default Header