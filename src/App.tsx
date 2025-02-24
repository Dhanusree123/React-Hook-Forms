import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserEditPage from "./pages/users/UserEditPage";
import Header from "./components/Header";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import getTheme from "./theme/useTheme";
import { Toaster } from "sonner";
import ProjectHomePage from "./pages/home/ProjectHomePage";
import UsersPage from "./pages/users/UsersPage";
import ProfilePage from "./pages/profile/ProfilePage";

const App = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    document.documentElement.setAttribute("data-theme", newMode);
  };
  return (
    <>
      <Toaster richColors position="top-right" />
      <BrowserRouter>
        <ThemeProvider theme={getTheme(mode)}>
          <CssBaseline />
          <Header mode={mode} toggleTheme={toggleTheme} />

          <Routes>
            <Route path="/" element={<ProjectHomePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id/edit" element={<UserEditPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
