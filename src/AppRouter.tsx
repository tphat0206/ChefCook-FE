import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import GamePage from "./pages/Game";
import AppRoutes from "./configs/Routes";

function AppRouter() {
  return (
    <Routes>
      <Route path={AppRoutes.HomePage} element={<HomePage />} />
      <Route path={AppRoutes.Game()} element={<GamePage />} />
    </Routes>
  );
}
export default AppRouter;
