import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { store } from "./redux/configureStore";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </BrowserRouter>
);
