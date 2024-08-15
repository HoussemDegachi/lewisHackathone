import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function index() {
  return (
    <main className="h-dvh w-dvw">
      <NavBar />
      <Outlet />
    </main>
  );
}

export default index;
