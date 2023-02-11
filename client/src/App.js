import "./App.css";
import { Route, Routes } from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
import NavBar from "./components/Navbar/NavBar";
import UserSignUp from "./components/SignUp/UserSignUp";
import Profile from "./components/Profile/Profile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers, getCurrentUser } from "./redux/Actions/userActions";
import CreateProfile from "./components/createProfile/CreateProfile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { getCUrrentService } from "./redux/Actions/serviceActions";
import UsersList from "./components/usersList/UsersList";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ServiceList from "./components/ServiceList/ServiceList";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/UserProfile/UserProfile";
import Snackbar from "./components/Snackbar/SnackBar";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getCurrentUser(token));
  }, []);
  useEffect(() => {
    dispatch(getCUrrentService(token));
  }, []);
  useEffect(() => {
    dispatch(getAllUsers(token));
  }, []);

  return (
    <div className="App">
      <Snackbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Layout>
                <Sidebar />
                <ServiceList />
              </Layout>
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <NavBar />
              <UserSignUp />
            </>
          }
        />
        <Route
          path={"/login"}
          element={
            <>
              <NavBar />
              <LogIn />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PrivateRoute>
                <NavBar />
                <Profile />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/userprofile/:id"
          element={
            <>
              <NavBar />
              <UserProfile />
            </>
          }
        />
        <Route
          path="/profile/createprofile"
          element={
            <>
              <NavBar />
              <CreateProfile />
            </>
          }
        />
        <Route
          path="/userslist"
          element={
            <>
              <ProtectedRoute>
                <NavBar />
                <UsersList />
              </ProtectedRoute>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
