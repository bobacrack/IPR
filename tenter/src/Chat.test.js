import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Chat from './Chat';

describe('Chat', () => {
    const chatProps = {
        name: 'John Doe',
        receiverInfo: '123',
        message: 'Hello there',
        profilePic: 'profile.jpg',
        timestamp: '2023-06-15 10:00',
    };

    test('renders chat component with correct props', () => {
        render(
            <Router>
                <Chat {...chatProps} />
            </Router>
        );

        const linkElement = screen.getByRole('link', { name: /chats/i });
        expect(linkElement).toBeInTheDocument();

        const avatarElement = screen.getByAltText('img', { name: /avatar/i });
        expect(avatarElement).toBeInTheDocument();
        expect(avatarElement).toHaveAttribute('src', chatProps.profilePic);

        const nameElement = screen.getByRole('heading', { level: 2, name: chatProps.name });
        expect(nameElement).toBeInTheDocument();

        const messageElement = screen.getByText(chatProps.message);
        expect(messageElement).toBeInTheDocument();

        const timestampElement = screen.getByText(chatProps.timestamp);
        expect(timestampElement).toBeInTheDocument();
    });
});