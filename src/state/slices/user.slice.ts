import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchUser } from '../../api'
import { RootState } from '../reducers'
import User from '../../types/user'

export const getUser = createAsyncThunk('user/getUser', fetchUser)

interface UserState {
  details: Partial<User>
  isLoading: boolean
  isError: boolean
}

export const initialState: Partial<UserState> = {
  details: {
    name: null,
    height: null,
    mass: null,
    hair_color: null,
    skin_color: null,
    eye_color: null,
    birth_year: null,
    gender: null,
  },
  isLoading: false,
  isError: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.details = action.payload.data
        state.isLoading = false
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
