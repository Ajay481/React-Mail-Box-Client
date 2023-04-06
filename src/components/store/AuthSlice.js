import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUsers = createAsyncThunk(
  "user/login",
  async (param, { rejectWithValue }) => {
    try {
      const response = await axios.post(param.url, {
        email: param.email,
        password: param.password,
        returnSecureToken: true,
      });
      localStorage.setItem("token", response.data.idToken);
      console.log(response.data);
      return response.data;
    } catch (error) {
      alert("Authentication failed");
      return rejectWithValue(error);
    }
  }
);

const initialAuthState = {
  isLoading: false,
  token: "",
  userId: "",
  error: "",
  isLoggedIn: false
};

const AuthSlice = createSlice({
  name: "Authentication",
  initialState: initialAuthState,
  extraReducers: (builder) => {
    builder.addCase(loginUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.idToken;
      state.userId = action.payload.email;
      state.error = "";
      state.isLoggedIn = true
    });
    builder.addCase(loginUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.token = "";
      state.userId = "";
      state.error = action.error.message;
    });
  },
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;
