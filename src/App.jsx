import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Register from "./pages/Register";
import { useState, useEffect, createContext } from "react";
import { userDetail } from "./services/userapi";
import Footer from "./components/Footer";

export const UserContext = createContext("Hello");
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("Token"))
      userDetail(localStorage.getItem("Token")).then((res) =>
        setCurrentUser(res[0])
      );
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} />
          <Route path="/post" component={Post} />
        </Switch>
      </UserContext.Provider>
      <Footer />
    </Router>
  );
}

export default App;
