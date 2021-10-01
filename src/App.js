import Header from "./components/ui/Header";
import {ThemeProvider} from "@material-ui/core/styles";
import { theme } from "./components/ui/Theme";
import {Route, Switch} from "react-router-dom";

import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Contact from "./components/Contact";
import CustomSoftware from "./components/CustomSoftware";
import Estimate from "./components/Estimate";
import MobileApps from "./components/MobileApps";
import Revolution from "./components/Revolution";
import Services from "./components/Services";
import Websites from "./components/Websites";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
      <Header/>
      <Switch>
        <Route exact path="/">
          <LandingPage/>
        </Route>
        <Route exact path="/services">
          <Services/>
        </Route>
        <Route exact path="/customsoftware">
          <CustomSoftware/>
        </Route>
        <Route exact path="/mobileapps">
          <MobileApps/>
        </Route>
        <Route exact path="/websites">
          <Websites/>
        </Route>
        <Route exact path="/revolution">
          <Revolution/>
        </Route>
        <Route exact path="/contact">
          <Contact/>
        </Route>
        <Route exact path="/estimate">
          <Estimate/>
        </Route>
        <Route exact path="/about">
          <About/>
        </Route>
      </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
