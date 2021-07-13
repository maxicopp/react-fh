const { getGifs } = require('../../helpers/getGifs');

describe('Pruebas con getGifs Fetch', () => {

    test('debe de traer 10 elementos', async () => {

        const gifs = await getGifs('test');
        expect(gifs.length).toBe(10);

    });

    test('debe de traer 0 elementos', async () => {

        const gifs = await getGifs('');

        expect(gifs.length).toBe(0);

    });


})
