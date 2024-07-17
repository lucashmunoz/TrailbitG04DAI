import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./slices/movies/moviesSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userSlice from "./slices/user/userSlice";
import movieSlice from "./slices/movieDetail/movieSlice";
import homeSlice from "./slices/home/homeSlice";
import mainMovieSlice from "./slices/mainMovie/mainMovieSlice";

const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    user: userSlice.reducer,
    movie: movieSlice.reducer,
    home: homeSlice.reducer,
    mainMovie: mainMovieSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
