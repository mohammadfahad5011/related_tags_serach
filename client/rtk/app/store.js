// const getReducer = require("../features/get/getSlice");
// const getTagsReducer = require("../features/get/getTagsSlice");

const configureStore = require("@reduxjs/toolkit").configureStore;
const { createLogger } = require("redux-logger");
const getVideos = require("../features/getVideos/getVideoSlice");
const getRelatedVideo = require("../features/getRelatedVideos/getRelatedVideosSlice");

const logger = createLogger();

// configure store
const store = configureStore({
  reducer: {
    getVideo: getVideos,
    getRelatedVideo: getRelatedVideo,
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(logger),
});

module.exports = store;

// ====================================
