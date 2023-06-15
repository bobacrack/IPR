import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Header from './Header';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

jest.mock('../firebase', () => ({
    auth: {
        currentUser: {
            uid: 'mockedUid',
        },
    },
}));

jest.mock('firebase/auth', () => ({
    signOut: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Header component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders header with back button', () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);

        render(
            <MemoryRouter>
                <Header backButton />
            </MemoryRouter>
        );

        const backButton = screen.getByTestId('backButton');
        fireEvent.click(backButton);

        expect(navigate).toHaveBeenCalledWith('/mockedUid');
    });

    test('renders header with profile button', () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);

        render(
            <MemoryRouter>
                <Header backButton={false} />
            </MemoryRouter>
        );

        const profileButton = screen.getByTestId('profButo');
        fireEvent.click(profileButton);

        expect(navigate).toHaveBeenCalledWith('/profile/mockedUid');
    });

    test('renders header with logout button', async () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);

        render(
            <MemoryRouter>
                <Header backButton={false} />
            </MemoryRouter>
        );

        const logoutButton = screen.getByTestId('logout');
        fireEvent.click(logoutButton);

        await act(async () => {
            await signOut(auth);
        });

        expect(signOut).toHaveBeenCalled();
        expect(navigate).toHaveBeenCalledWith('/login');
    });

    test('renders header with logo and chat button', () => {
        const navigate = jest.fn();
        useNavigate.mockImplementation(() => navigate);

        render(
            <MemoryRouter>
                <Header backButton={false} />
            </MemoryRouter>
        );

        const logo = screen.getByAltText(/logo/i);
        fireEvent.click(logo);
        expect(logo).toBeInTheDocument()

        const chatButton = screen.getByTestId("chatButton");
        fireEvent.click(chatButton);

        expect(chatButton).toBeInTheDocument()
    });
});
