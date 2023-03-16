import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import withRouter from "../hooks/withRouter.jsx";
import AppRoutes from "./routes.jsx";
import NavBarWithRouter from "../components/NavBar.jsx";
import GlobalStyles from '../styles/GlobalStyles.jsx';
import "../styles/App.css";
import LoadingScreen from "../components/LoadingScreen.jsx";
import { Fade } from "react-reveal";

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}
const ScrollToTop = withRouter(_ScrollToTop);

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <GlobalStyles />
      {loading ? (
        <LoadingScreen onFinishLoading={() => setLoading(false)}/>
      ) : (
        
        <Router basename={process.env.PUBLIC_URL}>
        {/* <Router > */}
          <ScrollToTop>
            <NavBarWithRouter />
            <br />
            <Fade>
            <AppRoutes />
            </Fade>
          </ScrollToTop>
        </Router>
        
      )}
      
    </>
  );
}
