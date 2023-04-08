import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const detailList = createAsyncThunk(
  "users/detail",
  async (param, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://react-authentication-99d1c-default-rtdb.firebaseio.com/details.json",
        {
          receiverEmail: param.receiverEmail,
          senderEmail: param.senderEmail,
          subject: param.subject,
          message: param.message,
        }
      );
      console.log(response.data);
    } catch (error) {
      alert("Detail List fetched unsuccessful");
      return error;
    }
  }
);

const initialDetailState = {
  isLoading: false,
  detailList: [],
  error: false,
};

const detailSlice = createSlice({
  name: "detail",
  initialState: initialDetailState,
  extraReducers: (builder) => {
    builder.addCase(detailList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(detailList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.detailList = action.payload;
      state.error = false;
    });
    builder.addCase(detailList.rejected, (state) => {
      state.error = true;
    });
  },
});

export default detailSlice.reducer;
