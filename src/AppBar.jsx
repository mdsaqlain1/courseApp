import { Typography } from "@mui/material";
import "./index.css";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AppBar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/me`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        setUsername(data.username);
      });
    });
  }, []);
  if (username) {
    return (
      <div
        className="flex plr-15"
        style={{
          position: "fixed",
          top: 0,
          boxSizing: "border-box",
          backgroundColor: "#1976d2",
          height: "60px",
          width: "100%",
          color: "white",
          zIndex: 2,
        }}
      >
        <div>
          <Typography color={"white"} fontWeight={"bold"}>
            COURSE WORLD
          </Typography>
        </div>
        <div className="flex">
          <div>
            <Button
              style={{ color: "white" }}
              onClick={() => {
                navigate("/courses");
              }}
            >
              Courses
            </Button>
          </div>
          <div>
            <Button
              style={{ color: "white" }}
              onClick={() => {
                navigate("/addcourse");
              }}
            >
              Add Course
            </Button>
          </div>
          <div>
            <Button
              variant=""
              onClick={() => {
                window.localStorage.setItem("token", null);
                window.location = "/";
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="flex plr-15"
      style={{
        boxSizing: "border-box",
        backgroundColor: "#1976d2",
        height: "60px",
        position: "fixed",
        width: "100vw",
        color: "white",
        zIndex: 2,
      }}
    >
      <div>
        <Typography color={"white"} fontWeight={"bold"}>
          COURSE WORLD
        </Typography>
      </div>
      <div className="flex">
        <div>
          <Button
            style={{ color: "white" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </div>
        <div>
          <Button
            style={{ color: "white" }}
            onClick={() => {
              navigate("/");
            }}
          >
            SignUp
          </Button>
        </div>
      </div>
    </div>
  );
}
export default AppBar;
