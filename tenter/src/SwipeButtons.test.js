import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SwipeButtons from './SwipeButtons';

describe('SwipeButtons component', () => {
    test('renders swipe buttons', () => {
        render(<SwipeButtons />);

        const repeatButton = screen.getByTestId('swipe-button-repeat');
        const leftButton = screen.getByTestId('swipe-button-left');
        const starButton = screen.getByTestId('swipe-button-star');
        const rightButton = screen.getByTestId('swipe-button-right');
        const lightningButton = screen.getByTestId('swipe-button-lightning');

        expect(repeatButton).toBeInTheDocument();
        expect(leftButton).toBeInTheDocument();
        expect(starButton).toBeInTheDocument();
        expect(rightButton).toBeInTheDocument();
        expect(lightningButton).toBeInTheDocument();
    });
});