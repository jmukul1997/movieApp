export function fetchingAPIforSearch(movie) {
  const url = `https://www.omdbapi.com/?apikey={your_api_key}&s=${movie}`;

  return function (dispatch) {
    fetch(url)
      .then((response) => response.json())
      .then((movieArray) => {
        // console.log(movieArray.Search);
        var SearchArray = movieArray.Search;
        dispatch({
          type: "ADD_SEARCH_RESULT",
          SearchArray,
        });
      });
  };
}

// here  to dis[atch aaction we need Redux ]
