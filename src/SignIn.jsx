import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./index.css";
import { useState } from "react";
import { Typography } from "@mui/material";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [found, setFound] = useState("");

  return (
    <>
      <div className="fullHW flexCenter">
        <div className="mb-5">
          <Typography display={"inline"} fontWeight={"bold"} variant="h5">
            {" "}
            COURSE WORLD
          </Typography>
        </div>
        <div className="flexCenter bg-white p-10 shadow">
          <div></div>

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
                label="password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </p>
            <Typography marginBottom={"20px"} color={"red"}>
              {found}
            </Typography>
            <Button
              variant="contained"
              className="Block"
              onClick={() => {
                fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/login`, {
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
                      setFound("Invalid username or password");
                    }
                  });
                });
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
