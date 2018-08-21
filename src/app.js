import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Index from './index'

ReactDOM.render(
    <BrowserRouter >
        <div className="job" >
            <Switch>
                <Route path="/" component={Index} />
                <Route path="/aaa" component={Index} />
                <Route path="aaa" component={Index} />
            </Switch>
        </div>
    </BrowserRouter>, 
document.getElementById('root'));