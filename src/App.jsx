import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layout/MainLayout";
import Loader from "./components/Loader/Loader";

const MainPage = lazy(() => import("./pages/main_page/MainPage"));
const AllCountries = lazy(() => import("./pages/all_countries/AllCountries"));
const OneOfFour = lazy(() => import("./pages/one-of-four/OneOfFour"));
const Flags = lazy(() => import("./pages/flags/Flags"));
const Reverse = lazy(() => import("./pages/reverse/Reverse"));
function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/all-countries" element={<AllCountries />} />
            <Route path="/one-of-four" element={<OneOfFour />} />
            <Route path="/flags" element={<Flags />} />
            <Route path="/reverse" element={<Reverse />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
