import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

const { login, logout, startLogout, startLoginEmailPassword } = require('../../actions/auth');
const { types } = require('../../types/types');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};

let store = mockStore(initState);

describe('Pruebas con las acciones de Auth', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    test('login y logout deben crear la acción respectiva', () => {
        const uid = 'ABC123';
        const displayName = 'Maximiliano';

        const loginAction = login(uid, displayName);
        const logoutAction = logout();

        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });

        expect(logoutAction).toEqual({
            type: types.logout
        });
    });

    test('debe de realizar el startLogout', async () => {
        await store.dispatch(startLogout());
        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: types.logout });
        expect(actions[1]).toEqual({ type: types.notesLogoutCleaning });
    });

    test('debe de iniciar el startLoginEmailPassword', async () => {
        await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'));
        const actions = store.getActions();

        expect(actions[1]).toEqual({
            type: types.login,
            payload: { uid: 'DvYquiJ9DlN8I7Cr1KwIgS1ug843', displayName: null }
        });
    });


});
