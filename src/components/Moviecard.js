import React, { Component } from "react";

export default class Moviecard extends Component {
  addToFav = (movie) => {
    this.props.dispatch({
      type: "ADD_TO_FAV",
      specificMovie: movie,
    });
  };

  removeFromFav = (movie) => {
    this.props.dispatch({
      type: "REMOVE_FROM_FAV",
      specificMovie: movie,
    });
  };

  render() {
    const { dispatch } = this.props;
    const checkMovieFav = this.props.checkMovieFav;
    const { Title, Plot, imdbRating, Poster } = this.props.movie;
    return (
      <div className="w-[40%] text-white bg-gray-800  mx-auto flex items-center mt-16  p-3">
        <img src={Poster} className="max-w-48 h-48 bg-red-100" alt="" />

        <div className="ml-8 w-full">
          <p className="text-xl">{Title}</p>

          <p>{Plot}</p>

          <div className="flex items-center justify-between mt-6">
            <p>{imdbRating}</p>

            {checkMovieFav ? (
              <button
                className="px-8 py-2 bg-red-600 text-white focus:outline-none shadow-lg rounded"
                onClick={() => {
                  this.addToFav(this.props.movie);
                }}
              >
                Favourite
              </button>
            ) : (
              <button
                className="px-8 py-2 bg-green-800 text-white focus:outline-none shadow-lg rounded"
                onClick={() => {
                  this.removeFromFav(this.props.movie);
                }}
              >
                UnFavourite
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
