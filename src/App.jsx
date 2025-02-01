import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layout/MainLayout";
import Loader from "./components/Loader/Loader";

const MainPage = lazy(() => import("./pages/main_page/MainPage"));
const AllCountries = lazy(() => import("./pages/all_countries/AllCountries"));
function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/all-countries" element={<AllCountries />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
