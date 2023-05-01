import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const detailList = createAsyncThunk(
  "users/detail",
  async (param, { rejectWithValue }) => {
    const a = param.senderEmail.replace("@", "");
    const sender = a?.replace(".", "");

    const b = param.receiverEmail.replace("@", "");
    const receiver = b?.replace(".", "");

    try {
      const res = await axios.post(
        `https://react-authentication-99d1c-default-rtdb.firebaseio.com/messages/${sender}/sent.json`,
        {
          receiverEmail: param.receiverEmail,
          senderEmail: param.senderEmail,
          subject: param.subject,
          message: param.message,
          markAsRead: param.markAsRead,
          createdAt: Date.now(),
        }
      );
      const response = await axios.post(
        `https://react-authentication-99d1c-default-rtdb.firebaseio.com/messages/${receiver}/inbox.json`,
        {
          receiverEmail: param.receiverEmail,
          senderEmail: param.senderEmail,
          subject: param.subject,
          message: param.message,
          markAsRead: param.markAsRead,
          createdAt: Date.now(),
        }
      );
      param.history.replace("/inbox");
    } catch (error) {
      alert("Detail List fetched unsuccessful");
      return error;
    }
  }
);

export const inboxDetail = createAsyncThunk(
  "users/inboxDetail",
  async (emailId) => {
    const a = emailId.replace("@", "");
    const email = a?.replace(".", "");

    try {
      const response = await axios.get(
        `https://react-authentication-99d1c-default-rtdb.firebaseio.com/messages/${email}/inbox.json`
      );
      console.log(response.data);
      const finalData = [];
      const objKeys = Object.keys(response.data === null ? {} : response.data);
      objKeys.forEach((keys) => {
        const objElement = response.data[keys];
        objElement.id = keys;
        finalData.push(objElement);
      });
      const newData = finalData.filter(
        (item) => item.receiverEmail === emailId
      );
      return newData;
    } catch (error) {
      alert("Details fetched unsuccessful");
      return error;
    }
  }
);

export const sentDetail = createAsyncThunk(
  "users/sentDetail",
  async (emailId) => {
    const a = emailId.replace("@", "");
    const email = a?.replace(".", "");
    try {
      const response = await axios.get(
        `https://react-authentication-99d1c-default-rtdb.firebaseio.com/messages/${email}/sent.json`
      );
      console.log(response.data);
      const finalData = [];
      const objKeys = Object.keys(response.data === null ? {} : response.data);
      objKeys.forEach((keys) => {
        const objElement = response.data[keys];
        objElement.id = keys;
        finalData.push(objElement);
      });
      const newData = finalData.filter((item) => item.senderEmail === emailId);
      return newData;
    } catch (error) {
      alert("Details fetched unsuccessful");
      return error;
    }
  }
);

export const deleteDetail = createAsyncThunk(
  "users/deleteDetail",
  async (param, { rejectWithValue }) => {
    const a = param.email.replace("@", "");
    const email = a?.replace(".", "");

    const messageType = param.type === "inbox" ? "inbox" : "sent";

    try {
      const response = await axios.delete(
        `https://react-authentication-99d1c-default-rtdb.firebaseio.com/messages/${email}/${messageType}/${param.id}.json`
      );
      console.log(response.data);
      param.dispatch(param.fn(param.email));
    } catch (error) {
      alert("Expense List fetched unsuccessful");
      return error;
    }
  }
);

export const updateDetail = createAsyncThunk(
  "user/updateDetail",
  async (param, { rejectWithValue }) => {
    try {
      const b = param.receiverEmail.replace("@", "");
      const receiver = b?.replace(".", "");

      const response = await axios.put(
        `https://react-authentication-99d1c-default-rtdb.firebaseio.com/messages/${receiver}/inbox/${param.id}.json`,
        {
          receiverEmail: param.receiverEmail,
          senderEmail: param.senderEmail,
          subject: param.subject,
          message: param.message,
          markAsRead: true,
          createdAt: Date.now()
        }
      );
      console.log(response.data);
    } catch (error) {
      alert("Details update unsuccessful");
      return error;
    }
  }
);

const initialDetailState = {
  isLoading: false,
  inboxList: [],
  sentList: [],
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
      state.inboxList = action.payload;
      state.error = false;
    });
    builder.addCase(detailList.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(inboxDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(inboxDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.inboxList = action.payload;
      state.error = false;
    });
    builder.addCase(inboxDetail.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(sentDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sentDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sentList = action.payload;
      state.error = false;
    });
    builder.addCase(sentDetail.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default detailSlice.reducer;
