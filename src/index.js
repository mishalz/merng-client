import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ApolloClientProvider from "./ApolloProvider";
import AuthContextProvider from "./context/Auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <ApolloClientProvider />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
