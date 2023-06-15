import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import Header from './Header';



describe('Header component', () => {
    beforeEach(() => {
        render(
            <Router>
                <Header backButton={true} />
            </Router>
        );
    });

    test('renders logo image', () => {
        const logoElement = screen.getByAltText('logo');
        expect(logoElement).toBeInTheDocument();
    });

    test('renders back button', () => {
        const backButton = screen.getByTestId('backButton');
        fireEvent.click(backButton);
        expect(navigate).toHaveBeenCalledWith(`/${user.uid}`);
        // Add assertions for the expected behavior when the button is clicked
    });

    test('calls signOut function and navigates to login page on logout', async () => {

        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);
        await act(async () => {
            fireEvent.click(logoutButton);
            await Promise.resolve(); // Wait for state updates to settle
        });
        //expect(signOut).toHaveBeenCalledTimes(1);
        // Add assertions for the expected behavior after sign out
    });
    /*
        test('navigates to profile page on profile icon click', () => {
            const profileButton = screen.getByRole('button', { name: 'Profile' });
            fireEvent.click(profileButton);
            // Add assertions for the expected behavior when the profile button is clicked
        });
    
        test('navigates to chats page on forum icon click', () => {
            const chatsLink = screen.getByRole('link', { name: 'Chats' });
            fireEvent.click(chatsLink);
            // Add assertions for the expected behavior when the chats link is clicked
        });*/
});