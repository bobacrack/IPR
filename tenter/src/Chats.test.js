import React from 'react';
import { render, screen } from '@testing-library/react';
import Chats from './Chats';

describe('Chats', () => {
    test('renders chat components for each user', () => {
        // Mock the users and chats data
        const usersData = [
            { id: 1, firstname: 'John', lastname: 'Doe', picture: 'profile1.jpg' },
            { id: 2, firstname: 'Jane', lastname: 'Smith', picture: 'profile2.jpg' },
        ];

        const chatsData = [
            { uidsender: 1, uidreceiver: 2, message: 'Hello', timestamp: 1624440000 },
            { uidsender: 2, uidreceiver: 1, message: 'Hi', timestamp: 1624441000 },
        ];

        // Render the Chats component with the mocked data
        render(<Chats usersData={usersData} chatsData={chatsData} data-testid={`chat`} />);

        // Verify that the chat components are rendered for each user
        const chatComponents = screen.getAllByTestId('chat');
        expect(chatComponents.length).toBe(2);

        // Verify the content of the chat components
        expect(chatComponents[0]).toHaveTextContent('John Doe');
        expect(chatComponents[1]).toHaveTextContent('Jane Smith');
    });
});
