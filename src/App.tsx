import React, {lazy, Suspense} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Exam = lazy(() => import("./pages/Exam"));
const Result = lazy(() => import("./pages/Result"));

const App: React.FC = () => {
    return (
        <div className="App" data-testid="app">
            <Suspense fallback={<p>Loading...</p>}>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/exam"} element={<Exam/>}/>
                        <Route path={"/result"} element={<Result/>}/>
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </div>
    );
}

export default App;
