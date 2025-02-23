import { lazy, Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import LoadingScreen from "../components/loading-screen";

const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const UsersPage = lazy(() => import("../pages/users/Users"));
const EditUsersPage = lazy(() => import("../pages/users/EditUsersPage"));
const EditEmailPage = lazy(() => import("../pages/users/EditEmailPage"));

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "users",
          element: <UsersPage />,
        },
        {
          path: "user/:id/edit",
          element: <EditUsersPage />,
        },
        {
          path: "user/:id/edit-email",
          element: <EditEmailPage />,
        },
      ],
    },
  ]);
};

export default Router;
