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
      param.history.replace("/inbox");
    } catch (error) {
      alert("Detail List fetched unsuccessful");
      return error;
    }
  }
);

export const fetchDetail = createAsyncThunk("users/fetchDetail", async () => {
  try {
    const response = await axios.get(
      "https://react-authentication-99d1c-default-rtdb.firebaseio.com/details.json"
    );
    console.log(response.data);
    const finalData = [];
    const objKeys = Object.keys(response.data === null ? {} : response.data);
    objKeys.forEach((keys) => {
      const objElement = response.data[keys];
      objElement.id = keys;
      finalData.push(objElement);
    });
    return finalData;
  } catch (error) {
    alert("Details fetched unsuccessful");
    return error;
  }
});

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
    builder.addCase(fetchDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.detailList = action.payload;
      state.error = false;
    });
    builder.addCase(fetchDetail.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default detailSlice.reducer;
