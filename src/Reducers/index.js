import { combineReducers } from "redux";
const InitialMoviesState = {
  MovieList: [],
  FavList: [],
  ButtonToggler: false,
};

export function moviesStore(state = InitialMoviesState, action) {
  switch (action.type) {
    case "ADD_MOVIES":
      return { ...state, MovieList: action.movies };

    case "ADD_TO_FAV":
      return { ...state, FavList: [action.specificMovie, ...state.FavList] };

    case "REMOVE_FROM_FAV":
      const FilteredArray = state.FavList.filter(
        (movie) => movie.Title !== action.specificMovie.Title
      );
      return {
        ...state,
        FavList: FilteredArray,
      };

    case "FAV_TOGGLE":
      return {
        ...state,
        ButtonToggler: action.value,
      };

    case "ADD_MOVIE_TO_LIST":
      //   console.log("movie", action.movieToAdd);
      return {
        ...state,
        MovieList: [action.movieToAdd, ...state.MovieList],
      };

    default:
      return state;
  }
}

const initialSearchState = {
  searchResult: [],
};
export function searchStore(state = initialSearchState, action) {
  switch (action.type) {
    case "ADD_SEARCH_RESULT":
      return {
        ...state,
        searchResult: action.SearchArray,
      };

    default:
      return state;
  }
}

export default combineReducers({
  moviesStore,
  searchStore,
});

//     if(action.type === 'ADD_MOVIES' ) {
//          return {
//              ...state , MovieList : action.movies}
//             }else if(action.type === 'ADD_TO_FAV'){
//                 return {
//                     ...state , FavList : [action.specificMovie , ...state.FavList]
//                 }
//             }else if(action.type === 'REMOVE_FROM_FAV') {
//                 const FilteredArray = InitialState.FavList.filter((movie) => movie.Title !== action.movie.Title)
//                 return {
//                     ...state , FavList : FilteredArray
//                 }
//             }else if(action.type === 'FAV_TOGGLE'){
//                 return {
//                     ...state , ButtonToggler :action.value
//                 }
//             }
//     return state
// }
