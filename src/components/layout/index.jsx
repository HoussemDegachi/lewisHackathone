import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function index() {
  return (
    <main>
      <NavBar />
      <Outlet />
    </main>
  );
}

export default index;
