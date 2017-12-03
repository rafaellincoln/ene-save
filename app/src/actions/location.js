import Location from '../service/Location'

export const updateLocation = payload => (
  (dispatch, state) => {
    const data = {
      userId: state().user.userId,
      location: payload,
    }
    Location
      .updateLocation(data)
      .then(() => {
        console.log('Localização atualizada...')
      })
      .catch(err => console.log(err))
  }
)
