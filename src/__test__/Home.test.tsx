import React from 'react';
import {render, screen} from '@testing-library/react';
import Home from "../pages/Home";

test('Home render test', () => {

    render(<Home/>);
    const home = screen.getByTestId("home");
    expect(home).toBeInTheDocument();

});

