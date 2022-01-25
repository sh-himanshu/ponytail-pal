import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { format, parseJSON } from "date-fns";
import * as api from "../../api";
import { TLegend } from "../../components/legend-code";

export interface PostState {
  [key: string]: {
    media?: string;
    text: string;
    typeofday: Array<keyof TLegend> | null;
    rating: 0 | 1 | 2 | 3 | 4 | 5;
  };
}

const parsePosts = (posts: api.Post[]): PostState =>
  posts.reduce(
    (final, { calendardatetime, media, text, rating, typeofday }) => {
      return {
        ...final,
        [format(parseJSON(calendardatetime), "dd-MM-yyyy")]: {
          media: media ? media[0].mediaurl : undefined,
          text,
          rating,
          typeofday,
        },
      };
    },
    {}
  );

interface fetchPostsParams {
  token: api.Token | null;
  setHasMorePosts: React.Dispatch<React.SetStateAction<boolean>>;
}

export const fetchPosts = createAsyncThunk(
  "posts/FETCH",
  async ({ token = null, setHasMorePosts }: fetchPostsParams, thunkAPI) => {
    try {
      const resp = await api.fetchPosts(token);

      if (resp.status === 200) {
        if (resp.data.responseobjects[0].continuationtoken === null)
          setHasMorePosts(false);
        return parsePosts(resp.data.responseobjects[0].posts);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: PostState = {};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      if (payload) return { ...state, ...payload };
    });
  },
});

export default postsSlice.reducer;
