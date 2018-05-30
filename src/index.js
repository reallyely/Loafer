import "./style/index.scss";
import React from "react";
import { render } from "react-dom";
import { ReactApp } from "./apps/React";

import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { ReduxApp } from "./apps/Redux/index";
import tagSearchReducer from "./apps/Redux/TagSearch";

render(
  <div>
    <h2>React App</h2>
    <ReactApp />
  </div>,
  document.getElementById("react-app")
);

const store = createStore(tagSearchReducer, applyMiddleware(thunk))
render(
  <Provider store={store}>
    <div>
      <h2>Redux App</h2>
      <ReduxApp />
    </div>
  </Provider>,
  document.getElementById("redux-app")
);
