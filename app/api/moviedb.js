import axios from "axios";

import MOVIE_API_KEY from "../../apikey";
import { id } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";

//endpoints
const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day?api_key=${MOVIE_API_KEY}`;
const upComingMoviesEndPoint = `${apiBaseUrl}/movie/upcoming?api_key=${MOVIE_API_KEY}`;
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated?api_key=${MOVIE_API_KEY}`;

//dynamic endpoints
const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${MOVIE_API_KEY}`;
const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${MOVIE_API_KEY}`;
const similarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${MOVIE_API_KEY}`;

// person API

const personDetailsEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${MOVIE_API_KEY}`;
const personMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${MOVIE_API_KEY}`;

// functions to get images of different widthes
export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;

export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;

export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

//   fallback images
export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error:", error);
    return {};
  }
};

//exports

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndPoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upComingMoviesEndPoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndPoint);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};

export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesEndpoint(id));
};
export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoint(id));
};
export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndpoint(id));
};
