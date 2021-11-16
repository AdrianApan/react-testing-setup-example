import { combineReducers } from 'redux'

import { TypedUseSelectorHook, useSelector } from 'react-redux'

import userSlice from '../slices/user.slice'

const rootReducer = combineReducers({
  user: userSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default rootReducer
