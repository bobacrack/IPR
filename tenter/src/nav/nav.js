import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import './nav.css'

export default function Navbar() {
    return (
        <div className="navbar">
            <div className='links'>
                <a id='home' className='link' href='/'>Home</a>
                <a id='about' className='link' href='/about'>About</a>
            </div>
            <div className='avatar'>
                <Avatar size={64} icon={<UserOutlined />} />
            </div>
        </div>
    )
}