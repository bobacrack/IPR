// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest-extended';

global.matchMedia = global.matchMedia || function () {
    return {
        addListener: jest.fn(),
        removeListener: jest.fn(),
    }
}


const config = {
    verbose: true,
};

module.exports = config;