import React from 'react';
import { types } from '../../../types/types';
const { mount } = require('enzyme');
const { AuthContext } = require('../../../auth/AuthContext');
const { LoginScreen } = require('../../../components/login/LoginScreen');

describe('Pruebas en <LoginScreen />', () => {

    const history = {
        replace: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <LoginScreen history={history} />
        </AuthContext.Provider>
    );

    test('debe de mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();

    });

    test('debe de realizar el dispatch y la navegación', () => {

        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Maximiliano'
            }
        });

        expect(history.replace).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath', '/dc');
        handleClick();
        expect(history.replace).toHaveBeenCalledWith('/dc');

    });

});
