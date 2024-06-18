import React, { useState, useContext, useEffect } from "react";
import { fetchUsers } from "../../api";
import { LoginContext } from "../UserLoginProvider/UserLoginProvider";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Login() {
  const { isLogin, setIsLogin, user, setUser } = useContext(LoginContext);
  const [username, setUsername] = useState("jessjelly"); // default as jessjelly for now for development
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((users) => {
      setAllUsers(users);
    });
  }, []);

  const onTextFieldChange = (event) => {
    setUsername(event.target.value);
  };

  const onClickHandle_Login = () => {
    const filteredUser = allUsers.filter((user) => {
      if (user.username === username) {
        return user;
      }
    });

    if (filteredUser.length > 0) {
      setUser(filteredUser[0]);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  if (!isLogin) {
    return (
      <>
        <h2>Login</h2>
        <Stack spacing={2}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            defaultValue={username}
            onChange={onTextFieldChange}
          />
          <Button variant="contained" color="success" onClick={onClickHandle_Login}>
            Login
          </Button>
        </Stack>
      </>
    );
  } else {
    return (
      <>
        <h2>Logged in as</h2>
        <h3>{user.username}</h3>
      </>
    );
  }
}
