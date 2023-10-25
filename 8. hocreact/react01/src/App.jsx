import Header from "./Components/Header";
import React from "react";
function App() {
  const h1 = React.createElement(
    "h1",
    {
      id: "title",
      className: "title",
      style: {
        color: "red",
        fontStyle: "italic",
      },
      onClick: (e) => {
        console.log("Click me", e);
      },
    },
    "Hello F8",
  );
  const h2 = React.createElement("h2", {}, "Học React không khó");

  const div = React.createElement(
    "div",
    {
      className: "container",
    },
    h1,
    h2,
  );

  return div;
}

export default App;
