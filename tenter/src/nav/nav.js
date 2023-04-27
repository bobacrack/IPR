import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
import './nav.css'

export default function Navbar() {
    return (
        <div className="navbar">
            <div className='links'>
                <a id='home' className='link' href='/'>Home</a>
                <a id='about' className='link' href='/about'>About</a>
            </div>
            <div className='avatars'>
                <div className='avatar'>
                    <Badge>
                        <Avatar size={45} icon={<UserOutlined />} />
                    </Badge>
                </div>
                <div className='avatar'>
                    <Badge count={5}>
                        <Avatar size={45} icon={<MailOutlined />} />
                    </Badge>
                </div>
            </div>
        </div>
    )
}