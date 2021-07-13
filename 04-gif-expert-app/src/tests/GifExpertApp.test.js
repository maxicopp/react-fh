import React from 'react';
import '@testing-library/jest-dom';
import { GifExpertApp } from '../GifExpertApp';
const { shallow } = require('enzyme');

describe('Pruebas en <GifExpertApp />', () => {

    let wrapper = shallow(<GifExpertApp />);

    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de mostrar una lista de categorías', () => {

        const categories = ['One Punch', 'Dragon Ball'];
        let wrapper = shallow(<GifExpertApp defaultCategories={categories} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('GifGrid').length).toBe(categories.length);

    });


})
