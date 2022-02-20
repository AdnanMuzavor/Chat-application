import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
// function App({ Component }) {
//   // 2. Use at the root of your app
//   return (
//
//       <Component />
//     </ChakraProvider>
//   )
// }
ReactDOM.render(
  <ChakraProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
