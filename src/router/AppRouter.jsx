import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import About from "../pages/About";
import Dashboard from "../pages/Dashboard";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import MyBlog from "../pages/MyBlog";
import NewBlog from "../pages/NewBlog";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

const AppRouter = () => {
  //! login ve register aynı path olduğu için, refresh yapınca login sayfasına dönmemesi için sessionStorage'da state'i tuttum
  const [toggle, setToggle] = useState(()=>{
    const savedToggle = sessionStorage.getItem("toggle");
    return savedToggle !== null ? JSON.parse(savedToggle) : false;
  });

  useEffect(()=>{
    sessionStorage.setItem("toggle", JSON.stringify(toggle));
  },[])

  return (
    <Router>
      <Navbar setToggle={setToggle}/>
      <Routes>
        <Route path="/" element={<Dashboard setToggle={setToggle}/>} />
        <Route path="auth" element={toggle ? <Register setToggle={setToggle}/> : <Login  setToggle={setToggle}/>} />
        <Route path="about" element={<About />} />
        <Route path="/" element={<PrivateRouter />}>
          <Route path="detail/:id" element={<Detail />} />
          <Route path="new-blog" element={<NewBlog />} />
          <Route path="profile" element={<Profile />} />
          <Route path="my-blog" element={<MyBlog />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
