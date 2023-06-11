import React, {useState} from 'react';
import  Avatar  from '@material-ui/core/Avatar';
import "./ChatScreen.css";

function ChatScreen() {
    const [messages, setMessages] = useState([
        {
            name: 'Ellen',
            image:  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.llU0i1WStG4Yh8RIq7YiPwHaE7%26pid%3DApi&f=1&ipt=51f7bfcfc7aa30858cfb8d59b1018c1b83598c73c10de3d89161fb794c8d3988&ipo=images',
            message: 'Whats up'
        },
        {
            name: 'Ellen',
            image:  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.llU0i1WStG4Yh8RIq7YiPwHaE7%26pid%3DApi&f=1&ipt=51f7bfcfc7aa30858cfb8d59b1018c1b83598c73c10de3d89161fb794c8d3988&ipo=images',
            message: 'WHHHHHHATTS up'
        },
        {
            message: 'KK'
        },

    ]);

    return (
        <div className="chatScreen">
            <p className="chatScreen__timestamp">YOU MATCHED WITH ELLEN ON 10/10/2023</p>
            {messages.map((message) =>(
                message.name ? (
                    <div className="chatScreen__message">
                    <Avatar className="chatScreen__image" alt={message.name}src={message.image} />
                    <p className="chatScreen__text">{message.message}</p>
                    </div>
                ) : (
                    <div className="chatScreen__message">
                        <p className="chatScreen__textUser">{message.message}</p>
                    </div>
                )
                
            ))}
            
            <form className="chatScreen__input">
                <input className="chatScreen__inputField" placeholder="Type a message..." type="text"/>
                <button className="chatScreen__inputButton">SEND</button>    
            </form>
            
        </div>
    );
}

export default ChatScreen;