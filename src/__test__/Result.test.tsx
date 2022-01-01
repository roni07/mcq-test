import React from 'react';
import {Router} from "react-router-dom";
import {render, screen} from '@testing-library/react';
import Exam from "../pages/Exam";
import {createMemoryHistory} from "history";
import Result from "../pages/Result";

test('Exam render test', () => {

    const history = createMemoryHistory();

    history.push("/result", {});

    render(
        <Router history={history}>
            <Result/>
        </Router>
    );
    const result = screen.getByTestId("result");
    expect(result).toBeInTheDocument();

});

