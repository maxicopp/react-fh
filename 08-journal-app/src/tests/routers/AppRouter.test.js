import React from 'react';
import { MemoryRouter } from 'react-router-dom'
const { mount } = require('enzyme');
const { Provider } = require('react-redux');

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { firebase } from '../../firebase/firebase-config';
import { act } from 'react-dom/test-utils';

jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'ABC'
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {
    test('debe de llamar el login si estoy autenticado', async () => {
        let user;

        await act(async () => {
            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCred.user;

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        });

        expect(login).toHaveBeenCalledWith('DvYquiJ9DlN8I7Cr1KwIgS1ug843', null);

    });



});
