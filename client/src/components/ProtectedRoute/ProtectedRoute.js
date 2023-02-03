import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  return (
    <>
      {!currentUser.role ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : currentUser.role === "admin" ? (
        props.children
      ) : (
        <Navigate to={-1} />
      )}
    </>
  );
};

export default ProtectedRoute;
