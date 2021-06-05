import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn } from "../../api";

export const signInHandler = createAsyncThunk(
  "user/signIn",
  async ({ email, password }) => {
    const response = await signIn(email, password);
    console.log(response);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      uid: 0,
    },
    //status: "noUser" | "loading" | "hasUser"
    status: "noUser",
    error: null,
  },
  reducers: {
    loggedIn: {
      reducer(state, action) {
        state.user.uid = action.payload;
        state.user.status = "hasUser";
      },
      loggedOut: {
        reducer(state, action) {
          state.user.uid = 0;
          state.user.status = "noUser";
        },
      },
    },
  },
  extraReducers: {
    [signInHandler.pending]: (state, action) => {
      state.status = "loading";
    },
    [signInHandler.fulfilled]: (state, action) => {
      state.status = "hasUser";
      state.data.uid = action.payload;
    },
    [signInHandler.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { loggedIn, loggedOut } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state) => state.user;
