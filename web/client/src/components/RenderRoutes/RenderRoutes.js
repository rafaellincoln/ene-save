import React from 'react'
import PropTypes from 'prop-types'
import {
  Route,
} from 'react-router-dom'

const RenderRoutes = props => (
  <div className="Grid-cell">
    {props.routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        component={route.main || route.component}
      />
    ))}
  </div>
)

RenderRoutes.propTypes = {
  routes: PropTypes.array,
}

export default RenderRoutes
