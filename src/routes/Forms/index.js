import { injectReducer } from '../../store/reducers'
import requireAuth from '../Login/utils'

export default (store) => ({
  path: 'formtype/:formname',
  getComponent(nextState, next) {

    require.ensure(
      [
        './components/Forms',
      ],
      (require) => {
        const Form = require('./components/Forms').default
        next(null, Form)
      },
      'formtype',
    )
  },
})
