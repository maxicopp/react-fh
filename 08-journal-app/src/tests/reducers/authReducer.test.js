
import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => {

    test('debe de realizar el login', () => {
        const initState = {};
        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Maxi'
            }
        };

        const state = authReducer(initState, action);

        expect(state).toEqual({
            uid: 'abc',
            name: 'Maxi'
        });

    });

    test('debe de realizar el logout', () => {
        const initState = {
            uid: 'safsafasfaf1312',
            name: 'Maximiliano'
        };
        const action = {
            type: types.logout
        };

        const state = authReducer(initState, action);

        expect(state).toEqual({});

    });

    test('no debe hacer cambios en el state', () => {
        const initState = {
            uid: 'safsafasfaf1312',
            name: 'Maximiliano'
        };
        const action = {
            type: 'kanlndsa'
        };

        const state = authReducer(initState, action);

        expect(state).toEqual(initState);

    });



});
