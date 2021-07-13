import { authReducer } from '../../components/reducers/authReducer';
import { types } from '../../components/types/types';

const initState = {
    checking: true,
    // uid: null,
    // name: null
}

describe('Test in authReducer', () => {
    test('should work correctly', () => {
        const state = authReducer(initState, {});
        expect(state).toEqual(initState);

        const stateAuthLogin = authReducer(initState, { type: types.authLogin, payload: { uid: '123', name: 'Maxi' } });
        expect(stateAuthLogin).toEqual({ checking: false, uid: '123', name: 'Maxi' });

        const stateAuthCheckingFinish = authReducer(initState, { type: types.authCheckingFinish });
        expect(stateAuthCheckingFinish).toEqual({ checking: false });

        const stateAuthLogout = authReducer(initState, { type: types.authLogout });
        expect(stateAuthLogout).toEqual({ checking: false });
    });

});
