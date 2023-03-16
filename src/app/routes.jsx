import React from "react";
import { Route, Routes} from "react-router-dom";
import withRouter from "../hooks/withRouter.jsx"
import Home from "../pages/Home.jsx";
import Projects from "../pages/Projects.jsx";
import About from "../pages/About.jsx";
import Socialicons from "../components/SocialIcons.jsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Experience from "../pages/Experience.jsx";
import Education from "../pages/Education.jsx";



const AnimatedRoutes = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition
      key={location.key}
      timeout={{
        enter: 400,
        exit: 400,
      }}
      classNames="page"
      unmountOnExit
    >
      <Routes location={location}>
        <Route exact path="/" element={<Home />} />
        <Route path={process.env.PUBLIC_URL + '/about'} element={<About />} />
        <Route path={process.env.PUBLIC_URL + '/projects'} element={<Projects />} /> 
        <Route path={process.env.PUBLIC_URL + '/experience'} element={<Experience />} />
        <Route path={process.env.PUBLIC_URL + '/education'} element={<Education />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </CSSTransition>
  </TransitionGroup>
));

function AppRoutes() {
  return (
    <div className="s_c">
      <AnimatedRoutes />
      <Socialicons />
    </div>
  );
}

export default AppRoutes;
