const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const axios = require("axios");
const initialState = {
  loading: false,
  videos: {},
  error: "",
};

const getVideos = createAsyncThunk("get/getVideos", async () => {
  const response = await axios.get("http://localhost:9000/videos");
  return response.data;
});

const getVideoSlice = createSlice({
  name: "getVideos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getVideos.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.videos = action.payload;
    });

    builder.addCase(getVideos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.videos = {};
    });
  },
});

module.exports = getVideoSlice.reducer;
module.exports.getVideos = getVideos;
