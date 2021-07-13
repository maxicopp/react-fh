import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import moment from 'moment';
import Swal from 'sweetalert2';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { act } from '@testing-library/react';

import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventStartUpdate, eventClearActiveEvent, eventStartAddNew } from '../../../components/actions/events';

jest.mock('../../../components/actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn()
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola mundo',
            notes: 'Algunas notas',
            start: now.toDate(),
            end: nowPlus1.toDate()
        }
    },
    auth: {
        uid: '123',
        name: 'Maximiliano'
    },
    ui: {
        modalOpen: true
    }
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarModal />
    </Provider>
);


describe('Testing in <CalendarModal />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should show the modal', () => {
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
    });

    test('should call the update and close actions', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
        expect(eventClearActiveEvent).toHaveBeenCalled();
    });

    test('should display error if title is missing', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
    });

    test('should create a new event', () => {
        const initState = {
            calendar: {
                events: [],
                activeEvent: null
            },
            auth: {
                uid: '123',
                name: 'Maximiliano'
            },
            ui: {
                modalOpen: true
            }
        };
        const store = mockStore(initState);
        store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <CalendarModal />
            </Provider>
        );

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola pruebas'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        expect(eventStartAddNew).toHaveBeenCalledWith({
            end: expect.anything(),
            notes: "",
            start: expect.anything(),
            title: "Hola pruebas"
        });
        expect(eventClearActiveEvent).toHaveBeenCalled();

    });

    test('should validate the dates', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola pruebas'
            }
        });

        const today = new Date();

        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        expect(Swal.fire).toHaveBeenCalledWith("Error", "La fecha final debe ser mayor a la fecha de inicio", "error");
    });

});
