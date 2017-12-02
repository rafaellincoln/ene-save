const initialState = {
  routeName: 'home',
}

const bottomView = (state = initialState, { type, routeName }) => {
  switch (type) {
    case 'Navigation/BACK': {
      const newPrevRoutes = state.prevRoutes
      newPrevRoutes.pop()
      const lastRoute = newPrevRoutes[newPrevRoutes.length - 1]
      return {
        ...state,
        prevRoutes: newPrevRoutes,
        routeName: lastRoute,
      }
    }
    case 'Navigation/NAVIGATE': {
      const prevRoutes = state.prevRoutes || []
      return {
        ...state,
        prevRoutes: [
          ...prevRoutes,
          routeName,
        ],
        routeName,
      }
    }
    default:
      return state
  }
}

export default bottomView
