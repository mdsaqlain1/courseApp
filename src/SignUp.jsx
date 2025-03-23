import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./index.css";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [isHovered, setIsHovered] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [found, setFound] = useState("");
  const navigate = useNavigate(); // ✅ Hook for navigation

  return (
    <>
      <div className="fullHW flexCenter">
        <div className="mb-5">
          <Typography variant="h5">
            Welcome to{" "}
            <Typography display={"inline"} fontWeight={"bold"} variant="h5">
              COURSE WORLD
            </Typography>
          </Typography>
        </div>

        <div className="flexCenter bg-white p-10 shadow">
          <div style={{ width: 400, padding: 15 }}>
            <p className="mb-5">
              <TextField
                className="inputW"
                id="outlined-basic"
                label="Username"
                variant="outlined"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </p>
            <p className="mb-5">
              <TextField
                className="inputW"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </p>

            <Typography marginBottom={"20px"} color={"red"}>
              {found}
            </Typography>

            <div className="flex flex-col gap-4">
              <Button
                variant="contained"
                className="Block"
                onClick={() => {
                  fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/signup`, {
                    method: "POST",
                    body: JSON.stringify({
                      username,
                      password,
                    }),
                    headers: {
                      "Content-type": "application/json",
                    },
                  }).then((res) => {
                    res.json().then((data) => {
                      if (data.token) {
                        window.localStorage.setItem("token", data.token);
                        window.location = "/courses";
                      } else {
                        setFound("User already exists please login!!");
                      }
                    });
                  });
                }}
              >
                Sign Up
              </Button>

              {/* 👇 Login for demo with navigate */}
              <Typography
                variant="body2"
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  borderBottom: isHovered ? "1px solid blue" : "none", // 👈 Hover border
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => navigate("/login")}
              >
                Login for demo
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
