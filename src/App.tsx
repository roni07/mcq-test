import React, {lazy, Suspense} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Exam = lazy(() => import("./pages/Exam"));
const Result = lazy(() => import("./pages/Result"));

const App: React.FC = () => {
    return (
        <div className="App" data-testid="app">
            <Suspense fallback={<p>Loading...</p>}>
                <BrowserRouter>
                    <Switch>
                        <Route path={"/"} exact={true} component={Home}/>
                        <Route path={"/exam"} exact={true} component={Exam}/>
                        <Route path={"/result"} exact={true} component={Result}/>
                    </Switch>
                </BrowserRouter>
            </Suspense>
        </div>
    );
}

export default App;
