import { useEffect } from "react";
import Alert from "@mui/material/Alert";

const LogInAlert = ({ showAlert, setShowAlert, error }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div style={{ position: "fixed", top: "2rem", right: "5px", width: "30%" }}>
      <Alert severity="error" open={showAlert}>
        {error}
      </Alert>
    </div>
  );
};
export default LogInAlert;
