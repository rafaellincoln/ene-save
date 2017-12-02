import React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './muiTheme'
import store from './state/store'
import routes from './router'
import RenderRoutes from './components/RenderRoutes/RenderRoutes'

// Dependência do Material-UI
injectTapEventPlugin()
// Forma que o React Router controla as URLs pelo History do Navegador
const history = createBrowserHistory()

render((
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider muiTheme={muiTheme.muiTheme}>
        <div className="Grid">
          <RenderRoutes routes={routes} />
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>
), document.getElementById('root'))
