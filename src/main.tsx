import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { StrictMode } from "react";

import App from "./App.tsx";
import { store } from "./lib/redux/store.ts";
import "./scss/main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
