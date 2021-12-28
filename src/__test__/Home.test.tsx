import React from 'react';
import {render, screen} from '@testing-library/react';
import Home from "../pages/Home";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));

test('Home render test', () => {

    render(<Home/>);
    const home = screen.getByTestId("home");
    expect(home).toBeInTheDocument();

});

