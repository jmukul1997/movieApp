import { Component } from "react";
import Moviecard from "./components/Moviecard";
import Navbar from "./components/Navbar";
import { data } from "./data";
import { StoreContext } from "./index";
// import { connect } from "./index";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "ADD_MOVIES",
      movies: data,
    });
  }

  // if button is T/F then
  toggleFav = (value) => {
    this.props.dispatch({
      type: "FAV_TOGGLE",
      value: value,
    });
  };

  // if movie is FAV change the button
  checkMovieFav = (movie) => {
    const favArray = this.props.movies.FavList;
    // console.log('favArray', favArray);
    const index = favArray.indexOf(movie);
    if (index === -1) {
      return true;
    } else {
      return false;
    }
  };

  // check WHAT TO DISPLAY
  checkButtonToggle = () => {
    const { ButtonToggler, FavList, MovieList } = this.props.movies;
    const WhatToDisplay = ButtonToggler ? FavList : MovieList;
    return WhatToDisplay;
  };

  render() {
    console.log("PROPS", this.props);

    const { ButtonToggler, FavList, MovieList } = this.props.movies;
    // const WhatToDisplay = ButtonToggler ?  FavList : MovieList
    return (
      <div className="App bg-black ">
        {/* navbar  */}
        <Navbar />

        {/* two buttons */}
        <div className="w-[20%] mx-auto flex">
          <button
            className={`px-8 py-2 bg-yellow-400 hover:bg-yellow-600 focus:outline-none shadow-lg rounded ${
              ButtonToggler ? "" : "bg-yellow-600"
            }`}
            onClick={() => this.toggleFav(false)}
          >
            Movies
          </button>

          <button
            className={`px-8 py-2 bg-yellow-400  hover:bg-yellow-600 ml-4 focus:outline-none shadow-lg rounded ${
              ButtonToggler ? "bg-yellow-600" : ""
            }`}
            onClick={() => this.toggleFav(true)}
          >
            Favourites
          </button>
        </div>

        {/* Movie Card */}
        {/* {this.checkButtonToggle ? console.log('>>') : null} */}

        {this.checkButtonToggle().map((eachMovie, index) => {
          return (
            <Moviecard
              checkMovieFav={this.checkMovieFav(eachMovie)}
              movie={eachMovie}
              key={`movies-${index}`}
              dispatch={this.props.dispatch}
            />
          );
        })}
        {this.checkButtonToggle().length === 0 ? (
          <div className="w-[60%] mt-8 text-3xl mx-auto h-screen bg-black">
            No favourite movies
          </div>
        ) : null}
      </div>
    );
  }
}

// class appWrap extends Component {
//   render() {
//     // console.log("StoreContext===>", StoreContext);
//     return (
//       <StoreContext.Consumer>
//         {(store) => {
//           // console.log("store ===> ", store);
//           return <App store={store} />;
//         }}
//       </StoreContext.Consumer>
//     );
//   }
// }
function mapStateToProps(Store) {
  return {
    movies: Store.moviesStore,
    search: Store.searchStore,
  };
}

const exportAppComponent = connect(mapStateToProps)(App);

export default exportAppComponent;
