import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { AppRouter } from '../../../components/router/AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// store.dispatch = jest.fn();

describe('Testing in <AppRouter />', () => {
    test('should show the loading screen', () => {
        const initState = {
            auth: {
                checking: true
            }
        };
        const store = mockStore(initState);
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should show the public route', () => {
        const initState = {
            auth: {
                checking: false,
                uid: null
            }
        };
        const store = mockStore(initState);
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login-container').exists()).toBe(true);
    });

    test('should show the private route', () => {
        const initState = {
            ui: {
                modalOpen: false
            },
            calendar: {
                events: []
            },
            auth: {
                checking: false,
                uid: '123',
                name: 'Maximiliano'
            }
        };
        const store = mockStore(initState);
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.calendar-screen').exists()).toBe(true);
    });

});
