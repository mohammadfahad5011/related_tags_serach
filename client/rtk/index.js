const store = require("./app/store");
const {
  searchRelatedVideos,
} = require("./features/getRelatedVideos/getRelatedVideosSlice");

const { getVideos } = require("./features/getVideos/getVideoSlice");

store.subscribe(() => {
  // console.log(store.getState());
});

store.dispatch(getVideos()).then((action) => {
  const tags = action.payload.tags;
  store.dispatch(searchRelatedVideos(tags));
});
