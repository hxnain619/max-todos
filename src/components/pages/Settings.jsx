import { Container, Switch } from "@material-ui/core";
import React, { useContext } from "react";
import { MainContext } from "../context/MainContext";

const Settings = () => {
  const { isDark, changeTheme, isDeleteConfirmation, changeDeleteConfirm, } = useContext(MainContext);
  return (
    <>
      <Container maxWidth="sm">
        <h1>Settings Page</h1>
        <h3>
          Dark Mode:
          <Switch onChange={changeTheme} checked={isDark} color="primary" />
        </h3>
        <h3>
          Delete Confirmation:
          <Switch onChange={changeDeleteConfirm} checked={isDeleteConfirmation} color="primary" />
        </h3>
      </Container>
    </>
  );
};

export default Settings;
