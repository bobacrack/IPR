/* istanbul ignore file */

import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Profile from './Profile';
import firebase from 'firebase/app';
import 'firebase/auth';
import { auth as firebaseAuth } from '../firebase'; // Import your Firebase auth module

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

const mockSignUp = jest.fn(() =>
    Promise.resolve({
        user: {
            uid: 'fakeuid',
        },
    })
);
const mockSignIn = jest.fn(() =>
    Promise.resolve({
        user: {
            uid: 'fakeUid',
        },
    })
);

describe('Profile', () => {
    beforeEach(() => {
        const mockGetAuth = jest.fn(); // Move mockGetAuth inside beforeEach

        jest.mock('firebase/auth', () => {
            return {
                getAuth: mockGetAuth,
                signInWithEmailAndPassword: mockSignIn,
                createUserWithEmailAndPassword: mockSignUp,
            };
        });

        useParams.mockReturnValue({ uid: '123' });
        const mockUser = {
            uid: '123',
            email: 'test@example.com',
            displayName: 'John Doe',
            delete: jest.fn(() => Promise.resolve()),
            stsTokenManager: { // Mock the stsTokenManager object with an accessToken property
                accessToken: 'firebase',
            },
        };

        firebaseAuth.currentUser = mockUser;
    });

    test('renders profile information correctly', () => {
        render(
            <Router>
                <Profile />
            </Router>
        );

        // Assert the profile information is rendered correctly
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByAltText('Profile')).toBeInTheDocument();
    });

    test('opens delete modal when delete button is clicked', () => {
        render(
            <Router>
                <Profile />
            </Router>
        );

        fireEvent.click(screen.getByRole('button', { name: /delete/i }));

        // Assert the delete modal is open
        expect(screen.getByText('Delete account?')).toBeInTheDocument();
    });

    test('opens update modal when edit button is clicked', () => {
        render(
            <Router>
                <Profile />
            </Router>
        );

        fireEvent.click(screen.getByRole('button', { name: /edit/i }));

        // Assert the update modal is open
        expect(screen.getByText('update account')).toBeInTheDocument();
    });
    /*
    test('updates profile information on save', () => {
        render(
            <Router>
                <Profile />
            </Router>
        );

        fireEvent.click(screen.getByRole('button', { name: /edit/i }));

        // Simulate entering new values in the input fields
        fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
            target: { value: 'Jane' },
        });
        fireEvent.change(screen.getByPlaceholderText('Enter your last name'), {
            target: { value: 'Doe' },
        });

        // Simulate uploading a file
        const file = new File(['profile.jpg'], 'profile.jpg', { type: 'image/jpeg' });
        fireEvent.change(screen.getByLabelText('Upload'), { target: { files: [file] } });

        fireEvent.click(screen.getByRole('button', { name: /save/i }));

        // Assert the profile information is updated
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });*

    test('deletes user account on confirmation', () => {
        // Mock the useNavigate hook
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        render(
            <Router>
                <Profile />
            </Router>
        );

        fireEvent.click(screen.getByRole('button', { name: /delete/i }));
        fireEvent.click(screen.getByRole('button', { name: /delete/i }));

        // Assert that the delete function is called
        // expect(deleteFunction).toHaveBeenCalled();

        // Assert that the user is navigated to the login page
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });*/
});