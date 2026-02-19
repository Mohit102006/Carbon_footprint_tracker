import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profileImg: '/profile.png' // default image
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileImage: (state, action) => {
      state.profileImg = action.payload
    }
  }
})

export const { setProfileImage } = profileSlice.actions
export default profileSlice.reducer
