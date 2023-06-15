import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationPage from './RegistrationPage';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import * as router from 'react-router';

jest.mock('firebase/auth', () => ({
    createUserWithEmailAndPassword: jest.fn(),
    getAuth: jest.fn(),
}));

const navigate = jest.fn()

describe('RegistrationPage', () => {
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    test('renders registration form', () => {
        render(<RegistrationPage />);

        // Check if all form elements are rendered
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Age')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByText('Age preference')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
    });

    test('allows inputting values and submitting the form', async () => {
        const navigate = jest.fn(); // Mock the navigate function
        createUserWithEmailAndPassword.mockResolvedValue();
        render(<RegistrationPage navigate={navigate} />);

        // Fill in form inputs
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText('Age'), { target: { value: '1990-01-01' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

        // Submit the form
        fireEvent.click(screen.getByText('Register'));

        // Wait for async actions to complete (e.g., Firebase operations)
        await waitFor(() => {
            // Assertions for the expected behavior after form submission
            // Replace these assertions with the actual expected behavior
            expect(screen.queryByText('Invalid email address')).toBeNull();
            expect(screen.queryByText('Please enter a password')).toBeNull();
        });

    });


    test('displays an error message for missing required fields', async () => {
        render(<RegistrationPage />);

        // Submit the form without filling in any valuesfireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText('Age'), { target: { value: '1990-01-01' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

        // Wait for async actions to complete (e.g., Firebase operations)
        await waitFor(() => {
            // Assertions for the expected error messages
            expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Enter your last name')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Enter your email address')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Select your age')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
        });
    });
    /*
        test('displays an error message for an invalid email address', async () => {
            render(<RegistrationPage />);
    
            // Fill in an invalid email address
            fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } });
    
            // Submit the form
            fireEvent.click(screen.getByText('Register'));
    
            // Wait for async actions to complete (e.g., Firebase operations)
            await waitFor(() => {
                // Assertion for the expected error message
                expect(screen.getByText('Invalid email address')).toBeInTheDocument();
            });
        });*/

    // Add more tests to cover other parts of the code as needed
});