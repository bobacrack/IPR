import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import './nav.css'

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <div className='links'>
                <a id='home' className='link' href='/'>Home</a>
                <a id='about' className='link' href='/about'>About</a>
            </div>
            <div className='avatars'>
                <div className='avatar'>
                    <Badge>
                        <Avatar onClick={() => navigate('/about')} size={45} icon={<UserOutlined />} />
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

export default Navbar;