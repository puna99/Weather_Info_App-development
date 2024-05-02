import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Authentication from "./pages/Authentication";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewWeather from "./pages/ViewWeather";
import { store, persistor } from "../src/redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import { useAuth0 } from "@auth0/auth0-react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const App = () => {

  const { isLoading, error, isAuthenticated, loginWithRedirect } = useAuth0();

  if (error) {
    return (
      <div className="my_app">
        <div className="error_Container">
          <p className="error_styles">Oops...Try Again.</p>
          <div className="logInContainer">
            <button
              onClick={() => {
                loginWithRedirect();
              }}
              className="logInButton"
            >
              Log In Here
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="my_app">
        <div className="loading_Container">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
        <Footer />
      </div>
    );
  }


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
          <div className="my_app">
            <Routes>
              <Route
                exact
                path="/"
                element={isAuthenticated ? <Dashboard /> : <Authentication />}
              />
              <Route exact path="/DashBoard" element={<Dashboard />} />
              <Route exact path="/:CityCode" element={<ViewWeather />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
