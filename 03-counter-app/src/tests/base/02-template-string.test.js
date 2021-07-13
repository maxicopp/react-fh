import '@testing-library/jest-dom';
const { getSaludo } = require('../../base/02-template-string');

describe('Pruebas en 02-template-string.js', () => {
    test('getSaludo debe de retornar Hola maximiliano!', () => {
        const nombre = 'Maximiliano';
        const saludo = getSaludo(nombre);

        console.log(saludo);

        expect(saludo).toBe('Hola ' + nombre + '!');
    })

    test('getSaludo debe de retornar Hola React! si no hay argumento nombre', () => {
        const saludo = getSaludo();
        expect(saludo).toBe('Hola React!')
    })
    

})