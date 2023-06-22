import { render, screen, waitFor } from '@testing-library/react';
import Chats from './Chats';
import { fetchUsers } from './card/fetchUsers';
import { fetchChats } from './card/fetchChats';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

jest.mock('./card/fetchUsers');
jest.mock('./card/fetchChats');
jest.mock('./firebase');
jest.mock('firebase/auth');

describe('Chats', () => {
    test('renders chat components for each user', async () => {
        // Mock the users and chats data
        const usersData = [
            { id: 1, firstname: 'John', lastname: 'Doe', picture: 'profile1.jpg', uid: 'uid1' },
            { id: 2, firstname: 'Jane', lastname: 'Smith', picture: 'profile2.jpg', uid: 'uid2' },
        ];

        const chatsData = [
            { uidsender: 'uid1', uidreceiver: 'uid2', message: 'Hello', timestamp: 1624440000 },
            { uidsender: 'uid2', uidreceiver: 'uid1', message: 'Hi', timestamp: 1624441000 },
        ];

        // Mock fetchUsers and fetchChats
        fetchUsers.mockImplementation((callback) => {
            callback(usersData, null);
        });

        fetchChats.mockImplementation((callback) => {
            callback(chatsData, null);
        });

        // Mock onAuthStateChanged
        const user = {
            uid: 'mockUserID',
        };

        onAuthStateChanged.mockImplementation((auth, callback) => {
            callback(user);
        });

        // Render the Chats component
        render(<Chats />);

        // Wait for the chat components to be rendered
        await waitFor(() => {
            // Verify that the chat components are rendered for each user
            const chatComponents = screen.getAllByTestId('chat');
            expect(chatComponents.length).toBe(2);

            // Verify the content of the chat components
            expect(chatComponents[0]).toHaveTextContent('John Doe');
            expect(chatComponents[1]).toHaveTextContent('Jane Smith');
        });
    });
});