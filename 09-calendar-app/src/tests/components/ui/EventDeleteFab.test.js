import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { EventDeleteFab } from '../../../components/ui/EventDeleteFab';
import { eventStartDelete } from '../../../components/actions/events';

jest.mock('../../../components/actions/events', () => ({
    eventStartDelete: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <EventDeleteFab />
    </Provider>
)

describe('Test in <EventDeleteFab />', () => {
    test('should be displayed correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should call the eventStartDelete when clicking', () => {
        wrapper.find('button').prop('onClick')();
        expect(eventStartDelete).toHaveBeenCalled();
    });


});
