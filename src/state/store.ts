import { createStore, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

export const store: Store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk)),
)
