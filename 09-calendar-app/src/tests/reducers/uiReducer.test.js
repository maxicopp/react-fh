import { uiCloseModal, uiOpenModal } from '../../components/actions/ui';
import { uiReducer } from '../../components/reducers/uiReducer';

const initState = {
    modalOpen: false
};

describe('Testing in uiReducer', () => {
    test('should return the default state', () => {
        const state = uiReducer(initState, {});

        expect(state).toEqual(initState);
    });

    test('should open and close the modal', () => {
        const modalOpen = uiOpenModal();
        const state = uiReducer(initState, modalOpen);

        expect(state).toEqual({ modalOpen: true });

        const modalClose = uiCloseModal();
        const stateClose = uiReducer(initState, modalClose);

        expect(stateClose).toEqual(initState);

    });


});
