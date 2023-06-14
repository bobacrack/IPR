import React from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Profile from './Profile';

describe('Profile component', () => {
    beforeEach(() => {
        render(<Router>
            <Profile />
        </Router>);
    });

    test('renders profile information', () => {
        // Ensure the profile name is rendered
        const profileName = screen.getByText(/tent\.name/i);
        expect(profileName).toBeInTheDocument();

        // Ensure the profile image is rendered
        const profileImage = screen.getByAltText(/profile/i);
        expect(profileImage).toBeInTheDocument();
    });
    /*
    test('opens and closes delete modal', () => {
        // Open delete modal
        const deleteButton = screen.getByLabelText(/delete/i);
        fireEvent.click(deleteButton);

        // Ensure delete modal is rendered
        const deleteModal = screen.getByRole('dialog');
        expect(deleteModal).toBeInTheDocument();

        // Close delete modal
        const cancelButton = screen.getByText(/cancel/i);
        fireEvent.click(cancelButton);

        // Ensure delete modal is closed
        expect(deleteModal).not.toBeInTheDocument();
    });

    test('opens and closes update modal', () => {
        // Open update modal
        const editButton = screen.getByLabelText(/edit/i);
        fireEvent.click(editButton);

        // Ensure update modal is rendered
        const updateModal = screen.getByRole('dialog');
        expect(updateModal).toBeInTheDocument();

        // Close update modal
        const cancelButton = screen.getByText(/cancel/i);
        fireEvent.click(cancelButton);

        // Ensure update modal is closed
        expect(updateModal).not.toBeInTheDocument();
    });

    test('handles input change', () => {
        // Change firstname input value
        const firstnameInput = screen.getByPlaceholderText(/enter your name/i);
        fireEvent.change(firstnameInput, { target: { value: 'John' } });

        // Ensure firstname input value is updated
        expect(firstnameInput.value).toBe('John');

        // Change lastname input value
        const lastnameInput = screen.getByPlaceholderText(/enter your last name/i);
        fireEvent.change(lastnameInput, { target: { value: 'Doe' } });

        // Ensure lastname input value is updated
        expect(lastnameInput.value).toBe('Doe');
    });
*/
    // Add more tests for other functionalities as needed
});