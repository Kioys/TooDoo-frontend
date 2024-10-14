"use client";
import MainPage from "./components/MainPage";
import UserPage from "./components/UserPage";
import { ParseHook } from "@lib/parse";
import Parse from "parse";

export default function Home() {
  const { isInitialized } = ParseHook();
  if (isInitialized) {
    return <>{Parse.User.current() ? <UserPage /> : <MainPage />}</>;
  } else {
    return <h1>LOADING</h1>;
  }
}
