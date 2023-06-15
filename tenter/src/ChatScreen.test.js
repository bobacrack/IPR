import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatScreen from './ChatScreen';


// Mock für Firebase-Abhängigkeiten
jest.mock('./firebase', () => {
    const firestore = {
        collection: jest.fn(),
        addDoc: jest.fn(),
        serverTimestamp: jest.fn(),
    };

    const auth = {
        onAuthStateChanged: jest.fn(),
    };

    return {
        database: {
            collection: firestore.collection,
        },
        auth: {
            onAuthStateChanged: auth.onAuthStateChanged,
        },
        collection: firestore.collection,
        addDoc: firestore.addDoc,
        serverTimestamp: firestore.serverTimestamp,
    };
});

// Mock für useParams
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

describe('ChatScreen', () => {
    test('Überprüfen, ob das Eingabefeld und der Senden-Button vorhanden sind', () => {
        // Mock für useParams
        jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ receiverInfo: 'HvAwPg4zglVvXiaom6hZd1JLO1G2' });

        // Rendern der Komponente mit Testdaten
        render(
            <Router>
                <Routes>
                    <Route path="/chat/:receiverInfo" element={<ChatScreen />} />

                </Routes>
            </Router>
        );

        // Eingabefeld und Senden-Button finden
        const inputField = screen.getByTestId('inputText');
        const sendButton = screen.getByTestId('sendButton');

        // Überprüfen, ob das Eingabefeld und der Senden-Button vorhanden sind
        expect(inputField).toBeInTheDocument();
        expect(sendButton).toBeInTheDocument();
    });

    test('Überprüfen, ob die Nachricht gesendet wird, wenn der Senden-Button geklickt wird', async () => {
        jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ receiverInfo: 'TestReceiver' });

        // Rendern der Komponente mit Testdaten
        render(
            <Router>
                <Routes>
                    <Route path="/chat/:receiverInfo" element={<ChatScreen />} />

                </Routes>
            </Router>
        );
        const inputField = screen.getByTestId('inputText');
        const sendButton = screen.getByTestId('sendButton');

        // Nachricht in das Eingabefeld eingeben und Senden-Button klicken
        fireEvent.change(inputField, { target: { value: 'Test Message' } });
        fireEvent.click(sendButton);

        // Überprüfen, ob die Nachricht gesendet wurde
        await waitFor(() => {
            expect(screen.getByText(/Test Message/i)).toBeInTheDocument();
        });
    });

    test('Überprüfen, ob das Eingabefeld nach dem Senden der Nachricht zurückgesetzt wird', () => {
        jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ receiverInfo: 'TestReceiver' });

        // Rendern der Komponente mit Testdaten
        render(
            <Router>
                <Routes>
                    <Route path="/chat/:receiverInfo" element={<ChatScreen />} />

                </Routes>
            </Router>
        );

        const inputField = screen.getByTestId('inputText');
        const sendButton = screen.getByTestId('sendButton');

        // Nachricht in das Eingabefeld eingeben und Senden-Button klicken
        fireEvent.change(inputField, { target: { value: 'Test Message' } });
        fireEvent.click(sendButton);

        // Überprüfen, ob das Eingabefeld zurückgesetzt wurde
        expect(inputField).toHaveValue('');
    });
});
