import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import ShoppingList from "./pages/shoppingList";
import { useEffect } from "react";
import UserLogo from "./pages/shoppingList/user.png";
function App() {
  const location = useLocation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  useEffect(() => {
    scrollToTop();
  }, [location.search]);
  return (
    <div className="App">
      <div className="header-check">
        <span className="cmp-name">Karini Ai</span>
        <span className="logo">
          <img className="user-logo" src={UserLogo}></img>User
        </span>
      </div>
      <Routes>
        <Route path="/" Component={ShoppingList} />
      </Routes>
    </div>
  );
}

export default App;
