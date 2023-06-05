import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import IconButton from '@mui/material/IconButton';
import "./Header.css";

function Header() {
    return (
        <div className='header'>
            <IconButton>
                <PersonIcon className='icon' fontSize='large' />
            </IconButton>
            <img className='logo' src='' alt='logo' />
            <IconButton>
                <ForumIcon className='icon' fontSize='large' />
            </IconButton>
        </div>
    )
}

export default Header