import React, { useState, useContext, useEffect, useRef } from "react";
import { fetchUsers } from "../../api";
import { LoginContext } from "../UserLoginProvider/UserLoginProvider";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Login() {
  const { isLogin, setIsLogin, user, setUser } = useContext(LoginContext);
  const [username, setUsername] = useState("jessjelly"); // default as jessjelly for now for development
  const [allUsers, setAllUsers] = useState([]);
  const [isApiSuccess, setIsApiSuccess] = useState(false);
  const [onLoad, setOnLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      fetchUsers()
        .then((users) => {
          setAllUsers(users);
          setIsApiSuccess(true);
          setOnLoad(false);
        })
        .catch((error) => {
          setIsApiSuccess(false);
          setAlertMessage("Unable to reach server, try again in a minute");
          setOpen(true);
          setOnLoad(false);
        })
        .finally(() => {
          setOnLoad(false);
        });
    } else {
      setOnLoad(false);
    }
  }, [isLogin]);

  const onTextFieldChange = (event) => {
    setUsername(event.target.value);
  };

  const onClickHandle_Login = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);

      timer.current = setTimeout(() => {
        if (isApiSuccess) {
          const filteredUser = allUsers.find((user) => user.username === username);
          if (filteredUser) {
            setUser(filteredUser);
            setIsLogin(true);
            setSuccess(true);
            setAlertMessage("Login Successfully");
          } else {
            setIsLogin(false);
            setSuccess(false);
            setAlertMessage("Failed To Login, username is incorrect");
          }
        } else {
          setAlertMessage("Unable to reach server, try again in a minute");
        }
        setLoading(false);
        setOpen(true);
      }, 1000);
    }
  };

  const onClickHandle_LogOut = () => {
    setIsLogin(false);
    setUser([]);
  };

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  if (onLoad) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50px" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <h2>Login</h2>
      {isLogin ? <p>Logged In As: {user.username}</p> : <p>Not Logged In</p>}
      <Stack spacing={2}>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          defaultValue={username}
          onChange={onTextFieldChange}
        />

        <Box sx={{ m: 1, position: "relative" }}>
          {isLogin ? (
            <Button variant="contained" color="error" onClick={onClickHandle_LogOut}>
              LogOut
            </Button>
          ) : (
            <Button variant="contained" color="success" sx={buttonSx} disabled={loading} onClick={onClickHandle_Login}>
              Login
            </Button>
          )}

          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={alertMessage} action={action} />
        </Box>
      </Stack>
    </>
  );
}
