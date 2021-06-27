import React, { Component } from "react";
import { data } from "../data";
import { fetchingAPIforSearch } from "../actions/index";
import Searchcomp from "./Searchcomp";
// import { connect, StoreContext } from "../index";
import { connect } from "react-redux";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      showSearchResults: false,
      searchText: "",
      IfSearched: false,
    };
  }
  handleAddToMovies = (movie) => {
    this.props.dispatch({
      type: "ADD_MOVIE_TO_LIST",
      movieToAdd: movie,
    });
    this.setState({
      showSearchResults: false,
    });
  };

  handleSearch = () => {
    const { searchText } = this.state;
    // console.log("searc", searchText);
    this.props.dispatch(fetchingAPIforSearch(searchText));
  };

  handleOnchange = (event) => {
    this.setState({
      searchText: event.target.value,
      IfSearched: true,
    });
    // console.log(event.target.value);
    const { searchText } = this.state;
    this.props.dispatch(fetchingAPIforSearch(event.target.value));
  };

  onKeyUp = (event) => {
    if (event.charCode === 13) {
      const { searchText } = this.state;
      this.props.dispatch(fetchingAPIforSearch(searchText));
    }
  };

  render() {
    console.log("PORPS", this.props);
    const { searchText } = this.state;
    // console.log(searchText);
    // console.log("STATE", store.getState());
    const { searchResult } = this.props.search;
    const { IfSearched } = this.state;
    // console.log("searchResult", searchResult);
    return (
      <div className="p-8">
        <div className="my-6 font-extrabold">
          <p className="text-white text-center mx-auto text-6xl">
            Movie Db APP
          </p>
        </div>

        <div className="w-[20%] relative mx-auto flex">
          <input
            type="text"
            onChange={this.handleOnchange}
            onKeyPress={this.onKeyUp}
            className="px-2 py-1 outline-none w-48"
          />
          <button onClick={this.handleSearch} className="bg-white p-1 border">
            Search
          </button>
        </div>

        {IfSearched && (
          <div className="w-[60%]  mx-auto bg-[#111111]  ">
            {searchResult &&
              searchResult.map((movie, index) => {
                // console.log("movie", movie);
                if (!(movie.Poster == "N/A") && movie)
                  return (
                    <div
                      className="container h-16 bg-[#111111] text-gray-100 flex p-3 justify-between"
                      key={`movies-${index}`}
                    >
                      <div className="flex">
                        <img src={movie.Poster} alt="image" />
                        <div className="text-xs ml-4">
                          <p className="text-lg "> {movie.Title}</p>
                          <p>{movie.Year}</p>
                        </div>
                      </div>
                      <button
                        className="px-2 border-2 bg-red-600 focus:outline-none"
                        onClick={() => this.handleAddToMovies(movie)}
                      >
                        Add
                      </button>
                    </div>
                  );
              })}
            {/* {searchResult == undefined ? (
              <div className="text-white text-center text-3xl mt-[70px]">
                No results to show{" "}
              </div>
            ) : null} */}
          </div>
        )}
      </div>
    );
  }
}

// class NavbarWrapper extends Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => {
//           return <Navbar store={store} />;
//         }}
//       </StoreContext.Consumer>
//     );
//   }
// }

function callback(Store) {
  return {
    search: Store.searchStore,
  };
}

const exportNavbarComponent = connect(callback)(Navbar);

export default exportNavbarComponent;
