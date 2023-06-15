import React, { useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';
import * as router from 'react-router';

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useParams: jest.fn(),
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: jest.fn(),
    useNavigate: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(() => ({ uid: 'test-uid' })),
}));

const navigate = jest.fn()

jest.mock('react-tinder-card', () => ({
    __esModule: true,
    default: ({ children }) => children,
}));

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    getDocs: jest.fn(() => ({
        docs: [
            {
                data: () => ({
                    uuid: 'test-uuid',
                    name: 'Test Tent',
                    url: 'test-url',
                }),
            },
        ],
    })),
    setDoc: jest.fn(),
    getDoc: jest.fn(() => ({
        exists: jest.fn(() => true),
        data: jest.fn(() => ({
            disliked: [],
        })),
    })),
    doc: jest.fn(),
    updateDoc: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
}));

jest.mock('../firebase', () => ({
    database: {},
    auth: {},
}));

describe('Card component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    });

    test('renders without error', async () => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
        render(<Card />);
        await waitFor(() => {
            expect(screen.getByText('Test Tent')).toBeInTheDocument();
        });
    });

    test('can swipe right', async () => {
        render(<Card />);
        await waitFor(() => {
            expect(screen.getByText('Test Tent')).toBeInTheDocument();
        });

        const rightButton = screen.getByLabelText('right-button');
        userEvent.click(rightButton);

        expect(screen.getByText('Document updated successfully.')).toBeInTheDocument();
        expect(screen.getByText('likes')).toBeInTheDocument();
        expect(screen.getByText('otherLikes')).toBeInTheDocument();
    });

    test('can swipe left', async () => {
        render(<Card />);
        await waitFor(() => {
            expect(screen.getByText('Test Tent')).toBeInTheDocument();
        });

        const leftButton = screen.getByLabelText('left-button');
        userEvent.click(leftButton);

        expect(screen.getByText('likes')).toBeInTheDocument();
        expect(screen.getByText('disliked')).toBeInTheDocument();
    });

    test('can go back', async () => {
        render(<Card />);
        await waitFor(() => {
            expect(screen.getByText('Test Tent')).toBeInTheDocument();
        });

        const backButton = screen.getByLabelText('back-button');
        userEvent.click(backButton);

        expect(screen.getByText('CurrentIndex0')).toBeInTheDocument();
    });
});