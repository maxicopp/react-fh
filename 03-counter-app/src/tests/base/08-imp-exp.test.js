const { getHeroeById, getHeroesByOwner } = require("../../base/08-imp-exp");
const { default: heroes } = require("../../data/heroes");

describe('Pruebas en funciones de Héroes', () => {
    test('debe de retornar un héroe por id', () => {
        const id = 1;
        const heroe = getHeroeById(id);
        const heroeData = heroes.find(h => h.id === id);

        expect(heroe).toEqual(heroeData);

    });

    test('debe de retornar undefined si héroe no existe', () => {
        const id = 10;
        const heroe = getHeroeById(id);

        expect(heroe).toBe(undefined);

    });

    // debe de retornar un arreglo con los héroes de DC 
    // owner 
    // toEqual al arreglo filtrado 
    test('debe de retornar un arreglo con los héroes de DC', () => {
        const heroesDC = getHeroesByOwner('DC');
        const heroesData = heroes.filter(h => h.owner === 'DC');

        expect(heroesDC).toEqual(heroesData);
    })

    // debe de retornar un arreglo con los héroes de Marvel 
    // length = 2 // to be 
    test('debe de retornar un arreglo con los héroes de Marvel', () => {
        const owner = 'Marvel';
        const heroes = getHeroesByOwner(owner);
        expect(heroes.length).toBe(2);
    })


})
