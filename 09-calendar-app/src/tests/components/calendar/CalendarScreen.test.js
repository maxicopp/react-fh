import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';

import '@testing-library/jest-dom';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../components/types/types';
import { eventSetActive } from '../../../components/actions/events';

jest.mock('../../../components/actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    calendar: {
        events: []
    },
    auth: {
        uid: '123',
        name: 'Maximiliano'
    },
    ui: {
        modalOpen: false
    }
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen />
    </Provider>
)

describe('Testing in <CalendarScreen />', () => {

    test('should be displayed correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('tests with calendar interactions', () => {

        const calendar = wrapper.find('Calendar');
        const calendarMessages = calendar.prop('messages');

        expect(calendarMessages).toEqual(messages)

        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenLastCalledWith({ type: types.uiOpenModal });

        calendar.prop('onSelectEvent')({ start: 1 });
        expect(eventSetActive).toHaveBeenLastCalledWith({ start: 1 });

        act(() => {
            calendar.prop('onView')('week');
            expect(localStorage.setItem).toHaveBeenLastCalledWith('lastView', 'week');
        });
    });


});
