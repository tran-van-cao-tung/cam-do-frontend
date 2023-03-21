import "./App.css";
import React from "react";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import LayoutDefault from "./Components/LayoutDefault/LayoutDefault";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        {publicRoutes.map((route, index) => {
          const Layout = route.layout || LayoutDefault;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
