"use client";
import React from "react";
import ContainerBox from "./components/ContainerBox";
import Link from "next/link";

export const EmployeeContext = React.createContext("");

const Home = () => {
  return (
    <>
      <Link href="/use-ref">Go to useRef</Link>

      <EmployeeContext value={"ABCDE1234BGV"}>
        <ContainerBox />
      </EmployeeContext>
    </>
  );
};
export default Home;
