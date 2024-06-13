import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/Layouts";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboards from "../pages/Dashboards";
import Form from "../pages/Form";
import Payment from "../pages/Payment";
function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path="/Register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />

          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />

          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboards />
              </Layout>
            }
          />
          <Route
            path="/form"
            element={
              <Layout>
                <Form />
              </Layout>
            }
          />
          <Route
            path="/payment"
            element={
              <Layout>
                <Payment />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
