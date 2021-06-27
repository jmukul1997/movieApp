import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import moviesStore from "./Reducers/index";
import thunk from "redux-thunk";
import { Component } from "react";
import { Provider } from "react-redux";

console.log = console.warn = console.error = () => {};

// curried form of logger function
// Internally redux will call dispatch and getState function to get something in return
// WHY next => next will refer to the next middleware in chain or the dispatch function
// const logger = function({ dispatch , getState }) {
//   return function(next) {
//     return function(action) {
//       console.log('ACTION_TYPE =>' , action.type);
//       next(action);
//     }
//   }
// }

const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action != "function") {
      console.log("ACTION_TYPE =>", action.type);
    }
    next(action);
  };

const store = createStore(moviesStore, applyMiddleware(logger, thunk));
// console.log("STORE ::", store);
// export const StoreContext = createContext();
// console.log("storecontext", StoreContext);

// console.log("StoreContext", StoreContext);

// class Provider extends React.Component {
//   render() {
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     );
//   }
// }

// const exportAppComponent = connect(callback)(App);
// first we are calling the connect function with callback which will indeed return me another function which will take App component as argument and that will again return me a class component
// first of all connect is a function which will take callback inside it and also this connect fuction is returing another
// function and that is what we are instrested into

// export function connect(callback) {
//   return function (Component) {
//     class IndependentComponent extends React.Component {
//       constructor(props) {
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => {
//           this.forceUpdate();
//         });
//       }

//       componentWillUnmount() {
//         this.unsubscribe();
//       }

//       render() {
//         const { store } = this.props;
//         const state = store.getState();
//         const dataToBePassedAsProps = callback(state);
//         console.log("dataTobepassedasprops", dataToBePassedAsProps);
//         return (
//           <Component {...dataToBePassedAsProps} dispatch={store.dispatch} />
//         );
//         // return <Component {movies: {movies} search: {search}} />;
//       }
//     }
//     class IndependentClassWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => {
//               console.log("store", store);
//               return <IndependentComponent store={store} />;
//             }}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return IndependentClassWrapper;
//   };
// }

ReactDOM.render(
  // <StoreContext.Provider value={store}>
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
