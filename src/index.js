import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.scss'
import CreateAccount from './page/CreateAccount/CreateAccount'
import  { Provider } from 'react-redux' 
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducers from './reducers'


const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);

const store = createStore(rootReducers, enhancer);


ReactDOM.render(
    <Provider store={store} >
        <BrowserRouter >
            <Switch>
                <Route path="/" component={CreateAccount} />
            </Switch>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);
