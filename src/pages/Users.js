import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Box,
  Container,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  red,
  purple,
  blueGrey,
  deepOrange,
  brown,
  teal,
  deepPurple,
  indigo,
  blue,
  pink
} from "@material-ui/core/colors";
import { useApp } from "../hooks";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "20px 0",
    display: "flex",
    alignItems: "flex-start",
    padding: 20
  },
  avatar: {
    marginRight: 20,
    height: 50,
    width: 50,
    fontWeight: 600
  },
  heading: {
    fontWeight: 600
  },
  filter: {
    textAlign: "right",
    margin: "20px 0"
  },
  filterButton: {
    backgroundColor: "#04ba5f",
    color: "#fff",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#04ba5f"
    }
  },
  noResult: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 85px)",
    fontSize: 20,
    fontWeight: 600,
    color: "#04ba5f",
    backgroundColor: "#fff"
  },
  list: {
    listStyle: "none",
    padding: 0
  }
}));

const colors = [
  red,
  purple,
  blueGrey,
  deepOrange,
  brown,
  teal,
  deepPurple,
  indigo,
  blue,
  pink
];

const User = ({ user, classes }) => {
  const colorIndex = Math.floor(Math.random() * 10);
  const firstLetter = user?.firstName[0] || "A";
  return (
    <Card className={classes.root}>
      <Avatar
        aria-label="Name"
        className={classes.avatar}
        style={{ backgroundColor: colors[colorIndex][500] }}
      >
        {firstLetter}
      </Avatar>
      <Box>
        <Typography
          variant="h6"
          className={classes.heading}
        >{`${user?.firstName} ${user?.lastName}`}</Typography>
        <Typography>{`Account Id: ${user?.accountId}`}</Typography>
        <Typography variant="caption">{`Age: ${user?.age} Years`}</Typography>
      </Box>
    </Card>
  );
};

const Users = () => {
  const {
    token,
    fetchUsers,
    setUsers,
    setLoginError,
    setIsLoading,
    isLoading,
    users
  } = useApp();
  const [filterList, setFilterList] = useState(false);

  const classes = useStyles();

  const filteredUser = filterList
    ? users.filter(user => {
        const fullName = `${user?.firstName} ${user?.lastName}`;
        return user?.age >= 20 && user?.age < 30 && fullName?.length >= 10;
      })
    : users;

  useEffect(() => {
    setIsLoading(true);
    const getUsers = async () => {
      const response = await fetchUsers(token);
      if (response?.error_message)
        setLoginError({ message: response.error_message });
      else {
        setUsers(response);
      }
    };
    getUsers();
    setIsLoading(false);
  }, [token]);

  if (users || isLoading) {
    return (
      <Container>
        {users && users.length > 0 && (
          <Box className={classes.filter}>
            <Button
              color="inherit"
              variant="contained"
              onClick={() => {
                setFilterList(!filterList);
              }}
              className={classes.filterButton}
            >
              {filterList ? "Show All" : "Filter List"}
            </Button>
          </Box>
        )}

        <Box component="ul" className={classes.list}>
          {(filteredUser || []).map((user, index) => (
            <Box key={index} component="li">
              <User user={user} classes={classes} />
            </Box>
          ))}
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box className={classes.noResult}>No user found!!!</Box>
    </Container>
  );
};

export default Users;
