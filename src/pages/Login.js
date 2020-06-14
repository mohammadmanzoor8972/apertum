import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useApp } from "../hooks";
import { setCookie } from "../helpers/utils";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"© 2019 "}
      <Link color="inherit" href="https://apertumo.com/">
        Apertum Online
      </Link>
      {" All rights reserved."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = () => {

  const [loginData, setLoginData] = useState({
    accountId: "",
    password: "",
    remember: false
  });
  
  const {
    setIsLoading,
    loginError,
    handleLogin,
    setIsLoggegIn,
    setLoginError,
    setToken
  } = useApp();

  const classes = useStyles();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const response = await handleLogin(loginData);
    if (response.error_message)
      setLoginError({ message: response.error_message });
    else {
      setToken(response.token);
      if (loginData.remember) {
        setCookie("token", response.token, 0.0104167);
      } else {
        setCookie("token", response.token, 0.0104167);
      }
      setIsLoggegIn(true);
    }
    setIsLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="accountId"
            label="Account Id"
            name="email"
            type="text"
            autoFocus
            value={loginData.accountId}
            onChange={e => {
              setLoginData({
                ...loginData,
                accountId: e.target.value
              });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginData.password}
            onChange={e => {
              setLoginData({
                ...loginData,
                password: e.target.value
              });
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                checked={loginData.remember}
                onChange={e => {
                  setLoginData({
                    ...loginData,
                    remember: !loginData.remember
                  });
                }}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Typography variant="caption" color="error">
            {loginError?.message}
          </Typography>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
