import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import App from './container/App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const history = createHistory()
const middleware = applyMiddleware(routerMiddleware(history))
const thunkApplied = applyMiddleware(thunk)

const store = createStore(
  reducer,
  middleware,
  thunkApplied
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App}/>
        <Route exact path="/best" component={App}/>
        <Route exact path="/top" component={App}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
