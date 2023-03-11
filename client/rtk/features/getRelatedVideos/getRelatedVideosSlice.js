const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const axios = require("axios");
const initialState = {
  loading: false,
  relatedVideos: [],
  error: "",
};
const searchRelatedVideos = createAsyncThunk(
  "get/searchRelatedVideos",
  async (tags) => {
    const response = await axios.get(
      `http://localhost:9000/videos?tags_like=${tags.join("&tags_like=")}`
    );

    // ==============sort by views=================
    const videos = response.data;
    const sortedVideos = [...videos].sort((a, b) => {
      return parseFloat(b.views) - parseFloat(a.views);
    });

    return sortedVideos;
  }
);

const getRelatedVideoSlice = createSlice({
  name: "getRelatedVideos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(searchRelatedVideos.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(searchRelatedVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.relatedVideos = action.payload; // store sorted videos in state
    });

    builder.addCase(searchRelatedVideos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.relatedVideos = [];
    });
  },
});

module.exports = getRelatedVideoSlice.reducer;
module.exports.searchRelatedVideos = searchRelatedVideos;
