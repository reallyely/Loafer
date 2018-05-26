import "./style/index.scss";
import React from "react";
import { render } from "react-dom";

import { ReactApp } from "./apps/React";

render(
  <div>
    <h2>React App</h2>
    <ReactApp />
  </div>,
  document.getElementById("react-app")
);
