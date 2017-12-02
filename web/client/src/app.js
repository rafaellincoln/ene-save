import React from 'react'
import {
  Router,
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './state/store'
import RenderRoutes from './components/RenderRoutes/RenderRoutes'
import routes from './router'

// Forma que o React Router controla as URLs pelo History do Navegador
const history = createBrowserHistory()

render((
  <Provider store={store}>
    <Router history={history}>
      <div className="Grid">
        <RenderRoutes routes={routes} />
      </div>
    </Router>
  </Provider>
), document.getElementById('root'))
