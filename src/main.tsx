import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import { Provider } from "react-redux";
import AppRoutes from "./routes/AppRoutes.tsx";
import store from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </StrictMode>
);
