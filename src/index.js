import React from "react";
import ReactDOM from "react-dom";
import App from "./app/layout/App.js";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import {Provider} from "react-redux";
import {configureStore} from "./app/store/configureStore.js";

const store = configureStore();

const elRoot = document.getElementById("root");

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    elRoot
  );
}

if (module.hot) {
  module.hot.accept("./app/layout/App", function () {
    setTimeout(render);
  });
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
