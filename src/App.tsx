import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import UserEditPage from "./pages/users/UserEditPage";
import Header from "./components/Header";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import getTheme from "./theme/useTheme";
import { Toaster } from "sonner";
import ProjectHomePage from "./pages/home/ProjectHomePage";
import UsersPage from "./pages/users/UsersPage";
import ProfilePage from "./pages/profile/ProfilePage";
import UserAddPage from "./pages/users/UserAddPage";
import ResourcesPage from "./pages/resources/ResourcesPage";
import ResourceAddPage from "./pages/resources/ResourceAddPage";
import ResourceEditPage from "./pages/resources/ResourceEditPage";
import Sidebar from "./components/SideBar";

type Props = {
  mode: "light" | "dark";
  toggleTheme: () => void;
};

const App = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    document.documentElement.setAttribute("data-theme", newMode);
  };

  const ConditionalHeader = (props: Props) => {
    const { mode, toggleTheme } = props;
    const location = useLocation();
    if (location.pathname === "/") {
      return null;
    }
    return <Header mode={mode} toggleTheme={toggleTheme} />;
  };

  const ConditionalSidebar = () => {
    const location = useLocation();
    return location.pathname === "/" ? null : <Sidebar />;
  };

  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      <BrowserRouter>
        <ThemeProvider theme={getTheme(mode)}>
          <CssBaseline />
          <ConditionalHeader mode={mode} toggleTheme={toggleTheme} />
          <Box sx={{ display: "flex" }}>
            <ConditionalSidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Routes>
                <Route path="/" element={<ProjectHomePage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/new" element={<UserAddPage />} />
                <Route path="/users/:id/edit" element={<UserEditPage />} />

                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/resources/new" element={<ResourceAddPage />} />
                <Route
                  path="/resources/:id/edit"
                  element={<ResourceEditPage />}
                />

                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </Box>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
