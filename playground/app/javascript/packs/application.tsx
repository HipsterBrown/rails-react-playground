import React from "react";
import { render } from "react-dom";
import { Thing } from "@playground/core";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Thing>This is using a component from the core playground!</Thing>,
    document.getElementById("app")
  );
});
