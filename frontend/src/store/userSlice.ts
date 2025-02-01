import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
  id: string
  name: string
  email: string
  // Add other user-related fields
}

const initialState: UserState = {
  id: "",
  name: "",
  email: ""
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id
      state.name = action.payload.name
    },
    clearUser(state) {
      state.id = ""
      state.name = ""
      state.email = ""
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
