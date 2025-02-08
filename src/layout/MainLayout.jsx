import "./MainLayout.css";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";

const MainLayout = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [location.pathname]);
  return (
    <div className="main_layout">
      <Header selected={selected} setSelected={setSelected} />
      {loading ? <Loader /> : <Outlet context={{ selected, setSelected }} />}
      <Footer />
    </div>
  );
};

export default MainLayout;
