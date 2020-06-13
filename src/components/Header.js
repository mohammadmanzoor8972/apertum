import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    color: "#04ba5f",
    padding: "10px 0",
    height:"116px",
    boxShadow:"none",
  },
  link: {
    fontSize: 0
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  button: {
    fontWeight: 600
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Link
          color="inherit"
          href="https://apertumo.com/"
          className={classes.link}
        >
          <img
            src="https://apertumo.com/images/logo-apertum-online-dark-high-res.png"
            alt="Apertum Online"
            height="60"
          />
        </Link>
        {(
          <Button
            color="inherit"
            className={classes.button}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
