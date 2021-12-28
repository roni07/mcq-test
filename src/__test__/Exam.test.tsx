import React from 'react';
import {render, screen} from '@testing-library/react';
import Exam from "../pages/Exam";

const originalModule = jest.requireActual('react-router-dom');

// const mockedUsedNavigate = jest.fn();
//
// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom') as any,
//     useNavigate: () => mockedUsedNavigate,
// }));

module.exports = {
    __esModule: true,
    ...originalModule,
    useLocation: jest.fn().mockReturnValue({ pathname: '/exam'}),
    useNavigate: jest.fn()
}


test('Exam render test', () => {

    render(<Exam/>);
    const exam = screen.getByTestId("exam");
    expect(exam).toBeInTheDocument();

});

