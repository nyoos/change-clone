import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn } from "../../api";
import { checkSignedInUser, signOut, signUp } from "../../api/user";

export const signInHandler = createAsyncThunk(
  "user/signIn",
  async ({ email, password }) => {
    const response = await signIn(email, password);
    return response;
  }
);

export const signOutHandler = createAsyncThunk("user/signOut", async () => {
  const response = await signOut();
  return response;
});

export const initializeSignedInHandler = createAsyncThunk(
  "user/initializeSignedIn",
  async () => {
    const response = await checkSignedInUser();
    if (response !== false) {
      return response;
    } else return 0;
  }
);

export const signUpHandler = createAsyncThunk(
  "user/signUp",
  async ({ email, password, username, description, profileImage }) => {
    const response = await signUp(
      email,
      password,
      username,
      description,
      profileImage
    );
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
    error: {
      login: null,
      signup: null,
    },
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
      state.error.login = null;
    },
    [signInHandler.fulfilled]: (state, action) => {
      state.status = "hasUser";
      state.data.uid = action.payload;
      state.error.login = null;
    },
    [signInHandler.rejected]: (state, action) => {
      state.status = "failed";
      console.log(action.error.message);
      state.error.login = action.error.message;
    },
    [signOutHandler.pending]: (state, action) => {
      state.status = "loading";
      state.error.login = null;
    },
    [signOutHandler.fulfilled]: (state, action) => {
      state.status = "noUser";
      state.data.uid = 0;
      state.error.login = null;
    },
    [signOutHandler.rejected]: (state, action) => {
      state.status = "failed";
    },
    [initializeSignedInHandler.pending]: (state, action) => {
      state.status = "loading";
      state.error.login = null;
    },
    [initializeSignedInHandler.fulfilled]: (state, action) => {
      if (action.payload === 0) {
        state.status = "noUser";
        state.data.uid = 0;
      } else {
        state.status = "hasUser";
        state.data.uid = action.payload;
      }
    },
    [initializeSignedInHandler.rejected]: (state, action) => {
      state.status = "failed";
    },
    [signUpHandler.pending]: (state, action) => {
      state.status = "loading";
      state.error.signup = null;
    },
    [signUpHandler.fulfilled]: (state, action) => {
      state.status = "hasUser";
      state.data.uid = action.payload;
      state.error.signup = null;
    },
    [signUpHandler.rejected]: (state, action) => {
      state.status = "failed";
      state.error.signup = action.error.message;
    },
  },
});

export const { loggedIn, loggedOut } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state) => state.user;
