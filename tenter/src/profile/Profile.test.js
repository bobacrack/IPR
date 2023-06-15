import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from './Profile';
import * as router from 'react-router';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Router, { MemoryRouter } from "react-router-dom";
import { auth } from "../firebase";

// Mock the necessary dependencies
jest.mock('../firebase', () => {
    return {
        database: jest.fn(),
        auth: {
            currentUser: {
                uid: 'test-user-uid',
                delete: jest.fn().mockResolvedValue(),
            },
        },
    };
});

jest.mock('firebase/auth', () => ({
    createUserWithEmailAndPassword: jest.fn(),
    getAuth: jest.fn(),

}));


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

describe('Profile', () => {
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })
    test('renders profile correctly', () => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1234' })
        render(<MemoryRouter>
            <Profile />
        </MemoryRouter>
        );
        expect(screen.getByText('Edit')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Delete')); // Open modal
        fireEvent.click(screen.getByText('cancel')); // Cancel modal
    });
    /*
        test('calls the delete and cancel functions on modal actions', async () => {
            jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1235' })
            render(<MemoryRouter>
                <Profile />
            </MemoryRouter>);
            fireEvent.click(screen.getByText('Delete')); // Open modal
            fireEvent.click(screen.getByText('yes')); // Cancel modal
    
            await waitFor(() => {
                expect(screen.queryByText('Delete account')).not.toBeInTheDocument();
            });
        });
        /*
            test('handles input changes correctly', () => {
                render(<Profile />);
                const firstNameInput = screen.getByTestId('input-firstname');
                const lastNameInput = screen.getByTestId('input-lastname');
        
                fireEvent.change(firstNameInput, { target: { value: 'John' } });
                fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
        
                expect(firstNameInput.value).toBe('John');
                expect(lastNameInput.value).toBe('Doe');
            });
        
            test('handles file upload and removal correctly', () => {
                render(<Profile />);
                const fileInput = screen.getByTestId('file-input');
        
                fireEvent.change(fileInput, {
                    target: { files: [{ uid: 'file-1', name: 'test-image.png' }] },
                });
                expect(screen.getByTestId('file-file-1')).toBeInTheDocument();
        
                fireEvent.click(screen.getByText('Remove'));
                expect(screen.queryByTestId('file-file-1')).not.toBeInTheDocument();
            });*/
});