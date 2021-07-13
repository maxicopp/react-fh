import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';

describe('Testing in Fetch helper', () => {
    let token = '';

    test('fetchWithoutToken should work correctly', async () => {
        const resp = await fetchWithoutToken('auth', { email: 'maximiliano@gmail.com', password: '123456' }, 'POST');
        const body = await resp.json();

        expect(resp instanceof Response).toBe(true);
        expect(body.ok).toBe(true);

        token = body.token;
    });

    test('fetchWithToken should work correctly', async () => {
        localStorage.setItem('token', token);
        const resp = await fetchWithToken('events/602052b03e0b3d10c14e83c2', {}, 'DELETE');
        const body = await resp.json();

        expect(body.msg).toBe('Evento no existe por ese id');
    });

});
