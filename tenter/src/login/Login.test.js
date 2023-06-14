import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import LogIn from './Login';

jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('../firebase', () => ({
    auth: jest.fn(),
}));

describe('LogIn', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the login form', () => {
        render(<LogIn />);

        expect(screen.getByText('Log In to your Account')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
        expect(screen.getByText('No account? register now!')).toBeInTheDocument();
    });

    it('should call signInWithEmailAndPassword and navigate on form submission', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        const user = { /* mock user object */ };
        const navigate = jest.fn();

        useNavigate.mockReturnValue(navigate);
        signInWithEmailAndPassword.mockResolvedValue({ user });

        render(<LogIn />);

        fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
            target: { value: email },
        });
        fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
            target: { value: password },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Log In' }));

        await waitFor(() => {
            expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
            expect(navigate).toHaveBeenCalledWith('/');
        });
    });

    it('should handle sign-in error', async () => {
        const errorCode = 'auth/invalid-email';
        const errorMessage = 'Invalid email address';

        signInWithEmailAndPassword.mockRejectedValue({
            code: errorCode,
            message: errorMessage,
        });

        render(<LogIn />);

        fireEvent.click(screen.getByRole('button', { name: 'Log In' }));

        await waitFor(() => {
            expect(screen.getByText(`${errorCode} ${errorMessage}`)).toBeInTheDocument();
        });
    });
});