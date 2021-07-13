import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';

import { startChecking, startLogin, startRegister } from '../../components/actions/auth';
import { types } from '../../components/types/types';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();
let token = '';

describe('Testing in auth', () => {
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('startLogin should work correctly', async () => {
        await store.dispatch(startLogin('maximiliano@gmail.com', '123456'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: { uid: expect.any(String), name: expect.any(String) }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        token = localStorage.setItem.mock.calls[0][1];
    });

    test('wrong startLogin', async () => {
        await store.dispatch(startLogin('sarasa@gmail.com', '123456'));
        let actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Un usuario no existe con ese email', 'error');

        await store.dispatch(startLogin('maximiliano@gmail.com', '1234561'));
        actions = store.getActions();

        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Password incorrecto', 'error');
    });

    test('correct startRegister', async () => {
        fetchModule.fetchWithoutToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ABC123ABC123ABC123'
                }
            }
        }));

        await store.dispatch(startRegister('test2@test.com', '123456', 'test'));
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlos'
            }
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123ABC123ABC123');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    });

    test('correct startChecking', async () => {

        fetchModule.fetchWithToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ABC123ABC123ABC123'
                }
            }
        }));

        await store.dispatch(startChecking());
        const actions = store.getActions();
        localStorage.setItem('token', token)

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlos'
            }
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123ABC123ABC123');
    });


});
