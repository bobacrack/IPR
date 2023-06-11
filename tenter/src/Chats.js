import React from 'react';
import './Chats.css';
import Chat from "./Chat";

function Chats(){
    return (
        <div className="chats">
            <Chat
                name="Mark"
                message="Yo whats up!"
                timestamp="40 seconds ago"
                profilePic="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.llU0i1WStG4Yh8RIq7YiPwHaE7%26pid%3DApi&f=1&ipt=51f7bfcfc7aa30858cfb8d59b1018c1b83598c73c10de3d89161fb794c8d3988&ipo=images"
            />
            <Chat
                name="Ellen"
                message="Hey how are you?"
                timestamp="40 seconds ago"
                profilePic="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.tQwA5wiyQ53pvk1xfX-lOgHaE2%26pid%3DApi&f=1&ipt=14fc5e4cfa2d953dafde1ea25e6994b45bec83615695f982333e783a46d64a25&ipo=images"
            />
            <Chat
                name="Sandra"
                message="Ola!"
                timestamp="40 seconds ago"
                profilePic="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ikxKKz46O_ABi9A1XwzwugHaJh%26pid%3DApi&f=1&ipt=4622a993e00bd017bbd3d20e77a9bc0f463281332230e965679035c29e57a585&ipo=images"
            />
            <Chat
                name="Natasha"
                message="Yo whats up!"
                timestamp="40 seconds ago"
                profilePic="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.g78nIZAaM_h5rXyuhPv4sgAAAA%26pid%3DApi&f=1&ipt=b0014ab711ea31e686626a15d32ed1272c8b35ed5c5d25b6d63f816d1492f812&ipo=images"
            />
        
        </div>
    );
}

export default Chats